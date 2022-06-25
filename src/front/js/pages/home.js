import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CharacterCard from "../component/CharacterCard";
import PlanetsCard from "../component/PlanetsCard";

export const Home = () => {
  //const [characters, setCharacters] = React.useState([])
  const { store, actions } = useContext(Context);

  return (
    <div
      className="row"
      style={{
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>CHARACTERS</h2>
      {store.characters.map((char, idx) => {
        return (
          <div className="col-3" key={idx}>
            <CharacterCard character={char} c_id={idx}/>
          </div>
        );
      })}
      
      <h2>PLANETS</h2>
      {store.planets.map((planet, idx) => {
          return (
            <div className="col-3" key={idx}>
              <PlanetsCard planet={planet} p_id={idx}/>
            </div>
          );
        })}
   
    </div>
  );
};
