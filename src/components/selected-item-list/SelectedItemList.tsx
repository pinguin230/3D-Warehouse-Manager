import React, { useState, useEffect } from 'react';
import "./SelectedItemList.scss";
import favoriteIcon from '../../assets/photos/star.png';
import { quickSort } from "../../utils/sortUtils.ts";
import {IItem} from "../../store/redusers/item/item.state.ts";
import {itemAPI} from "../../services/ItemsService.ts";
import EditItemPopup from "../UI/edit-item-popup/EditItemPopup.tsx";
import {favoriteItemAPI} from "../../services/FavoriteItemService.ts";

interface ItemListProps {
  items: IItem[];
  title: string;
}

const SelectedItemList: React.FC<ItemListProps> = ({ items, title}) => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedItems, setSortedItems] = useState<IItem[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [putItem] = itemAPI.usePutItemMutation()
  const [deleteFavoriteItem] = favoriteItemAPI.useDeleteFavoriteItemMutation()

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const handleFavoriteToggle = (item: IItem) => {
    deleteFavoriteItem(item)
  };

  const handleCounterChange = (id: string, amount: number) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [id]: Math.max(0, (prevCounters[id] || 1) + amount)
    }));
  };

  const handleAddItem = async (item: IItem, amount: number) => {
    console.log(item)
    const newItem = {...item, quantity: amount};
    putItem(newItem)
  };

  const handleSort = (key: keyof IItem) => {
    const sorted = quickSort(items, key);
    if (sortDirection === 'desc') sorted.reverse();
    setSortedItems(sorted);
  };

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    setSortedItems(sortedItems.reverse());
  };

  return (
      <div className="selected-items-box">
        <div className="selected-items-box__header">
          <div className="selected-items-box__header-top">
            <label>{title}</label>
            <button className="toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
          <div className="sort-button">
            <select onChange={(e) => handleSort(e.target.value as keyof IItem)}>
              <option value="name">Sort by Name</option>
              <option value="weight">Sort by Weight</option>
              <option value="height">Sort by Height</option>
              <option value="width">Sort by Width</option>
              <option value="volume">Sort by Volume</option>
            </select>
            <button className="direction-button" onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
        {isExpanded && (
            <ul>
              {sortedItems && sortedItems.map(item => (
                  <li key={item._id} className="selected-items-item">
                    <div className="selected-item-details">
                      <strong>Name:</strong> {item.name}<br/>
                      <strong>Width:</strong> {item.width}<br/>
                      <strong>Height:</strong> {item.height}<br/>
                      <strong>Weight:</strong> {item.weight}<br/>
                      <strong>Depth:</strong> {item.depth}<br/>
                      <strong>Volume:</strong> {item.volume}<br/>
                    </div>
                    <div className="selected-item-actions">
                      <img
                          src={favoriteIcon}
                          alt="Favorite"
                          className="favorite-icon"
                          onClick={() => handleFavoriteToggle(item)}
                      />
                          <div className="counter">
                            <div>
                              <button className="counter-button" onClick={() => handleCounterChange(item._id, -1)}>-</button>
                              <span id="counter">{counters[item._id] || 1}</span>
                              <button className="counter-button" onClick={() => handleCounterChange(item._id, 1)}>+</button>
                            </div>
                            <div>
                              <button className="add-item-button"
                                      onClick={() => handleAddItem(item, counters[item._id] || 1)}>Add Item
                              </button>
                            </div>
                          </div>
                    </div>
                  </li>
              ))}
            </ul>
        )}
        {selectedItem && (
            <EditItemPopup
                item={selectedItem}
                setItem={setSelectedItem}
                onClose={() => setSelectedItem(null)}
            />
        )}
      </div>
  );
};

export default SelectedItemList;
