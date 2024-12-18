import React, { useState } from 'react';

interface ReportDetailsProps {
  containerName: string;
  totalVolume: number;
  usedVolume: number;
  usedPercentage: number;
  freeVolume: number;
  loadedItems: {
    name: string;
    weight: number;
    volume: number;
    quantity: number;
    usedVolumePercentage: number;
  }[];
  unplacedItems: {
    name: string;
    weight: number;
    volume: number;
    quantity: number;
  }[];
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
                                                       containerName,
                                                       totalVolume,
                                                       usedVolume,
                                                       usedPercentage,
                                                       freeVolume,
                                                       loadedItems,
                                                       unplacedItems
                                                     }) => {
  const [showLoaded, setShowLoaded] = useState(true);
  const [showUnplaced, setShowUnplaced] = useState(false);

  return (
      <>
        <h2>Loading Report</h2>
        <h3>Container Info</h3>
        <p><strong>Name:</strong> {containerName}</p>
        <p><strong>Total Volume:</strong> {totalVolume}</p>
        <p><strong>Used Volume:</strong> {usedVolume} ({usedPercentage.toFixed(2)}%)</p>
        <p><strong>Free Volume:</strong> {freeVolume}</p>

        <div className="section">
          <div className="section-header" onClick={() => setShowLoaded(!showLoaded)}>
            <h3>Loaded Items</h3>
            <button className="toggle-button">{showLoaded ? '▲' : '▼'}</button>
          </div>
          {showLoaded && (
              <ul className="coffee-list">
                {loadedItems.map((item, index) => (
                    <li key={index}>
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Weight:</strong> {item.weight}</p>
                      <p><strong>Volume:</strong> {item.volume}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p>
                        <strong>Used Volume:</strong> {(item.volume * item.quantity / totalVolume * 100).toFixed(2)}%
                      </p>
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
              <ul className="coffee-list">
                {unplacedItems.map((item, index) => (
                    <li key={index}>
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Weight:</strong> {item.weight}</p>
                      <p><strong>Volume:</strong> {item.volume}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </>
  );
};

export default ReportDetails;
