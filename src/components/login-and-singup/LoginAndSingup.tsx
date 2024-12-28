import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import "./LoginAndSingup.scss";
import {app} from "./../../firebase"

import user_icon from "../../assets/photos/person.png"
import email_icon from "../../assets/photos/email.png"
import password_icon from "../../assets/photos/password.png"
import AlertMessage from "../UI/alert-message/AlertMessage.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {setUser} from "../../store/redusers/user/user.store.ts";
import {login} from "../../store/redusers/auth/auth.store.ts";

const LoginAndSingup = () => {

  const auth = getAuth(app);

  const dispatch = useAppDispatch()

  const [action, setAction] = useState("Sign Up")
  const [name, setName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [code, setCode] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "Sign Up") {
        await createUserWithEmailAndPassword(auth, userEmail, password);
        setMessage("Successfully signed up!");
        setCode(200)
        setAction("Login")
        setPassword("")
      } else if(action === "Login"){
        const res = await signInWithEmailAndPassword(auth, userEmail, password);
        setMessage("Successfully logged in!");
        setCode(200)

        console.log(res)

        const user = res.user;
        const uid = user.uid;
        const email = user.email;
        const displayName = user.displayName || "";
        const idToken = await user.getIdToken();

        dispatch(setUser({ uid, email, name: displayName }));
        console.log(uid)

        dispatch(login({role: "user", idToken}))
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        localStorage.setItem('uid', uid);
        localStorage.setItem('idToken', idToken);
      }
    } catch (err) {
      setMessage("Check email or password and try again!");
      setCode(400)
    }
  }

  const changeMethod = () => {
    if (action === "Sign Up") {
      setAction("Login");
    } else {
      setAction("Sign Up");
    }
    setPassword("")
  };
  return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <form className="inputs" onSubmit={(e) => handleSubmit(e)}>
          {action === "Sign Up" ?
              <div className="input">
                <img src={user_icon} alt=""/>
                <input
                    type="text"
                    placeholder="Ім'я"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              : <></>}
          <div className="input">
            <img src={email_icon} alt=""/>
            <input
                type="email"
                value={userEmail}
                placeholder="Email"
                onChange={(e) => setUserEmail(e.target.value)}
            />

          </div>
          <div className="input">
            <img src={password_icon} alt=""/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {action === "Sign Up" ? <></> :
              <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
          <div className="submit-container">
            <button
                className={"submit"}
            >
              {action}
            </button>
          </div>
          <div className="change-method">
            {action === "Sign Up" ?
                <> Have an account? <span onClick={changeMethod}>Login!</span> </>
                :
                <> Don't have an account? <span onClick={changeMethod}>Sign Up!</span> </>
            }

          </div>
        </form>
        {message && (
            <AlertMessage
                code={code}
                message={message}
                setMessage={setMessage}
                duration={3000}
            />
        )}
      </div>
  );
};

export default LoginAndSingup;