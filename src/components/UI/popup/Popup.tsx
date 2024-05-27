import React from 'react';
import "./Popup.scss";

interface PopupProps {
    show: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, handleClose, children }) => {
    return (
        show ? (
            <div className="popup">
                <div className="popup-inner">
                    {children}
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        ) : null
    );
};

export default Popup;
