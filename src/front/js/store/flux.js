const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
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
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      // login---------------------------------------------------------------------------------------------------
      login: async (email, password) => {
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Headers": "Origin",
            //"X-Requested-With, Content-Type": "Accept",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-nchang007-starwars-ldjj5e0z2ep.ws-us63.gitpod.io/api/login",
            opts
          );
          if (resp.status !== 200) {
            alert("there has been an error");
            return false;
          }
          const data = await resp.json();
          console.log(data);
          if (data.msg) {
            setStore({ message: data.msg });
          } else {
            sessionStorage.setItem("token", data.access_token);
            setStore({ token: data.access_token, favorites: data.favorites });
          }

          return true;
        } catch (error) {
          console.error("there was an error", error);
        }
      },
      // characters------------------------------------------------------------------------------
      loadChars: () => {
        // let fav = "false";
        //get the store
        const store = getStore();
        // const opts = {
        //   headers: {
        //     "Authorization":"Bearer "+ store.token
        //   }
        // }
        //fetch
        fetch(
          "https://3001-nchang007-starwars-ldjj5e0z2ep.ws-us63.gitpod.io/api/characters"
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            for (let i = 0; i < data.data.length; i++) {
              // data.data[i].fav = false;
              data.data[i].type = "char";
            }
            // store.planets = data.results;
            // setStore(store);
            setStore({ characters: data.data });
          })
          .catch((error) => {
            //error handling
            console.log(error);
          });
      },

      loadFavorites: () => {
        const store = getStore();
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          };
          fetch(
            "https://3001-nchang007-starwars-ldjj5e0z2ep.ws-us63.gitpod.io/api/favorites",
            opts
          )
            .then((response) => response.json())
            .then((data) => {
              setStore({ favorites: data.favorites });
            })
            .catch((error) => {
              //error handling
              console.log(error);
            });
        }
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
              data.results[i].type = "planet";
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
      handleFavorites: (idx, type, name) => {
        let store = getStore();

        // if favorite exists - delete
        if (store.favorites.filter((f) => f.fave_id == idx).length > 0) {
          const opts = {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + store.token,
            },
          };
          let f = store.favorites.filter((f) => f.fave_id == idx);
          fetch(
            "https://3001-nchang007-starwars-ldjj5e0z2ep.ws-us63.gitpod.io/api/deletefav/" +
              f[0].id,
            opts
          )
            .then((response) => response.json())
            .then((data) => {
              setStore({ favorites: data.favorites });
            })
            .catch((error) => {
              //error handling
              console.log(error);
            });
        } else {
          const opts = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + store.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fave_id: idx,
              item_type: type,
              name: name,
            }),
          };
          //add the new one
          fetch(
            "https://3001-nchang007-starwars-ldjj5e0z2ep.ws-us63.gitpod.io/api/addfavorites",
            opts
          )
            .then((response) => response.json())
            .then((data) => {
              setStore({ favorites: data.favorites });
            })
            .catch((error) => {
              //error handling
              console.log(error);
            });
        }
        // filter favorites to remove the id one

        // if (type == "char") {
        //   store.characters[idx].fav = !store.characters[idx].fav;
        // } else {
        //   store.planets[idx].fav = !store.planets[idx].fav;
        // }

        //setStore({ favorites: favorites });
        //console.log(store.characters);
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      // getMessage: async () => {
      //   const store = getStore()
      //   const opts = {
      //     headers: {
      //       "Authorization":"Bearer "+ store.token
      //     }
      //   }
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
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
