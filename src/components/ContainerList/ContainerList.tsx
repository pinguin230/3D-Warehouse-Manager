import React, { useState, useEffect } from 'react';
import { IContainer } from "../../types/ContainerTypes";
import "./ContainersList.scss";
import favoriteIcon from './../../photos/star.png';
import notFavoriteIcon from './../../photos/favorite.png';
import {
    deleteContainer,
    deleteFromFavorites,
    addToSelected,
    patchContainer,
    addToSelectedContainer, deleteFromFavoritesContainer
} from '../../utils/api'; // Імпорт функцій
import EditContainerPopup from "../UI/edit-container-popup/EditContainerPopup"; // Імпорт компоненти
import { quickSort } from "../../utils/sortUtils.ts";
import createContainer from "../../utils/createContainer.ts"; // Імпорт функції сортування

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
    const [sortedContainers, setSortedContainers] = useState<IContainer[]>(containers);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        setSortedContainers(containers);
    }, [containers]);

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
        favorite ? deleteFromFavoritesContainer(id, fetchContainer) : addToSelectedContainer(id, updateFavoriteContainer);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleSort = (key: keyof IContainer) => {
        const sorted = quickSort(containers, key);
        if (sortDirection === 'desc') sorted.reverse();
        setSortedContainers(sorted);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        setSortedContainers(sortedContainers.reverse());
    };

    const handleAddContainer = async (container: IContainer) => {
        const postData = {
            name: container.name,
            width: container.width,
            height: container.height,
            volume: container.volume
        };

        try {
            const response = await createContainer(postData);
            fetchContainer();
        } catch (error) {
            console.error('Error while adding to selected:', error);
            alert('Failed to add to selected');
        }
    };

    return (
        <div className="coffee-list">
            <div className="header" >
                <label>{title}</label>
                <button className="toggle-button" onClick={toggleExpand}>
                    {expanded ? '▲' : '▼'}
                </button>
                <div className="sort-button">
                    <select onChange={(e) => handleSort(e.target.value as keyof IContainer)}>
                        <option value="name">Sort by Name</option>
                        <option value="width">Sort by Width</option>
                        <option value="height">Sort by Height</option>
                        <option value="volume">Sort by Volume</option>
                    </select>
                    <button className="direction-button" onClick={toggleSortDirection}>
                        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>
            {expanded && (
                <ul>
                    {sortedContainers.map(container => (
                        <li key={container._id} className="container-item">
                            <div className="container-details">
                                <strong>Name:</strong> {container.name}<br />
                                <strong>Width:</strong> {container.width}<br />
                                <strong>Height:</strong> {container.height}<br />
                                <strong>Volume:</strong> {container.volume}<br />
                                {favorite ?
                                    <button className="add-coffee-button"
                                            onClick={() => handleAddContainer(container)}>Add Container
                                    </button> : <>
                                        <button onClick={() => deleteContainer(container._id, fetchContainer)}
                                                className="delete-button">Delete
                                        </button>
                                        <button onClick={() => handleEdit(container)} className="edit-button">Edit
                                        </button>
                                    </>}
                            </div>
                            <img src={favorite ? favoriteIcon : notFavoriteIcon} alt="Favorite"
                                 className="favorite-icon"
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
