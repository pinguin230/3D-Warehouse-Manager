import React, {FC, useState} from "react";
import {itemAPI} from "../../../services/ItemsService.ts";
import {IItem} from "../../../store/redusers/item/item.state.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import Popup from "../popup/Popup.tsx";
import {setCreateItemState} from "../../../store/redusers/popup/popup.store.ts";
import AlertMessage from "../alert-message/AlertMessage.tsx";

interface CreateCustomItemProps {
  itemData: IItem;
  handleChangeItemData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateCustomItem: FC<CreateCustomItemProps> = ({itemData, handleChangeItemData}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [message, setMessage] = useState(null)
  const [code, setCode] = useState(null)

  const userId = useAppSelector(state => state.userReducer.uid)
  const [addItem] = itemAPI.useAddItemMutation()

  const createCustomItem = async (itemData) => {
    const {weight, height, width, depth, name} = itemData;
    if (!weight || !height || !width || !depth || weight < 1 || height < 1 || width < 1 || depth < 1 || name === null) {
      setCode(400)
      setMessage('Поля не повинні бути порожніми. Вага, висота, глубина та ширина повинні бути невід\'ємними значеннями.')
      return;
    }
    itemData.volume = height * width * depth;
    try {
      const response = await addItem({ item: itemData, userId }).unwrap();
      setCode(200)
      setMessage(`Item added successfully`)
      dispatch(setCreateItemState(false))
    } catch (error) {
      setCode(400)
      setMessage(`Error adding item: ${error}`)
      if (error?.data?.message) {

        setCode(400)
        setMessage(`Error: ${error.data.message}`)
      } else if (error.error) {

        setCode(400)
        setMessage(`Error: ${error.error}`)
      } else {
        setCode(400)
        setMessage("An unknown error occurred")
      }
    }

  }

  const createItemState = useAppSelector(state => state.popupReducer.createItemState);
  const dispatch = useAppDispatch();

  return (
      <>
        <Popup show={createItemState} handleClose={() => dispatch(setCreateItemState(false))}>
          <div className="create-item-style-main-row">
            <div className="create-item-style-header" onClick={toggleExpand}>
              <label id="label">Додати Предмет</label>
            </div>
            {['name', 'weight', 'height', 'width', 'depth', 'quantity'].map((field) => (
                <div key={field} className="create-item-style-input-wrapper">
                  <label
                      className={`create-item-style-label ${itemData[field] ? 'active' : ''}`}
                      htmlFor={field}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                      id={field}
                      className="create-item-style-input"
                      type={field === 'name' ? 'text' : 'number'}
                      name={field}
                      value={itemData[field]}
                      onChange={handleChangeItemData}
                  />
                </div>
            ))}
            <div className="create-item-style-main-row">
              <button className="create-item-style-button" onClick={() => createCustomItem(itemData)}>
                Create Item
              </button>

              <button className="create-item-style-button-close" onClick={() => dispatch(setCreateItemState(false))}>
                Close
              </button>
            </div>
          </div>
        </Popup>
        {message && (
            <AlertMessage
                code={code}
                message={message}
                setMessage={setMessage}
                duration={3000}
            />
        )}
      </>

  )
}

export default CreateCustomItem;