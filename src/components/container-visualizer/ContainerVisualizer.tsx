import React from 'react';
import Container3DVisualizer from "../threeJS/threeJSTest.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {setContainer3DVisualizerState} from "../../store/redusers/popup/popup.store.ts";

const ContainerVisualizer = (containerResults) => {

  const dispatch = useAppDispatch()
  const container3DVisualizerState = useAppSelector(state => state.popupReducer.container3DVisualizerState)

  console.log(containerResults)
  if (container3DVisualizerState && containerResults.containerResults === null){
    alert('Будь ласка, оберіть контейнер та запустіть алгоритм для візуалізації');
    dispatch(setContainer3DVisualizerState(false))
    return null;
  }

  return (
      <>
        {container3DVisualizerState && <Container3DVisualizer initialContainer={containerResults}/>}
      </>
  );
};

export default ContainerVisualizer;