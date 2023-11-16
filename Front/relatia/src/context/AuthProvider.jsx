//this is an useContext to share information between components
//We will envolve the entire application with this context to can use it in all the components
//We will use it on routing.jsx

import React, { createContext, useState, useEffect } from "react";
import { globalConfiguration } from "../helpers/globalConfiguration";

const AuthContext = createContext({ auth: {} });

const AuthProvider = ({ children }) => {
  //const [shared, setShared] = useState("Shared in all places");  //<--We will share it in all the app (THIS IS A TEST)

  const [auth, setAuth] = useState({});

  useEffect(() => {
    authUser();
  }, []);

  //Auntenticar usuario

  const authUser = async () => {
    //Obtener el token de localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    //Si no hay token or user, no autenticar

    if (!token || !user) {
      return false;
    }

    //Transofrmar el token a un objeto
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    //peticion ajax para obtener la informacion del usuario

    //devolver datos del usuario
    const request = await fetch(
      globalConfiguration.url + "user/profile/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await request.json(); //take datas from the request

    //setear el usuario de auth
    setAuth(data.user);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
