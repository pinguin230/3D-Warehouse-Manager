import React, { useState, useEffect } from 'react';
import { ICoffee } from "../../types/CoffeeTypes";
import "./CoffeeList.scss";
import favoriteIcon from './../../photos/star.png';
import notFavoriteIcon from './../../photos/favorite.png';
import createCoffee from "../../utils/createCoffee";
import { CoffeeData } from "../../models/BaseStructures";
import EditCoffeePopup from "../UI/edit-coffee-popup/EditCoffeePopup.tsx";
import { deleteCoffee, deleteFromFavorites, addToSelected } from '../../utils/api';
import { quickSort } from "../../utils/sortUtils.ts";

interface Props {
  coffees: ICoffee[];
  fetchCoffees: () => void;
  title: string;
  favorite?: boolean;
  updateFavoritesCoffees?: () => void;
}

const CoffeeList: React.FC<Props> = ({ coffees, fetchCoffees, title, favorite, updateFavoritesCoffees }) => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [selectedCoffee, setSelectedCoffee] = useState<ICoffee | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [sortedCoffees, setSortedCoffees] = useState<ICoffee[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setSortedCoffees(coffees);
  }, [coffees]);

  const handleFavoriteToggle = (id: string) => {
    favorite ? deleteFromFavorites(id, fetchCoffees) : addToSelected(id, updateFavoritesCoffees);
  };

  const handleCounterChange = (id: string, amount: number) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [id]: Math.max(0, (prevCounters[id] || 1) + amount)
    }));
  };

  const handleAddCoffee = async (coffee: ICoffee, amount: number) => {
    const coffeeData: CoffeeData = {
      name: coffee.name,
      weight: coffee.weight,
      height: coffee.height,
      width: coffee.width,
      volume: coffee.volume,
      type: coffee.type,
      quantity: amount
    };

    if (coffee.grindSize) coffeeData.grindSize = coffee.grindSize;
    if (coffee.beanSize) coffeeData.beanSize = coffee.beanSize;
    if (coffee.capsuleMaterial) coffeeData.capsuleMaterial = coffee.capsuleMaterial;
    if (coffee.solubility) coffeeData.solubility = coffee.solubility;

    await createCoffee(coffeeData);
    fetchCoffees();
  };

  const handleSort = (key: keyof ICoffee) => {
    const sorted = quickSort(coffees, key);
    if (sortDirection === 'desc') sorted.reverse();
    setSortedCoffees(sorted);
  };

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    setSortedCoffees(sortedCoffees.reverse());
  };

  return (
      <div className="coffee-list">
        <div className="header">
          <label>{title}</label>
          <button className="toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '▲' : '▼'}
          </button>
          <div className="sort-button">
            <select onChange={(e) => handleSort(e.target.value as keyof ICoffee)}>
              <option value="name">Sort by Name</option>
              <option value="weight">Sort by Weight</option>
              <option value="height">Sort by Height</option>
              <option value="width">Sort by Width</option>
              <option value="volume">Sort by Volume</option>
              <option value="quantity">Sort by Quantity</option>
            </select>
            <button className="direction-button" onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
        {isExpanded && (
            <ul>
              {sortedCoffees.map(coffee => (
                  <li key={coffee._id} className="container-item">
                    <div className="container-details">
                      <strong>Name:</strong> {coffee.name}<br />
                      <strong>Type:</strong> {coffee.type}<br />
                      <strong>Width:</strong> {coffee.width}<br />
                      <strong>Height:</strong> {coffee.height}<br />
                      <strong>Weight:</strong> {coffee.weight}<br />
                      <strong>Volume:</strong> {coffee.volume}<br />
                      {coffee.grindSize && <span><strong>Grind Size:</strong> {coffee.grindSize}<br /></span>}
                      {coffee.beanSize && <span><strong>Bean Size:</strong> {coffee.beanSize}<br /></span>}
                      {coffee.capsuleMaterial && <span><strong>Capsule Material:</strong> {coffee.capsuleMaterial}<br /></span>}
                      {coffee.solubility && <span><strong>Solubility:</strong> {coffee.solubility}<br /></span>}
                      <strong>Quantity:</strong> {coffee.quantity}<br />
                      {favorite ? (
                          <div className="counter">
                            <button className="counter-button" onClick={() => handleCounterChange(coffee._id, 1)}>+</button>
                            <span id="counter">{counters[coffee._id] || 1}</span>
                            <button className="counter-button" onClick={() => handleCounterChange(coffee._id, -1)}>-</button>
                            <button className="add-coffee-button" onClick={() => handleAddCoffee(coffee, counters[coffee._id] || 1)}>Add Coffee</button>
                          </div>
                      ) : (
                          <>
                            <button className="delete-button" onClick={() => deleteCoffee(coffee._id, fetchCoffees)}>Delete</button>
                            <button className="edit-button" onClick={() => setSelectedCoffee(coffee)}>Edit</button>
                          </>
                      )}
                    </div>
                    <img src={favorite ? favoriteIcon : notFavoriteIcon} alt="Favorite" className="favorite-icon" onClick={() => handleFavoriteToggle(coffee._id)} />
                  </li>
              ))}
            </ul>
        )}
        {selectedCoffee && (
            <EditCoffeePopup
                coffee={selectedCoffee}
                onClose={() => setSelectedCoffee(null)}
                onSave={fetchCoffees}
            />
        )}
      </div>
  );
};

export default CoffeeList;
