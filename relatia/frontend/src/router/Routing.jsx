import React, { useContext } from "react"; // Importamos useContext para poder usar el contexto de autenticación
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../context/authProvider";
import PublicLayout from "../components/public/PublicLayout";
import Login from "../pages/public/login/Login";
import Register from "../pages/public/register/Register";
import PublicContact from "../pages/public/publicContact/PublicContact";
import PrivateLayout from "../components/private/PrivateLayout";
import Feed from "../pages/private/feed/Feed";
import Profile from "../pages/private/profile/Profile";
import Publication from "../pages/private/publications/Publication";
import Error404 from "../pages/public/error404/Error404";
import Logout from "../pages/public/logout/Logout";
import Writers from "../pages/private/writers/Writers";

const Routing = () => {
  const { auth } = useContext(AuthContext); //Con el useContext podemos acceder al contexto de autenticación

  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Envolvemos la app con el authProvider que nos da los datos del usuario registrado. */}{" "}
        <Routes>
          {/* Si el usuario está autenticado, &&(existe) redirige al feed */}
          {auth.id && <Navigate to="/social/feed" replace />}

          {/* Rutas públicas envueltas en el publicLayout*/}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<PublicContact />} />
          </Route>

          {/* Rutas privadas envueltas en el privateLayout */}
          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="writers" element={<Writers />} />
            <Route path="publication" element={<Publication />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* Error 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
