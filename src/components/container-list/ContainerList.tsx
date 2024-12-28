import React, { useState, useEffect } from 'react';
import "./ContainersList.scss";
import favoriteIcon from '../../assets/photos/star.png';
import notFavoriteIcon from '../../assets/photos/favorite.png';
import EditContainerPopup from "../UI/edit-container-popup/EditContainerPopup";
import { quickSort } from "../../utils/sortUtils.ts";
import {favoriteContainerAPI} from "../../services/FavoriteContainerService.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {setContainer} from "../../store/redusers/container/container.store.ts";
import {IContainer} from "../../store/redusers/container/container.state.ts";
import {containerAPI} from "../../services/ContainerService.ts";

interface Props {
    containers: IContainer[];
    title: string;
    favorite?: boolean;
}

const ContainerList: React.FC<Props> = ({ title, containers, favorite}) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.userReducer.uid)


    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [editContainerData, setEditContainerData] = useState<IContainer | null>(null);
    const [expanded, setExpanded] = useState(!favorite);
    const [sortedContainers, setSortedContainers] = useState<IContainer[]>(containers);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [deleteContainer] = containerAPI.useDeleteContainerMutation()

    const [deleteFavoriteContainer] = favoriteContainerAPI.useDeleteFavoriteContainerMutation()
    const [patchFavoriteContainer] = favoriteContainerAPI.useAddFavoriteContainerMutation()

    useEffect(() => {
        setSortedContainers(containers);
    }, [containers]);

    const handleEdit = (container: IContainer) => {
        setEditContainerData(container);
        setEditPopupVisible(true)
    };

    const handleFavoriteToggle = (container) => {
        console.log(container)
        if (favorite) {
            deleteFavoriteContainer(container);
        } else {
            patchFavoriteContainer({ container, userId });
        }
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
        dispatch(setContainer(container))
    };

    return (
        <div className="container-box">
            <div className="container-box__header" >
                <div className="container-box__header-top" >
                    <label>{title}</label>
                    <button className="toggle-button" onClick={toggleExpand}>
                        {expanded ? '▲' : '▼'}
                    </button>
                </div>
                <div className="sort-button">
                    <select onChange={(e) => handleSort(e.target.value as keyof IContainer)}>
                        <option value="name">Сортувати за Ім'ям</option>
                        <option value="width">Сортувати за Шириною</option>
                        <option value="height">Сортувати за Висотою</option>
                        <option value="volume">Сортувати за Об’ємом</option>
                    </select>
                    <button className="direction-button" onClick={toggleSortDirection}>
                        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>
            {expanded && (
                <ul className="container-item-array">
                    {containers && containers.map(container => (
                        <li key={container._id} className="container-item">
                            <div className="container-details">
                                <strong>Ім'я:</strong> {container.name}<br/>
                                <strong>Ширина:</strong> {container.width}<br/>
                                <strong>Висота:</strong> {container.height}<br/>
                                <strong>Об'єм:</strong> {container.volume}<br/>
                                <strong>Глибина:</strong> {container.depth} <br/>
                            </div>
                            <div className="container-actions">
                            <img src={favorite ? favoriteIcon : notFavoriteIcon} alt="Favorite"
                                     className="favorite-icon"
                                     onClick={() => handleFavoriteToggle(container)}
                                />
                                {favorite
                                    ?
                                    <button className="add-item-button"
                                            onClick={() => handleAddContainer(container)}>Select Container
                                    </button>
                                    :
                                    <>
                                        <button onClick={() => handleEdit(container)} className="edit-button">Edit
                                        </button>
                                        <button
                                            onClick={() => deleteContainer(container)}
                                            className="delete-button">Delete
                                        </button>
                                    </>
                                }

                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {editPopupVisible && editContainerData && (
                <EditContainerPopup
                    container={editContainerData}
                    setContainer={setEditContainerData}
                    onClose={() => setEditPopupVisible(false)}
                />
            )}
        </div>
    );
};

export default ContainerList;
