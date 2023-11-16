//Funcion para obtener el token y el user del localstorage
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    //Si hay token y user...
    return { token, user }; //Devuelvo el token y el user para poder usarlos en otros componentes
  }

  return null;
};
