import React from 'react';
import {ICoffee} from "../../../types/CoffeeTypes.ts";

interface Props {
  onSort: (criterion: keyof ICoffee) => void;
}

const SortButton: React.FC<Props> = ({ onSort }) => {
  return (
      <div className="sort-button">
        <select onChange={(e) => onSort(e.target.value as keyof ICoffee)}>
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
