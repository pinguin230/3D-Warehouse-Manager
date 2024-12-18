import React, {useEffect, useState} from 'react';
import './Report.scss';
import {reportAPI} from "../../../services/ReportService.ts";
import ReportDetails from "./ReportDetails.tsx";
import Popup from "../popup/Popup.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {setCheckReportState, setReportViewerState} from "../../../store/redusers/popup/popup.store.ts";

interface Props {
  reportId: string;
  onClose: () => void;
}

const ReportViewer: React.FC<Props> = ({reportId}) => {
  const {data: reportData} = reportAPI.useFetchReportByIDQuery(reportId)
  const [deleteReport] = reportAPI.useDeleteReportMutation()

  const reportViewerStateState = useAppSelector(state => state.popupReducer.reportViewerState)

  const dispatch = useAppDispatch();
  if (!reportData) {
    return <div>Loading...</div>;
  }

  const handleDeleteReport = () => {
    if (confirm("Ви бажаєте видалити цей Звіт?")) {
      deleteReport(reportId)
      dispatch(setReportViewerState(false))
      dispatch(setCheckReportState(true))
    }
  }

  return (
      <Popup show={reportViewerStateState} handleClose={() => dispatch(setReportViewerState(false))}>
        <ReportDetails
            containerName={reportData.containerName}
            totalVolume={reportData.totalVolume}
            usedVolume={reportData.usedVolume}
            usedPercentage={reportData.usedPercentage}
            freeVolume={reportData.freeVolume}
            loadedItems={reportData.loadedItems}
            unplacedItems={reportData.unplacedItems}
        />
        <button onClick={() => dispatch(setReportViewerState(false))} className="close-button">Close</button>
        <button onClick={handleDeleteReport} className="close-button">Delete Item</button>
      </Popup>
  );
};

export default ReportViewer;
