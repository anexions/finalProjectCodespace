import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap"; //Componentes de Bootstrap para la barra de navegación
import { useTranslation } from "react-i18next"; //Funcion para las traducciones


const Navigation = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  //Esto es el menu desplegable de la barra de navegación
  return (
    <Navbar collapseOnSelect expand="lg"  className="navbarFixed">
      <Navbar.Brand href="#home">
        <NavLink to="/login" className="navbar-brand">
          <strong>Relatia</strong> | {t("webTitle")}
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="ml-auto navbarFixed" >
          <Nav.Link as={NavLink} to="/register">
            {t("navRegister")}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            {t("navlogin")}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contact">
            {t("navContact")}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
