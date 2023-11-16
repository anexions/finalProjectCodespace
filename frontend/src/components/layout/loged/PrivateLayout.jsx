import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "../Permanent/Footer";

const PrivateLayout = () => {
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

export default PrivateLayout;
