import React, { useContext } from "react";
import AboutPlanetsPage from '../pages/AboutPlanetsPage'
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
function PlanetsCard({planet, p_id}) {
    const { store, actions } = useContext(Context);
    // console.log(planet.name)
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem 3rem" }}>
      <img
        className="card-img-top"
        src="https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc4MzAwMjIwNTk2MDM3MjI5/german-shepherd-puppy-bite-inhibition-games.jpg"
        alt="aCrd image cap"
      />
        
      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>
        <ul className="card-text">
          <li>{planet.rotation_period}</li>
          <li>{planet.orbital_period}</li>
          <li>{planet.climate}</li>
        </ul>
      </div>
      <div style={{ margin: "1em" }}>
        <Link to={"/pages/AboutPlanetsPage/" + p_id}>
          <span className="btn btn-primary">Learn More</span>
        </Link>
        <i
          className="far fa-lg fa-heart favBtn" 
          style={{margin:'0rem 0rem 0rem 7rem'}}
          onClick={() => actions.handleFavorites(p_id, 'planet')}
        ></i>
      </div>
    </div>
  );
}

export default PlanetsCard;
