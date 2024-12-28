import React, { useEffect, useRef } from 'react';
import "./Popup.scss";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  styleName?: string;
}

const Popup: React.FC<PopupProps> = ({ show, handleClose, children, styleName }) => {
  const popupRef = useRef<HTMLDivElement>(null);


  const styleDictionary: { [key: string]: string } = {
    "Create Container": "create-container-style",
    "Create Item": "create-item-style",
    "Edit Container": "edit-container-style",
    "Edit Item": "edit-item-style",
    "Select Container": "select-container-style",

  };


  const styleClass = styleDictionary[styleName] || "default-style";


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, handleClose]);

  return (
      show ? (
          <div className={`popup ${styleClass}`}>
            <div className="popup-inner" ref={popupRef}>
              {children}
            </div>
          </div>
      ) : null
  );
};

export default Popup;
