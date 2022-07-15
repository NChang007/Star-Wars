import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import CharacterCard from "./CharacterCard";
import Favorites from "./Favorites";
import PlanetsCard from "./PlanetsCard";

export const Navbar = ({ character, c_id, planets, p_id }) => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="dropdown show">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Favorites
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            
            {store.characters.map((char, idx) => {
              return (char.fav &&
                <div className="col-3 dropdown-item" key={idx}>
                  <Favorites favorite={char} f_id={idx} />
                </div>
              );
            })}
            
            {store.planets.map((planet, idx) => {
              return (planet.fav &&
                <div className="col-3 dropdown-item" key={idx}>
                  <Favorites favorite={planet} f_id={idx} />
                </div>
              );
            })}
            
          </div>
        </div>
        <div className="ml-auto">
          { !store.token ?
            <Link to="/login">
              <button className="btn btn-primary">
                Log In
              </button>
            </Link> 
            :
            <button onClick={() => actions.logout()} className="btn btn-primary">
                Log Out
              </button>
            
          }
        </div>
      </div>
    </nav>
  );
};
