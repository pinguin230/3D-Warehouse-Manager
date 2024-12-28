import React from 'react';
import "./EditItemPopup.scss"
import {IItem} from "../../../store/redusers/item/item.state.ts";
import {itemAPI} from "../../../services/ItemsService.ts";
import Popup from "../popup/Popup.tsx";

interface Props {
  item: IItem;
  setItem: (item: (prevItem: IItem) => {
    _id?: string;
    name: string;
    weight: number;
    height: number;
    depth: number;
    width: number;
    volume?: number;
    quantity: number;
  }) => void;
  onClose: () => void;

}

const EditItemPopup: React.FC<Props> = ({item, setItem, onClose}) => {

  const [patchItem] = itemAPI.usePatchItemMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setItem((prevItem: IItem) => ({
      ...prevItem,
      [name]: value,
    }))
  };

  const handleSubmit = () => {
    const {width, height, depth} = item
    const volume = width * height * depth;
    patchItem({...item, volume});
    onClose()
  };

  return (
      <Popup show={true} handleClose={onClose}>
        <div className="edit-item-style-main">
          <h2 className="edit-item-style-header">Edit Item</h2>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Ім'я:</label>
            <input
                type="text"
                name="name"
                className="edit-item-style-input"
                value={item.name}
                onChange={handleChange}
            />
          </div>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Вага:</label>
            <input
                type="number"
                name="weight"
                className="edit-item-style-input"
                value={item.weight}
                onChange={handleChange}
            />
          </div>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Ширина:</label>
            <input
                type="number"
                name="width"
                className="edit-item-style-input"
                value={item.width}
                onChange={handleChange}
            />
          </div>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Висота:</label>
            <input
                type="number"
                name="height"
                className="edit-item-style-input"
                value={item.height}
                onChange={handleChange}
            />
          </div>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Кількість:</label>
            <input
                type="number"
                name="quantity"
                className="edit-item-style-input"
                value={item.quantity}
                onChange={handleChange}
            />
          </div>

          <div className="edit-item-style-input-wrapper">
            <label className="edit-item-style-label">Глибина:</label>
            <input
                type="number"
                name="depth"
                className="edit-item-style-input"
                value={item.depth}
                onChange={handleChange}
            />
          </div>

          <button onClick={handleSubmit} className="edit-item-style-save-button">Save</button>
          <button onClick={onClose} className="edit-item-style-close-button">Close</button>
        </div>
      </Popup>

  );
};

export default EditItemPopup;
