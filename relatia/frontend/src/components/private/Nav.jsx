import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { useTranslation } from "react-i18next"; //Funcion para las traducciones



const Navigation = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  return (
    <Navbar collapseOnSelect expand="lg" className="navbarFixed">
      <NavLink className="navbar-brand">
        <strong>Relatia</strong> | {t("webTitle")}
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <NavItem>
            <NavLink to="/social/feed" className="nav-link">
              {t("navHome")}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/social/writers" className="nav-link">
              {t("navWriters")}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/social/publication" className="nav-link">
              {t("navPublication")}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/social/profile" className="nav-link">
              {t("navProfile")}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/social/contact" className="nav-link">
              {t("navContact")}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/social/logout" className="nav-link">
              {t("navLogout")}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
