import React, {FC, useState} from "react";
import {IContainer} from "../../../store/redusers/container/container.state.ts";
import {containerAPI} from "../../../services/ContainerService.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import Popup from "../popup/Popup.tsx";
import {setCreateContainerState} from "../../../store/redusers/popup/popup.store.ts";
import AlertMessage from "../alert-message/AlertMessage.tsx";

interface CreateCustomContainerProps {
  containerData: IContainer;
  handleChangeContainerData: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const CreateCustomContainer: FC<CreateCustomContainerProps> = ({containerData, handleChangeContainerData}) => {

  const userId = useAppSelector(state => state.userReducer.uid)
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [message, setMessage] = useState(null)
  const [code, setCode] = useState(null)

  const [addContainer] = containerAPI.useAddContainerMutation()

  const createContainerState = useAppSelector(state => state.popupReducer.createContainerState);
  const dispatch = useAppDispatch();

  const handleAddContainer = async () => {

    const {height, width, depth, name} = containerData;
    if (!height || !width || !depth || height < 1 || width < 1 || depth < 1 || name === null) {
      setCode(400)
      setMessage('Поля не повинні бути порожніми. Вага, висота та ширина повинні бути невід\'ємними значеннями.')
      return;
    }

    try {
      await addContainer({
        container: { ...containerData, volume: containerData.height * containerData.width * containerData.depth },
        userId,
      }).unwrap();
      setCode(200)
      setMessage(`Item added successfully`)
      dispatch(setCreateContainerState(false))

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

  return(
      <>
        <Popup show={createContainerState} handleClose={() => dispatch(setCreateContainerState(false))}>
        <div className="create-container-style-main-row">
          <div className="create-container-style-header" onClick={toggleExpand}>
            <label id="label">Створити Контейнер</label>
          </div>
          {['name', 'height', 'width', 'depth'].map((field) => (
              <div key={field} className="create-container-style-input-wrapper">
                <label
                    className={`create-container-style-label ${containerData[field] ? 'active' : ''}`}
                    htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                    id={field}
                    className="create-container-style-input"
                    type={field === 'name' ? 'text' : 'number'}
                    name={field}
                    value={containerData[field]}
                    onChange={handleChangeContainerData}
                />
              </div>
          ))}
          <div className="create-container-style-main-row">
            <button
                className="create-container-style-button"
                onClick={handleAddContainer}
            >
              Create Container
            </button>
            <button
                className="create-container-style-button-close"
                onClick={() => dispatch(setCreateContainerState(false))}
            >
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

export default CreateCustomContainer