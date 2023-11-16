import { globalConfiguration } from "../helpers/globalConfiguration";


//FUNCTION TO GET THE LIST OF WRITERS IN WRITERS.JSX----------------------------
export const ApiFetchWriters = async (token) => {
  // Obtener la lista completa de escritores
  const response = await fetch(`${globalConfiguration.url}user/writers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la petición de escritores");
  }
  return response.json();
};

//FUNCTION TO GET THE LIST OF FOLLOW IN WRITERS.JSX----------------------------
export const ApiFetchFollowedWriters = async (token) => {
  // Obtener la lista completa de escritores
  const response = await fetch(`${globalConfiguration.url}follow/following/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la petición de escritores seguidos");
  }
  return response.json();
};

//FUNCTION TO SAVE A FOLLOW IN WRITERS.JSX--------------------------------------
export const ApiFollowWriter = async (writerId, token) => {
  const response = await fetch(`${globalConfiguration.url}follow/save/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ followed: writerId }),
  });

  if (!response.ok) {
    throw new Error("Error en la petición de seguir escritor");
  }

  return response.json();
};

//FUNCTION TO UNFOLLOW A WRITER IN WRITERS.JSX----------------------------------
export const ApiUnfollowWriter = async (writerId, token) => {
  const response = await fetch(
    `${globalConfiguration.url}follow/unfollow/${writerId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error en la petición de dejar de seguir escritor");
  }
  return response.json();
};

//FUNCION PARA REGISTRAR AL USUARIO EN REGISTER.JSX-----------------------------
export const ApiRegisterUser = async (userInfo) => {
  //userInfo es el formulario que le pasamos desde Register.jsx, será un objeto con los datos del usuario.
  const response = await fetch(`${globalConfiguration.url}user/register`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error en la petición de registro");
  }
  return response.json(); // Esto devolverá la promesa con los datos de la respuesta y lo guardará en la variable data de Register.jsx
};

