import { Outlet } from "react-router-dom"; 
import Header from "./Header";
import Footer from "../footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <section className="layout-container">
        <Outlet />
      </section>

      <Footer />
    </>
  );
};

export default PublicLayout;
//Header renderiza el componente Header
//Outlet renderiza el componente que se le indique en el router (feed, login, register etc...)
//Footer renderiza el componente Footer