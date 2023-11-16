import React, { useContext } from "react"; // Importamos useContext para poder usar el contexto de autenticación
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../context/authProvider";
import PublicLayout from "../components/layout/unloged/PublicLayout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import Contact from "../components/layout/loged/Contact";
import PublicContact from "../components/layout/unloged/PublicContact";
import PrivateLayout from "../components/layout/loged/PrivateLayout";
import Feed from "../components/layout/loged/Feed";
import Profile from "../components/layout/loged/Profile";
import Publication from "../components/layout/loged/Publication";
import Error404 from "../components/layout/permanent/Error404";
import Logout from "../components/user/Logout";
import Writers from "../components/layout/loged/Writers";

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
            <Route path="contact" element={<Contact />} />
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
