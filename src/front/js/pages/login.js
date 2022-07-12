import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CharacterCard from "../component/CharacterCard";
import PlanetsCard from "../component/PlanetsCard";
import { useHistory } from "react-router";

export const Login = () => {
  //const [characters, setCharacters] = React.useState([])
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = sessionStorage.getItem("token");
    const history =useHistory();

    const handleClick = () => {
        actions.login(email, password).then(() =>{
            history.push("/")
        })
    }

  return (
    <div className="text-center mt-5">
        <h1>Login</h1>
         
        {(token && token!="" && token!=undefined) ? 'You are logged in with this token' + token : 
            <div>
                <input type={"text"} placeholder={'email'} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type={'password'} placeholder={'password'} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
        }
    </div>
  );
};
