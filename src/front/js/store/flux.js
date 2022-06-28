const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      characters: [],
      planets: [],
      favorites: [],
    },
    actions: {
      // characters------------------------------------------------------------------------------
      loadChars: () => {
        let fav = "false";
        //get the store
        const store = getStore();
        //fetch
        fetch("https://swapi.dev/api/people/")
          .then((response) => response.json())
          .then((data) => {
            for (let i = 0; i < data.results.length; i++) {
              data.results[i].fav = false;
              data.results[i].type = 'char'
            }
            // store.planets = data.results;
            // setStore(store);
            setStore({ characters: data.results });
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      getCharacter: (idx) => {
        const chars = getStore().characters;
        return chars[idx];
      },

      // planets---------------------------------------------------------------------------------------
      loadPlanets: () => {
        let fav = "false";
        const store = getStore();

        fetch("https://swapi.dev/api/planets/")
          .then((response) => response.json())
          .then((data) => {
            for (let i = 0; i < data.results.length; i++) {
              data.results[i].fav = false;
              data.results[i].type = 'planet'
            }
            console.log(data);
            setStore({ planets: data.results });
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      getPlanets: (idx) => {
        const planets = getStore().planets;
        return planets[idx];
      },

      // favorites-----------------------------------------------------------------------------------
      handleFavorites: (idx, type) => {
        let store = getStore();
        if(type == 'char'){
          store.characters[idx].fav = !store.characters[idx].fav; 
        }else {
          store.planets[idx].fav = !store.planets[idx].fav;
        }
        
        
        setStore({ characters: store.characters, planets: store.planets});
        console.log(store.characters);
      },




      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
