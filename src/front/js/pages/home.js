import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CharacterCard from "../component/CharacterCard";

export const Home = () => {
	const [characters, setCharacters] = React.useState([])

    React.useEffect(() =>{
        fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCharacters(data.results)
        })
        .catch(error => {
			//error handling
			console.log(error);
		});
    },[])

	return (
		<div className="row" style={{padding:'3rem', display:'flex', justifyContent:'center', alignItems:'center'}}>
			
				{characters.map((char, key) => {
					return(
						<div className="col-3">
							<CharacterCard character={char} key={key}/>
						</div>
					)
				})}
			
		</div>
	);
};
