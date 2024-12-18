import React, {useEffect} from 'react';
import LoginAndSingup from "../../components/login-and-singup/LoginAndSingup.tsx";
import "./index.scss";
import {redirect, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

const AuthenticationPage = () => {

  const navigation = useNavigate()
  const {isAuthenticated} = useAuth()

  const redirect = () => {
    navigation("/")
  }

  useEffect(() => {
    if (isAuthenticated){
      setTimeout(redirect, 2000)
    }
  }, [isAuthenticated]);

  return (
      <div className="page-background">
        <div className="authentication-container">
          <LoginAndSingup/>
        </div>
      </div>
  );
};

export default AuthenticationPage;