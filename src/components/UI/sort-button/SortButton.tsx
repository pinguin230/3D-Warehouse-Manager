import React from 'react';
import {IItem} from "../../../store/redusers/item/item.state.ts";

interface Props {
  onSort: (criterion: keyof IItem) => void;
}

const SortButton: React.FC<Props> = ({ onSort }) => {
  return (
      <div className="sort-button">
        <select onChange={(e) => onSort(e.target.value as keyof IItem)}>
          <option value="name">Ім'я</option>
          <option value="weight">Вага</option>
          <option value="height">Висота</option>
          <option value="width">Ширина</option>
          <option value="volume">Об'єм</option>
          <option value="quantity">Кількість</option>
        </select>
      </div>
  );
};

export default SortButton;
