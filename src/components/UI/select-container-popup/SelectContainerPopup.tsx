import React, {FC} from 'react';
import {setContainer} from "../../../store/redusers/container/container.store.ts";
import Popup from "../popup/Popup.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {IContainer} from "../../../store/redusers/container/container.state.ts";
import {setSelectedContainerState} from "../../../store/redusers/popup/popup.store.ts";

interface SelectContainerPopupProps {
  containerArray: IContainer[];
}

const SelectContainerPopup: FC<SelectContainerPopupProps> = ({containerArray}) => {

  const selectedContainerState = useAppSelector(state => state.popupReducer.selectedContainerState);
  const dispatch = useAppDispatch();

  return (
      <>
        <Popup show={selectedContainerState} styleName="Select Container"
               handleClose={() => dispatch(setSelectedContainerState(false))}>
          <h2>Select a Container</h2>
          <ul className="select-container-style-list">
            {containerArray && containerArray.map(container => (
                <li
                    key={container._id}
                    className="select-container-style-item"
                    onClick={() => {
                      dispatch(setContainer(container));
                      dispatch(setSelectedContainerState(false));
                    }}
                >
                  {container.name} - {container.width}x{container.height}
                </li>
            ))}
          </ul>
          <button
              className="select-container-style-close-button"
              onClick={() => dispatch(setSelectedContainerState(false))}
          >
            Close
          </button>

        </Popup>
      </>
  );
};

export default SelectContainerPopup;