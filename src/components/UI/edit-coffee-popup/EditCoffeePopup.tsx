import React, { useState } from 'react';
import axios from 'axios';
import {ICoffee} from "../../../types/CoffeeTypes.ts";
import "./EditCoffeePopup.scss"

interface Props {
    coffee: ICoffee;
    onClose: () => void;
    onSave: () => void;
}

const EditCoffeePopup: React.FC<Props> = ({ coffee, onClose, onSave }) => {
    const [formData, setFormData] = useState<ICoffee>(coffee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        axios.patch(`http://localhost:3001/coffee/${coffee._id}`, formData)
            .then(() => {
                onSave();
                onClose();
            })
            .catch(error => {
                console.error('Error while updating coffee:', error);
                alert('Failed to update coffee');
            });
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Edit Coffee</h2>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} /><br />
                <label>Weight:</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} /><br />
                <label>Width:</label>
                <input type="number" name="width" value={formData.width} onChange={handleChange} /><br />
                <label>Height:</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} /><br />
                <label>Quantity:</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} /><br />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EditCoffeePopup;
