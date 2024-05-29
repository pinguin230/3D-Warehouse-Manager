import React from 'react';
import './ReportsListPopup.scss';
import Popup from "../popup/Popup.tsx";

interface ReportSummary {
  _id: string;
  containerName: string;
  usedVolume: number;
  totalVolume: number;
  createdAt: string;
}

interface Props {
  reports: ReportSummary[];
  onClose: () => void;
  onViewDetail: (reportId: string) => void;
}

const ReportsListPopup: React.FC<Props> = ({ reports, onClose, onViewDetail }) => {

  const onClick = (id: string) => {
    onViewDetail(id);
    onClose();
  };

  return (
      <Popup show={true} handleClose={onClose}>
        <div className="reports-list-popup">
          <h2>All Reports</h2>
          <ul>
            {reports.map(report => (
                <li key={report._id}>
                  <div className="report-details">
                    <strong>Container:</strong> {report.containerName} <br/>
                    <strong>Used Volume:</strong> {report.usedVolume}/{report.totalVolume} <br/>
                    <strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}
                  </div>
                  <button className="view-details-button" onClick={() => onClick(report._id)}>View Details</button>
                </li>
            ))}
          </ul>
        </div>
      </Popup>
  );
};

export default ReportsListPopup;
