import React, {FC} from 'react';
import {useAppDispatch} from "../../hooks/redux.ts";
import {logout} from "../../store/redusers/auth/auth.store.ts";
import {clearUser} from "../../store/redusers/user/user.store.ts";
import penguin from "./../../assets/photos/penguin.png"
import user from "./../../assets/photos/user.png"
import "./Header.scss";
import {
  setContainer3DVisualizerState,
  setReportGeneratorState,
  setSelectedContainerState
} from "../../store/redusers/popup/popup.store.ts";

const Header: FC = () => {

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearUser())
  }

  const handleChangeContainerPopup = ()=> {
    dispatch(setSelectedContainerState(true))
  }

  const handleChangeGenerateReportPopup = ()=> {
    dispatch(setReportGeneratorState(true))
  }

  const handleContainer3DVisualizerPopup = ()=> {
    dispatch(setContainer3DVisualizerState(true))
  }

  return (
      <header className='main-header'>
        <div className="header-container">
          <div className="header-container__left">
            <img className="header-container__image-penguin" src={penguin} alt=""/>
          </div>
          <div className="header-container__center">
            <button onClick={handleChangeContainerPopup}>Вибір контейнеру</button>
            <button onClick={handleChangeGenerateReportPopup}>Генерація звіту</button>
            <button onClick={handleContainer3DVisualizerPopup}>Переглянути контейнер</button>
          </div>
          <div className="header-container__right">
            <button onClick={handleLogout}>Logout</button>
            <img className="header-container__image-user" src={user} alt=""/>
          </div>
        </div>
      </header>
  );
};

export default Header;
