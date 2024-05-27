import React, { useState } from 'react';
import axios from 'axios';
import { IContainer } from "../../types/ContainerTypes";
import "./ContainersList.scss";
import favoriteIcon from './../../photos/star.png';
import notFavoriteIcon from './../../photos/favorite.png';
import {
    deleteContainer,
    deleteFromFavorites,
    addToSelected,
    patchContainer,
    addToSelectedContainer
} from '../../utils/api'; // Імпорт функцій
import EditContainerPopup from "../UI/edit-container-popup/EditContainerPopup"; // Імпорт компоненти

interface Props {
    containers: IContainer[];
    fetchContainer: () => void;
    title: string;
    favorite?: boolean;
    updateFavoriteContainer?: () => void;
}

const ContainerList: React.FC<Props> = ({ containers, fetchContainer, title, favorite, updateFavoriteContainer }) => {
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [editContainerData, setEditContainerData] = useState<IContainer | null>(null);
    const [expanded, setExpanded] = useState(true);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editContainerData) {
            const updatedData = {
                ...editContainerData,
                [name]: value
            };

            if (name === 'height' || name === 'width') {
                updatedData.volume = updatedData.height * updatedData.width;
            }

            setEditContainerData(updatedData);
        }
    };

    const handleEditSubmit = () => {
        if (editContainerData) {
            patchContainer(editContainerData._id, editContainerData, fetchContainer, () => setEditPopupVisible(false));
        }
    };

    const handleEdit = (container: IContainer) => {
        setEditContainerData(container);
        setEditPopupVisible(true);
    };

    const handleFavoriteToggle = (id: string) => {
        favorite ? deleteFromFavorites(id, fetchContainer) : addToSelectedContainer(id, updateFavoriteContainer);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="coffee-list">
            <div className="header" onClick={toggleExpand}>
                <label>{title}</label>
                <button className="toggle-button">
                    {expanded ? '▲' : '▼'}
                </button>
            </div>
            {expanded && (
                <ul>
                    {containers.map(container => (
                        <li key={container._id} className="container-item">
                            <div className="container-details">
                                <strong>Name:</strong> {container.name}<br />
                                <strong>Width:</strong> {container.width}<br />
                                <strong>Height:</strong> {container.height}<br />
                                <strong>Volume:</strong> {container.volume}<br />
                                {favorite ? null : <>
                                    <button onClick={() => deleteContainer(container._id, fetchContainer)} className="delete-button">Delete
                                    </button>
                                    <button onClick={() => handleEdit(container)} className="edit-button">Edit</button>
                                </>}
                            </div>
                            <img src={favorite ? favoriteIcon : notFavoriteIcon} alt="Favorite" className="favorite-icon"
                                 onClick={() => handleFavoriteToggle(container._id)} />
                        </li>
                    ))}
                </ul>
            )}
            {editPopupVisible && editContainerData && (
                <EditContainerPopup
                    container={editContainerData}
                    onChange={handleEditChange}
                    onSubmit={handleEditSubmit}
                    onClose={() => setEditPopupVisible(false)}
                />
            )}
        </div>
    );
};

export default ContainerList;
