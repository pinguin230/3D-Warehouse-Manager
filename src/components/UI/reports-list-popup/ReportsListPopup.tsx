import React from 'react';
import './ReportsListPopup.scss';
import Popup from "../popup/Popup.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {setCheckReportState, setReportViewerState} from "../../../store/redusers/popup/popup.store.ts";
import {IReport} from "../../../../server/controllers/report.controller.ts";

interface Props {
  reports: IReport[];
  setSelectedReport: (report: string) => void;
}

const ReportsListPopup: React.FC<Props> = ({ reports, setSelectedReport}) => {

  const dispatch = useAppDispatch();

  const checkReportState = useAppSelector(state => state.popupReducer.checkReportState);

  const handleViewDetail = (reportId: string) => {
    const report = reports.find(r => r._id === reportId);
    if (report) {
      setSelectedReport(report._id);
      dispatch(setCheckReportState(false));
      dispatch(setReportViewerState(true))
    }
  };

  return (
      <Popup show={checkReportState} handleClose={()=>dispatch(setCheckReportState(false))}>
        <div className="reports-list-popup">
          <h2>Список звітів</h2>
          <ul>
            {reports && reports.map(report => (
                <li key={report._id}>
                  <div className="report-details">
                    <strong>Container:</strong> {report.containerName} <br />
                    <strong>Використаний Об'єм:</strong> {report.usedVolume}/{report.totalVolume} <br />
                    <strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}
                  </div>
                  <button
                      className="view-details-button"
                      onClick={() => handleViewDetail(report._id)}
                  >
                    View Details
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </Popup>
  );
};

export default ReportsListPopup;
