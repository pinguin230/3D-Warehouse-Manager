import React, { useState } from 'react';
import { Container } from "../../models/Container";
import { BaseCoffee } from "../../models/BaseCoffee";
import "./ContainerVisualizer.scss";

interface Props {
    container: Container;
}

const ContainerVisualizer: React.FC<Props> = ({ container }) => {
    const [scale, setScale] = useState(1);
    const [hoveredCoffee, setHoveredCoffee] = useState<BaseCoffee | null>(null);
    const [showNames, setShowNames] = useState(false);
    const [highlightMode, setHighlightMode] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState<BaseCoffee | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const containerStyle: React.CSSProperties = {
        width: `${container.getWidth() * scale}px`,
        height: `${container.getHeight() * scale}px`,
        position: 'relative',
        border: '2px solid black',
        margin: '50px',
        padding: '20px',
        overflow: 'hidden'
    };

    const zoomIn = () => setScale(scale + 0.1);
    const zoomOut = () => setScale(Math.max(0.1, scale - 0.1));
    const toggleShowNames = () => setShowNames(!showNames);
    const toggleHighlightMode = () => setHighlightMode(!highlightMode);

    const handleCoffeeClick = (coffee: BaseCoffee) => {
        setSelectedCoffee(coffee);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedCoffee(null);
    };

    return (
        <div>
            <div className="zoom-controls">
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
                <button onClick={toggleShowNames}>
                    {showNames ? 'Hide Names' : 'Show Names'}
                </button>
                <button onClick={toggleHighlightMode}>
                    {highlightMode ? 'Disable Highlight' : 'Enable Highlight'}
                </button>
            </div>
            <div style={{height: "50px"}}>{hoveredCoffee && (
                <div className="selected-coffee-name">
                    {hoveredCoffee.getName()}
                </div>
            )}</div>
            <div style={containerStyle}>
                {container.contents.map((coffee, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: `${coffee.getY() * scale}px`,
                            left: `${coffee.getX() * scale}px`,
                            width: `${coffee.getWidth() * scale}px`,
                            height: `${coffee.getHeight() * scale}px`,
                            backgroundColor: highlightMode && hoveredCoffee?.getName() === (coffee instanceof BaseCoffee ? coffee.getName() : null) ? 'yellow' : 'brown',
                            border: '1px solid #000',
                            boxSizing: 'border-box',
                        }}
                        onMouseEnter={() => setHoveredCoffee(coffee instanceof BaseCoffee ? coffee : null)}
                        onMouseLeave={() => setHoveredCoffee(null)}
                        onClick={() => highlightMode && coffee instanceof BaseCoffee && handleCoffeeClick(coffee)}
                    >
                        {(showNames || hoveredCoffee === coffee) && (
                            <div className="coffee-tooltip">{coffee instanceof BaseCoffee ? coffee.getName() : null}</div>
                        )}
                    </div>
                ))}
            </div>
            {popupVisible && selectedCoffee && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Name: {selectedCoffee.getName()}</h2>
                        <p>Type: {selectedCoffee.getType()}</p>
                        <p>Weight: {selectedCoffee.getWeight()}</p>
                        <p>Dimensions: {selectedCoffee.getWidth()}x{selectedCoffee.getHeight()}</p>
                        <button onClick={handleClosePopup} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContainerVisualizer;
