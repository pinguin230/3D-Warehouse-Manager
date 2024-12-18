import React from 'react';
import {IItem} from "../../../store/redusers/item/item.state.ts";

interface Props {
  onSort: (criterion: keyof IItem) => void;
}

const SortButton: React.FC<Props> = ({ onSort }) => {
  return (
      <div className="sort-button">
        <select onChange={(e) => onSort(e.target.value as keyof IItem)}>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
          <option value="height">Height</option>
          <option value="width">Width</option>
          <option value="volume">Volume</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
  );
};

export default SortButton;
