import React, {useState} from 'react';

import "./HomePage.scss";

import ItemList from "../../components/item-list/ItemList.tsx";
import ContainerList from "../../components/container-list/ContainerList.tsx";
import Button from "../../components/UI/my-button/Button.tsx";
import ReportsListPopup from "../../components/UI/reports-list-popup/ReportsListPopup.tsx";
import Header from "../../components/header/Header.tsx";
import ItemsManagement from "../../components/item-management/ItemsManagement.tsx";
import ContainerManagement from "../../components/container-management/ContainerManagement.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {itemAPI} from "../../services/ItemsService.ts";
import {favoriteContainerAPI} from "../../services/FavoriteContainerService.ts";
import {favoriteItemAPI} from "../../services/FavoriteItemService.ts";
import {IContainer} from "../../store/redusers/container/container.state.ts";
import {containerAPI} from "../../services/ContainerService.ts";
import {RootState} from "../../store/store.ts";
import {IItem} from "../../store/redusers/item/item.state.ts";
import SelectContainerPopup from "../../components/UI/select-container-popup/SelectContainerPopup.tsx";
import ReportGenerator from "../../components/UI/report/ReportGenerator.tsx";
import ReportViewer from "../../components/UI/report/ReportViewer.tsx";
import Container3DVisualizer from "../../components/threeJS/threeJSTest.tsx";
import {greedyAlgorithm3D} from "../../utils/greedyAlgorithm3D.ts";
import SelectedItemList from "../../components/selected-item-list/SelectedItemList.tsx";
import SelectedContainerList from "../../components/selected-container-list/SelectedContainerList.tsx";
import {
  setCheckReportState,
  setCreateContainerState,
  setCreateItemState
} from "../../store/redusers/popup/popup.store.ts";
import {reportAPI} from "../../services/ReportService.ts";
import GeolocationExample from "../../TestGeo.tsx";


const HomePage: React.FC = () => {
  const userId = useAppSelector(state => state.userReducer.uid)

  const [containerResults, setContainerResults] = useState<IContainer | null>(null);
  const [unplacedCoffees, setUnplacedCoffees] = useState<IItem[]>([]); // Додаємо стан для кави, яка не помістилась
  const [selectedReport, setSelectedReport] = useState<string | null>(null); // Для збереження вибраного звіту
  const container = useAppSelector((state: RootState) => state.containerReducer);

  const {data: itemsArray} = itemAPI.useFetchAllItemsQuery(userId)
  const {data: selectedContainerArray} = favoriteContainerAPI.useFetchAllFavoriteContainerQuery(userId)
  const {data: favoriteItemsArray} = favoriteItemAPI.useFetchAllFavoriteItemQuery(userId)
  const {data: containerArray} = containerAPI.useFetchAllContainerQuery(userId)
  const {data: reportsList} = reportAPI.useFetchAllReportQuery()

  const reportGeneratorState = useAppSelector(state => state.popupReducer.reportGeneratorState)
  const container3DVisualizerState = useAppSelector(state => state.popupReducer.container3DVisualizerState)

  const handleRunGreedyAlgorithm3D = () => {

    const selectedContainer = JSON.parse(JSON.stringify(container));
    if (!selectedContainer) {
      alert('Please select a container first');
      return;
    }
    const result = greedyAlgorithm3D(itemsArray, selectedContainer);
    setContainerResults(result.container)
    setUnplacedCoffees(result.unplacedItems);
  }

  const dispatch = useAppDispatch()

  const handleChangeItemPopup = () => {
    dispatch(setCreateItemState(true))
  }

  const handleChangeContainerPopup = () => {
    dispatch(setCreateContainerState(true))
  }

  const handleChangeReportPopup = () => {
    dispatch(setCheckReportState(true))
  }

  return (
      <div className='home-container'>
        <Header/>
        <main className='main-content'>

          <div className="main-content__left">
            <Button className="main-content__left-button" onClick={handleChangeItemPopup}>Створити каву</Button>
            <Button className="main-content__left-button" onClick={handleChangeContainerPopup}>Створити контейнер</Button>
            <Button className="main-content__left-button" onClick={handleChangeReportPopup}>Перегляд звітів</Button>
            <Button className="main-content__left-button" onClick={handleRunGreedyAlgorithm3D}>Запуск алгоритму</Button>

          </div>
          <div className="main-content__center">
            <ItemsManagement/>
            <ContainerManagement/>

            <div style={{display: "flex"}}>
                <ItemList
                    title='Items List'
                    items={itemsArray}
                />
                <ContainerList
                    title='Container List'
                    containers={containerArray}
                />
            </div>

            <SelectContainerPopup
                containerArray={containerArray}
            />

            {reportGeneratorState &&
              <ReportGenerator
                container={containerResults}
                unplacedCoffees={unplacedCoffees}
              />
            }

            {selectedReport && (
                <ReportViewer
                    reportId={selectedReport}
                    onClose={() => setSelectedReport(null)}
                />
            )}

            <ReportsListPopup
                reports={reportsList}
                setSelectedReport={setSelectedReport}
            />
            {container3DVisualizerState && containerResults && <Container3DVisualizer initialContainer={containerResults}/>}
          </div>
          <div className="main-content__right">
            <div>
              <SelectedItemList
                  title='Favorite Items'
                  items={favoriteItemsArray}
              />
            </div>
            <div>
              <SelectedContainerList
                  title='Favorite Containers'
                  containers={selectedContainerArray}
              />
            </div>
          </div>
        </main>
      </div>
  );
};

export default HomePage;
