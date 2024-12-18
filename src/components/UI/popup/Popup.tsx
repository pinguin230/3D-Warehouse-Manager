import React, { useEffect, useRef } from 'react';
import "./Popup.scss";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  styleName?: string; // The style name provided by the user
}

const Popup: React.FC<PopupProps> = ({ show, handleClose, children, styleName }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Dictionary to map names to specific styles
  const styleDictionary: { [key: string]: string } = {
    "Create Container": "create-container-style",
    "Create Item": "create-item-style",
    "Edit Container": "edit-container-style",
    "Edit Item": "edit-item-style",
    "Select Container": "select-container-style",
    // Add more mappings here as needed
  };

  // Determine the style class based on the dictionary
  const styleClass = styleDictionary[styleName] || "default-style";

  // Handle clicks outside the popup
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

    // Cleanup event listener on component unmount
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
