import React, { useState, useEffect } from 'react';
import "./ItemList.scss";
import favoriteIcon from '../../assets/photos/star.png';
import notFavoriteIcon from '../../assets/photos/favorite.png';
import { quickSort } from "../../utils/sortUtils.ts";
import {IItem} from "../../store/redusers/item/item.state.ts";
import {itemAPI} from "../../services/ItemsService.ts";
import EditItemPopup from "../UI/edit-item-popup/EditItemPopup.tsx";
import {favoriteItemAPI} from "../../services/FavoriteItemService.ts";
import {useAppSelector} from "../../hooks/redux.ts";

interface ItemListProps {
  items: IItem[];
  title: string;
  favorite?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ items, title, favorite}) => {
  const userId = useAppSelector(state => state.userReducer.uid)
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(!favorite);
  const [sortedItems, setSortedItems] = useState<IItem[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [deleteItem] = itemAPI.useDeleteItemMutation()
  const [addFavoriteItem] = favoriteItemAPI.useAddFavoriteItemMutation()
  const [deleteFavoriteItem] = favoriteItemAPI.useDeleteFavoriteItemMutation()

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const handleFavoriteToggle = (item: IItem) => {
    if (favorite) {
      deleteFavoriteItem(item)
    } else {
      addFavoriteItem({item, userId});
    }
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

  const handleDeleteItem = (item: IItem) => {
    deleteItem(item)
  }

  return (
      <div className="item-box">
        <div className="item-box__header">
          <div className="item-box__header-top">
            <label>{title}</label>
            <button className="toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
          <div className="sort-button">
            <select onChange={(e) => handleSort(e.target.value as keyof IItem)}>
              <option value="name">Сортувати за Ім'ям</option>
              <option value="weight">Сортувати за Вагою</option>
              <option value="height">Сортувати за Висотою</option>
              <option value="width">Сортувати за Шириною</option>
              <option value="volume">Сортувати за Об’ємом</option>
              {!favorite && <option value="quantity">Сортувати за Кількістю</option>}
            </select>
            <button className="direction-button" onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
        {isExpanded && (
            <ul>
              {sortedItems && sortedItems.map(item => (
                  <li key={item._id} className="items-item">
                    <div className="container-details">
                      <strong>Ім'я:</strong> {item.name}<br/>
                      <strong>Ширина:</strong> {item.width}<br/>
                      <strong>Висота:</strong> {item.height}<br/>
                      <strong>Вага:</strong> {item.weight}<br/>
                      <strong>Глибина:</strong> {item.depth}<br/>
                      <strong>Об'єм:</strong> {item.volume}<br/>
                      {!favorite && (
                          <>
                            <strong>Кількість:</strong> {item.quantity} <br/>
                          </>
                      )}
                    </div>
                    <div className="item-actions">
                      <img
                          src={favorite ? favoriteIcon : notFavoriteIcon}
                          alt="Favorite"
                          className="favorite-icon"
                          onClick={() => handleFavoriteToggle(item)}
                      />
                          <>
                            <button className="edit-button" onClick={() => setSelectedItem(item)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDeleteItem(item)}>Delete</button>
                          </>
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

export default ItemList;
