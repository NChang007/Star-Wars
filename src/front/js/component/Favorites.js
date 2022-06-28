import React from "react";
import { Link } from "react-router-dom";

function Favorites({ favorite, f_id }) {
   
    
    return (
        <div className="">
            <Link to={"/pages/AboutCharacterPage/" + f_id}>{favorite.name}</Link>
        </div>
    );
  
 
}

export default Favorites;
