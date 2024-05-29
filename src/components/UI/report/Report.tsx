import React, { useState } from 'react';
import { BaseCoffee } from "../../../models/BaseCoffee.ts";
import { Container } from "../../../models/Container.ts";
import './Report.scss';
import axios from "axios";

interface Props {
  container: Container;
  unplacedCoffees: BaseCoffee[];
  onClose: () => void;
}

const groupCoffeesByName = (coffees: BaseCoffee[]) => {
  const coffeeMap: { [key: string]: { coffee: BaseCoffee, quantity: number } } = {};

  coffees.forEach(coffee => {
    if (coffeeMap[coffee.getName()]) {
      coffeeMap[coffee.getName()].quantity += 1;
    } else {
      coffeeMap[coffee.getName()] = { coffee, quantity: 1 };
    }
  });

  return Object.values(coffeeMap);
};

const Report: React.FC<Props> = ({ container, unplacedCoffees, onClose }) => {
  const [showLoaded, setShowLoaded] = useState(true);
  const [showUnplaced, setShowUnplaced] = useState(true);

  const totalVolume = container.getVolume();
  const usedVolume = container.contents.reduce((sum, coffee) => sum + coffee.getVolume(), 0);
  const freeVolume = totalVolume - usedVolume;
  const usedPercentage = (usedVolume / totalVolume) * 100;

  const groupedLoadedCoffees = groupCoffeesByName(container.contents);
  const groupedUnplacedCoffees = groupCoffeesByName(unplacedCoffees);

  const saveReport = async () => {
    const reportData = {
      containerName: container.getName(),
      containerWidth: container.getWidth(),
      containerHeight: container.getHeight(),
      totalVolume: container.getVolume(),
      usedVolume,
      freeVolume,
      usedPercentage,
      loadedCoffees: groupedLoadedCoffees.map(({ coffee, quantity }) => ({
        name: coffee.getName(),
        weight: coffee.getWeight(),
        volume: coffee.getVolume(),
        quantity,
        usedVolumePercentage: (1 / (totalVolume / (coffee.getVolume() * quantity)) * 100).toFixed(2)
      })),
      unplacedCoffees: groupedUnplacedCoffees.map(({ coffee, quantity }) => ({
        name: coffee.getName(),
        weight: coffee.getWeight(),
        volume: coffee.getVolume(),
        quantity
      }))
    };

    try {
      await axios.post('http://localhost:3001/saveReport', reportData);
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
          <p><strong>Name:</strong> {container.getName()}</p>
          <p><strong>Width:</strong> {container.getWidth()}</p>
          <p><strong>Height:</strong> {container.getHeight()}</p>
          <p><strong>Total Volume:</strong> {totalVolume}</p>
          <p><strong>Used Volume:</strong> {usedVolume} ({usedPercentage.toFixed(2)}%)</p>
          <p><strong>Free Volume:</strong> {freeVolume}</p>

          <div className="section">
            <div className="section-header" onClick={() => setShowLoaded(!showLoaded)}>
              <h3>Loaded Coffees</h3>
              <button className="toggle-button">{showLoaded ? '▲' : '▼'}</button>
            </div>
            {showLoaded && (
                <ul className="coffee-list">
                  {groupedLoadedCoffees.map(({coffee, quantity}, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {coffee.getName()}</p>
                        <p><strong>Weight:</strong> {coffee.getWeight()}</p>
                        <p><strong>Volume:</strong> {coffee.getVolume()}</p>
                        <p><strong>Quantity:</strong> {quantity}</p>
                        <p><strong>Used
                          Volume: {(1 / (totalVolume / (coffee.getVolume() * quantity)) * 100).toFixed(2)}%</strong></p>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="section">
            <div className="section-header" onClick={() => setShowUnplaced(!showUnplaced)}>
              <h3>Unplaced Coffees</h3>
              <button className="toggle-button">{showUnplaced ? '▲' : '▼'}</button>
            </div>
            {showUnplaced && (
                <ul className="coffee-list">
                  {groupedUnplacedCoffees.map(({coffee, quantity}, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {coffee.getName()}</p>
                        <p><strong>Weight:</strong> {coffee.getWeight()}</p>
                        <p><strong>Volume:</strong> {coffee.getVolume()}</p>
                        <p><strong>Quantity:</strong> {quantity}</p>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <button onClick={onClose} className="close-button">Close</button>
          <button onClick={saveReport} className="save-button">Save Report</button>
        </div>
      </div>
  );
};

export default Report;
