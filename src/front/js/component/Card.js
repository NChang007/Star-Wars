import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = (props) => {
    const {store, actions} = useContext(Context)
    let typeURL = props.character ? "/components/character/" : "/components/planet/"
    let name = props.character ? props.character.name : props.planet.name

    // make people data as a variable
    let characterProps = props.character ? <div>
        <h5 className="card-title">{props.character.name}</h5> 
        <h6>Gender: {props.character.gender}</h6> 
        <h6>Hair color: {props.character.hair_color}</h6> 
        <h6>Eye color: {props.character.eye_color}</h6>
    </div> : ""
    let planetProps = props.planet ? <div>
         <h5 className="card-title">{props.planet.name}</h5>
		<h6>Diameter: {props.planet.diameter}</h6>
		<h6>Population: {props.planet.population}</h6>
        <h6>Terrain: {props.planet.terrain}</h6>
    </div> : ""


    return (
        <div className="card" style={{"width": "18rem"}}>
            <img src="https://st2.depositphotos.com/3031831/5365/i/450/depositphotos_53655241-stock-photo-black-space-with-many-stars.jpg" className="card-img-top" alt="..." />
            <div className="card-body">

                {props.character ? characterProps : "" }
                {props.planet ? planetProps: "" }

                <Link to={typeURL + props.id}>
                    <span className="btn btn-primary">Learn More</span>
                </Link>

                <button 
                    className="btn btn-primary" 
                    onClick={()=>actions.addFavorite(name)}
                >
                    <i className="fas fa-heart" />
                </button>
            </div>
        </div>
    )
}

export default Card