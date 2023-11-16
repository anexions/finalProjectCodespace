//Funcion para obtener el token del localstorage
export const getToken = (onError) => {
  const token = localStorage.getItem("token"); //Con getItem obtengo algo del local. Ene ste caso el token.
  if (!token) {
    //Si no hay token...
    if (onError) {
      onError("Token is missing");
    }
    return null;
  }
  return token;
};
