import React from 'react';
import './Report.scss';
import { IContainer } from "../../../store/redusers/container/container.state.ts";
import { IItem } from "../../../store/redusers/item/item.state.ts";
import { reportAPI } from "../../../services/ReportService.ts";
import ReportDetails from "./ReportDetails.tsx";
import Popup from "../popup/Popup.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {setReportGeneratorState} from "../../../store/redusers/popup/popup.store.ts";

interface Props {
  container: IContainer;
  unplacedCoffees: IItem[];
}


const groupCoffeesByName = (items: IItem[], totalContainerVolume: number) => {

  const groupedItems: { name: string, weight: number, volume: number, quantity: number, depth: number, usedVolumePercentage: number }[] = [];


  items.forEach(coffee => {

    const existingItem = groupedItems.find(item => item.name === coffee.name);

    if (existingItem) {

      existingItem.quantity += coffee.quantity;
    } else {

      groupedItems.push({
        name: coffee.name,
        weight: coffee.weight,
        depth: coffee.depth,
        volume: (coffee.width ?? 0) * (coffee.height ?? 0) * (coffee.depth ?? 0),
        quantity: coffee.quantity,
        usedVolumePercentage: 0,
      });
    }
  });


  groupedItems.forEach(item => {
    item.usedVolumePercentage = parseFloat(((item.volume * item.quantity / totalContainerVolume) * 100).toFixed(2));
  });

  return groupedItems;
};

const ReportGenerator: React.FC<Props> = ({ container, unplacedCoffees}) => {
  const dispatch = useAppDispatch();

  const [addReport] = reportAPI.useAddReportMutation();
  const reportGeneratorState = useAppSelector(state => state.popupReducer.reportGeneratorState)

  if (!container){
    alert('Будь ласка, оберіть контейнер та запустіть алгоритм');
    dispatch(setReportGeneratorState(false))
    return
  }

  if (!unplacedCoffees){
    dispatch(setReportGeneratorState(false))
    return
  }


  const totalVolume = container.width * container.height * container.depth;

  const usedVolume = container.contents ? container.contents.reduce((sum, coffee) => {
    return sum + ((coffee.width ?? 0) * (coffee.height ?? 0) * (coffee.depth ?? 0));
  }, 0) : 0;

  const freeVolume = totalVolume - usedVolume;
  const usedPercentage = (usedVolume / totalVolume) * 100;

  const loadedItems = groupCoffeesByName(container.contents, totalVolume);
  const unplacedItems = groupCoffeesByName(unplacedCoffees, totalVolume);


  const reportData = {
    containerName: container.name,
    containerWidth: container.width,
    containerHeight: container.height,
    containerDepth: container.depth,
    totalVolume,
    usedVolume,
    freeVolume,
    usedPercentage,
    loadedItems: loadedItems.map((item) => ({
      ...item,
      usedVolumePercentage: parseFloat(((item.volume * item.quantity / totalVolume) * 100).toFixed(2))
    })),
    unplacedItems
  };



  const saveReport = async () => {
    try {
      await addReport(reportData).unwrap();
      alert('Report saved successfully');
      dispatch(setReportGeneratorState(false))
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to save report');
    }
  };



  return (
      <Popup show={reportGeneratorState} handleClose={()=> dispatch(setReportGeneratorState(false))} >
        <ReportDetails
            containerName={container.name}
            totalVolume={totalVolume}
            usedVolume={usedVolume}
            usedPercentage={usedPercentage}
            freeVolume={freeVolume}
            loadedItems={reportData.loadedItems}
            unplacedItems={reportData.unplacedItems}
        />
        <button onClick={()=> dispatch(setReportGeneratorState(false))} className="close-button">Close</button>
        <button onClick={saveReport} className="save-button">Save Report</button>
      </Popup>
  );
};

export default ReportGenerator;
