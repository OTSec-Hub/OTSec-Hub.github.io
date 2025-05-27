import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Router
import { Link, useLocation } from "react-router-dom";
// Images
import defaultLogo from "../images/defaultNavLogo.svg";
// Components
import { Link as ScrollLink } from "react-scroll";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";

// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "All Projects", route: "/All-Projects" },
    { id: "3R", name: "Introduction", route: "/IntroductionPage" },
    {
      id: "4R",
      name: "Resources",
      dropdown: true,
      children: [
        { id: "2T-1", name: "ICS Labs", route: "/All-Projects" }
      ]
    },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },    
    { id: "2T", name: "Announcements", to: "Accouncements" },
    { id: "3T", name: "Weekly Discussions", to: "Weekly Discussions" },
    { id: "4T", name: "Contact Us", to: "Contact" },
  ],
};
// #endregion

//{ id: "3T", name: "Skills", to: "Skills" },
// { id: "2T", name: "About Me", to: "About" },

// #region styled-components
const StyledDiv = styled.div`
  .navbar {
    border-bottom: var(--border);
  }

  .spacer {
    height: var(--nav-height);
  }

  .logo-img {
    background: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
  }
`;
// #endregion

// #region component
const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <StyledDiv>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={Logo === null ? defaultLogo : Logo}
              width="35"
              height="35"
              className="rounded-circle logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <ScrollLink
                          to={el.to}
                          spy={true}
                          activeClass="active"
                          className="nav-link"
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {el.name}
                        </ScrollLink>
                      </Nav.Item>
                    );
                  })
                : navLinks.routes.map((el) => {
                    if (el.dropdown && Array.isArray(el.children)) {
                      return (
                        <NavDropdown key={el.id} title={el.name} id={`nav-dropdown-${el.id}`}>
                          {el.children.map((child) => (
                            <NavDropdown.Item
                              key={child.id}
                              as={Link}
                              to={child.route}
                              onClick={() => {
                                setTimeout(() => {
                                  setisExpanded(false);
                                }, closeDelay);
                              }}
                            >
                              {child.name}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                      );
                    } else {
                      return (
                        <Nav.Item key={el.id}>
                          <Link
                            to={el.route}
                            className={
                              pathname === el.route
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => {
                              setTimeout(() => {
                                setisExpanded(false);
                              }, closeDelay);
                            }}
                          >
                            {el.name}
                          </Link>
                        </Nav.Item>
                      );
                    }
                  })
              }
            </Nav>
            <Nav>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;
// #endregion

export default NavBar;
