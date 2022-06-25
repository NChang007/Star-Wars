import React from 'react'
import AboutCharacterPage from '../pages/AboutCharacterPage'
import { Link } from "react-router-dom";

function CharacterCard({character, c_id}) {
  return (
    <div className="card" style={{width: "18rem", margin: '1rem 3rem'}}>
        <img className="card-img-top" src="https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc4MzAwMjIwNTk2MDM3MjI5/german-shepherd-puppy-bite-inhibition-games.jpg" alt="aCrd image cap"/>

        <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <ul className='card-text'>
                <li>{character.gender}</li>
                <li>{character.hair_color}</li>
                <li>{character.height}</li>
            </ul>
        </div>
        <div style={{margin:'1em'}}>
          <Link to={"/pages/AboutCharacterPage/" + c_id}>
            <span className="btn btn-primary">Learn More</span>
					</Link>
          <i className="far fa-lg fa-heart" style={{margin:'0rem 0rem 0rem 5rem',}}></i>
        </div>
        
    </div>
 
  )
}

export default CharacterCard