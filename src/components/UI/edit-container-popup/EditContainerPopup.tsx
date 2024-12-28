import React from 'react';
import {IContainer} from "../../../store/redusers/container/container.state.ts";
import {containerAPI} from "../../../services/ContainerService.ts";
import Popup from "../popup/Popup.tsx";

interface Props {
  container: IContainer;
  setContainer: (container: (prevContainer: IContainer) => {
    _id?: string;
    name: string,
    volume?: number,
    width: number,
    height: number,
    depth: number,
    x?: number,
    y?: number,
    z?: number
    }) => void;
  onClose: () => void;
}

const EditContainerPopup: React.FC<Props> = ({ container, setContainer, onClose }) => {

  const [patchContainer] = containerAPI.usePatchContainerMutation()
  const onChange = (name: string, value: string | number) => {
    setContainer((prevContainer: IContainer) => ({
      ...prevContainer,
      [name]: value,
    }));
  };

  const handleSave = ()=>{
    const {width, height} = container
    const volume = width * height
    patchContainer({...container, volume });
    onClose()
  }

  return (
      <Popup show={true} handleClose={onClose} styleName="Edit Container">
        <div className="edit-container-style-main">
          <h2 className="edit-container-style-header">Edit Container</h2>

          <label className="edit-container-style-label">Ім'я</label>
          <input
              type="text"
              name="name"
              className="edit-container-style-input"
              value={container.name}
              onChange={(e) => onChange("name", e.target.value)}
          />

          <label className="edit-container-style-label">Ширина</label>
          <input
              type="number"
              name="width"
              className="edit-container-style-input"
              value={container.width}
              onChange={(e) => onChange("width", +e.target.value)}
          />

          <label className="edit-container-style-label">Висота</label>
          <input
              type="number"
              name="height"
              className="edit-container-style-input"
              value={container.height}
              onChange={(e) => onChange("height", +e.target.value)}
          />

          <label className="edit-container-style-label">Глибина</label>
          <input
              type="number"
              name="depth"
              className="edit-container-style-input"
              value={container.depth}
              onChange={(e) => onChange("depth", +e.target.value)}
          />

          <button onClick={onClose} className="edit-container-style-close-button">Close</button>
          <button onClick={handleSave} className="edit-container-style-save-button">Save</button>
        </div>
      </Popup>
  );
};

export default EditContainerPopup;
