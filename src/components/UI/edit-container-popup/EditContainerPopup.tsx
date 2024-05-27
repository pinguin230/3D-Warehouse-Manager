import React from 'react';
import {IContainer} from "../../../types/ContainerTypes.ts";

interface Props {
  container: IContainer;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const EditContainerPopup: React.FC<Props> = ({ container, onChange, onSubmit, onClose }) => {
  return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Edit Container</h2>
          <label>Name</label>
          <input
              type="text"
              name="name"
              value={container.name}
              onChange={onChange}
          />
          <label>Width</label>
          <input
              type="number"
              name="width"
              value={container.width}
              onChange={onChange}
          />
          <label>Height</label>
          <input
              type="number"
              name="height"
              value={container.height}
              onChange={onChange}
          />
          <button onClick={onSubmit} className="save-button">Save</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
  );
};

export default EditContainerPopup;
