import React, {useState} from 'react';
import CreateCustomItem from "../UI/create-custom-item/CreateCustomItem.tsx";
import {IItem} from "../../store/redusers/item/item.state.ts";

const ItemsManagement = () => {

  const [itemData, setItemData] = useState<IItem>({
    name: null,
    weight: null,
    height: null,
    width: null,
    quantity: null,
    depth: null,
  });

  const handleChangeItemData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'name' ? value : parseFloat(value);
    setItemData({ ...itemData, [name]: parsedValue });
  };

  return (
      <CreateCustomItem
          itemData={itemData}
          handleChangeItemData={handleChangeItemData}
      />
  );
};

export default ItemsManagement;