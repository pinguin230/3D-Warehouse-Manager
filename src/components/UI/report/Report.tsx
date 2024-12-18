import React, { useState } from 'react';
import './Report.scss';
import { IContainer } from "../../../store/redusers/container/container.state.ts";
import { IItem } from "../../../store/redusers/item/item.state.ts";
import { reportAPI } from "../../../services/ReportService.ts";

interface Props {
  container: IContainer;
  unplacedItems: IItem[];
  onClose: () => void;
}

const groupItemsByName = (coffees: IItem[]) => {
  const coffeeMap: { [key: string]: { item: IItem, quantity: number } } = {};

  coffees.forEach(item => {
    if (coffeeMap[item.name]) {
      coffeeMap[item.name].quantity += 1;
    } else {
      coffeeMap[item.name] = { item, quantity: 1 };
    }
  });

  return Object.values(coffeeMap);
};

const Report: React.FC<Props> = ({ container, unplacedItems, onClose }) => {
  const [showLoaded, setShowLoaded] = useState(true);
  const [showUnplaced, setShowUnplaced] = useState(true);

  const totalVolume = container.volume ?? 0;
  const usedVolume = container.contents ? container.contents.reduce((sum, item) => sum + (item.volume ?? 0), 0) : 0;
  const freeVolume = totalVolume - usedVolume;
  const usedPercentage = (usedVolume / totalVolume) * 100;

  const groupedLoadedItems = groupItemsByName(container.contents ?? []);
  const groupedUnplacedItems = groupItemsByName(unplacedItems);

  const [addReport] = reportAPI.useAddReportMutation();

  const saveReport = async () => {
    const reportData = {
      containerName: container.name,
      containerWidth: container.width,
      containerHeight: container.height,
      totalVolume,
      usedVolume,
      freeVolume,
      usedPercentage,
      loadedItems: groupedLoadedItems.map(({ item, quantity }) => ({
        name: item.name,
        weight: item.weight,
        volume: item.volume ?? 0,
        quantity,
        usedVolumePercentage: parseFloat(((item.volume! * quantity / totalVolume) * 100).toFixed(2))
      })),
      unplacedItems: groupedUnplacedItems.map(({ item, quantity }) => ({
        name: item.name,
        weight: item.weight,
        volume: item.volume ?? 0,
        quantity
      }))
    };

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await addReport(reportData).unwrap();
      alert('Report saved successfully');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to save report');
    }
  };

  return (
      <div className="report-popup">
        <div className="report-content">
          <h2>Loading Report</h2>
          <h3>Container Info</h3>
          <p><strong>Name:</strong> {container.name}</p>
          <p><strong>Width:</strong> {container.width}</p>
          <p><strong>Height:</strong> {container.height}</p>
          <p><strong>Total Volume:</strong> {totalVolume}</p>
          <p><strong>Used Volume:</strong> {usedVolume} ({usedPercentage.toFixed(2)}%)</p>
          <p><strong>Free Volume:</strong> {freeVolume}</p>

          <div className="section">
            <div className="section-header" onClick={() => setShowLoaded(!showLoaded)}>
              <h3>Loaded Items</h3>
              <button className="toggle-button">{showLoaded ? '▲' : '▼'}</button>
            </div>
            {showLoaded && (
                <ul className="item-list">
                  {groupedLoadedItems.map(({ item, quantity }, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Weight:</strong> {item.weight}</p>
                        <p><strong>Volume:</strong> {item.volume}</p>
                        <p><strong>Quantity:</strong> {quantity}</p>
                        <p><strong>Used Volume: {(item.volume! * quantity / totalVolume * 100).toFixed(2)}%</strong></p>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="section">
            <div className="section-header" onClick={() => setShowUnplaced(!showUnplaced)}>
              <h3>Unplaced Items</h3>
              <button className="toggle-button">{showUnplaced ? '▲' : '▼'}</button>
            </div>
            {showUnplaced && (
                <ul className="item-list">
                  {groupedUnplacedItems.map(({ item, quantity }, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Weight:</strong> {item.weight}</p>
                        <p><strong>Volume:</strong> {item.volume}</p>
                        <p><strong>Quantity:</strong> {quantity}</p>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <button onClick={onClose} className="report-close-button">Close</button>
          <button onClick={saveReport} className="report-save-button">Save Report</button>
        </div>
      </div>
  );
};

export default Report;
