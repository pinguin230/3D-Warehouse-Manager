import React, {useState, useEffect} from 'react';
import "./SelectedContainerList.scss";
import favoriteIcon from '../../assets/photos/star.png';
import EditContainerPopup from "../UI/edit-container-popup/EditContainerPopup";
import {quickSort} from "../../utils/sortUtils.ts";
import {favoriteContainerAPI} from "../../services/FavoriteContainerService.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {setContainer} from "../../store/redusers/container/container.store.ts";
import {IContainer} from "../../store/redusers/container/container.state.ts";

interface Props {
  containers: IContainer[];
  title: string;
}

const SelectedContainerList: React.FC<Props> = ({title, containers}) => {
  const dispatch = useAppDispatch()

  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editContainerData, setEditContainerData] = useState<IContainer | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [sortedContainers, setSortedContainers] = useState<IContainer[]>(containers);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


  const [deleteFavoriteContainer] = favoriteContainerAPI.useDeleteFavoriteContainerMutation()

  useEffect(() => {
    setSortedContainers(containers);
  }, [containers]);


  const handleFavoriteToggle = (container) => {
    deleteFavoriteContainer(container)
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
      <div className="selected-containers-box">
        <div className="selected-containers-box__header">
          <div className="selected-containers-box__header-top">
            <label>{title}</label>
            <button className="toggle-button" onClick={toggleExpand}>
              {expanded ? '▲' : '▼'}
            </button>
          </div>
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
            <ul className="selected-container-items-array">
              {containers && containers.map(container => (
                  <li key={container._id} className="selected-container-item">
                    <div className="selected-container-details">
                      <strong>Name:</strong> {container.name}<br/>
                      <strong>Width:</strong> {container.width}<br/>
                      <strong>Height:</strong> {container.height}<br/>
                      <strong>Volume:</strong> {container.volume}<br/>
                      <strong>Depth:</strong> {container.depth} <br/>
                    </div>
                    <div className="selected-container-actions">
                      <img src={favoriteIcon} alt="Favorite"
                           className="favorite-icon"
                           onClick={() => handleFavoriteToggle(container)}
                      />
                      <button className="add-item-button"
                              onClick={() => handleAddContainer(container)}>Select Container
                      </button>
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

export default SelectedContainerList;
