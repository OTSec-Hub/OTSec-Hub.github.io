

// //import react and necessary hooks
// import React from "react";

// //import styled components for custom styling
// import styled from "styled-components";

// //import to acccess global state
// import { useSelector } from "react-redux";
// import { selectMode } from "../app/appSlice";

// //prop validation
// import PropTypes from "prop-types";

// //for navigation
// import { Link, useLocation } from "react-router-dom";

// //import the logo
// import defaultLogo from "../images/defaultNavLogo.svg";

// //import Bootstrap components for building the responsive navigation bar
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// //to change the light/dark theme of the site
// import ThemeToggle from "./ThemeToggle";

// import LoginLink from "./LoginLink";

// // #region constants
// // list the navigation links to show in the navbar
// const navLinks = {
//   routes: [
//     { id: "1R", name: "Home", route: "/" },
//     { id: "2R", name: "Introduction", route: "/IntroductionPage" },
//     {
//       id: "3R",
//       name: "Resources",
//       dropdown: true,
//       children: [{ id: "3R-1", name: "ICS Labs", route: "/Resources/All-Labs" },
//         {id: "3R-2", name: "Benchmarks", route: "/Resources/Benchmarks"},
//         {id: "3R-3", name: "Exercises", route: "/Resources/Exercises"}]
//     },
//     { id: "4R", name: "Announcements", route: "/Announcements" },
//     { id: "5R", name: "Weekly Discussions", route: "/Weekly-Discussions" },
//     { id: "6R", name: "Contact Us", route: "/ContactPage" }
//   ]
// };
// // #endregion

// //custom styled wrapper for the navbar
// const StyledDiv = styled.div`
//   .navbar {
//     border-bottom: var(--border);
//   }

//   .spacer {
//     height: var(--nav-height);
//   }

//   .logo-img {
//     background: ${({ theme }) =>
//       theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
//   }

//   .nav-link.active,
//   .navbar .dropdown.active > .nav-link {
//     color: #28a745 !important;
//     border-bottom: 2px solid #28a745;
//     font-weight: 500;
//   }
// `;

// //define expected props and their types
// const propTypes = {
//   Logo: PropTypes.node,
//   callBack: PropTypes.func,
//   closeDelay: PropTypes.number
// };

// //main navigation bar component
// const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
//   const theme = useSelector(selectMode);
//   const [isExpanded, setisExpanded] = React.useState(false);
//   const { pathname } = useLocation();

//   return (
//     <StyledDiv>
//       <div className="spacer" />
//       <Navbar
//         id="nav"
//         collapseOnSelect
//         expand="xl"
//         expanded={isExpanded}
//         bg={theme === "light" ? "light" : "dark"}
//         variant={theme === "light" ? "light" : "dark"}
//         fixed="top"
//       >
//         <Container>
//           <Navbar.Brand>
//             <img
//               alt="Logo"
//               src={Logo ?? defaultLogo}
//               width="35"
//               height="35"
//               className="rounded-circle logo-img"
//               style={{ backgroundColor: "black" }}
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             onClick={() => setisExpanded(!isExpanded)}
//           />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav navbarScroll className="me-auto">
//               {navLinks.routes.map((el) => {
//                 const isDropdownActive =
//                   el.dropdown &&
//                   Array.isArray(el.children) &&
//                   el.children.some((child) => child.route === pathname);

//                 return el.dropdown && Array.isArray(el.children) ? (
//                   <NavDropdown
//                     key={el.id}
//                     title={el.name}
//                     id={`nav-dropdown-${el.id}`}
//                     className={isDropdownActive ? "active" : ""}
//                   >
//                     {el.children.map((child) => (
//                       <NavDropdown.Item
//                         key={child.id}
//                         as={Link}
//                         to={child.route}
//                         onClick={() =>
//                           setTimeout(() => setisExpanded(false), closeDelay)
//                         }
//                       >
//                         {child.name}
//                       </NavDropdown.Item>
//                     ))}
//                   </NavDropdown>
//                 ) : (
//                   <Nav.Item key={el.id}>
//                     <Link
//                       to={el.route}
//                       className={`nav-link ${
//                         pathname === el.route ? "active" : ""
//                       }`}
//                       onClick={() =>
//                         setTimeout(() => setisExpanded(false), closeDelay)
//                       }
//                     >
//                       {el.name}
//                     </Link>
//                   </Nav.Item>
//                 );
//               })}
//             </Nav>
//             <Nav>
//               <ThemeToggle
//                 closeDelay={closeDelay}
//                 setExpanded={setisExpanded}
//                 setTheme={callBack}
//               />
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </StyledDiv>
//   );
// };

// NavBar.propTypes = propTypes;

// export default NavBar;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import defaultLogo from "../images/defaultNavLogo.svg";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import LoginLink from "./LoginLink";


// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    {
      id: "2R",
      name: "Resources",
      dropdown: true,
      children: [{ id: "2R-1", name: "ICS Labs", route: "/Resources/All-Labs" },
      { id: "2R-2", name: "Benchmarks", route: "/Resources/Benchmarks" },
      { id: "2R-3", name: "Exercises", route: "/Resources/Exercises" }]
    },
    { id: "3R", name: "Announcements", route: "/Announcements" },
    { id: "4R", name: "Discussion Forums", route: "/Discussion-Forums" },
    { id: "5R", name: "Contact Us", route: "/ContactPage" }
  ]
};
// #endregion

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

  .nav-link.active,
  .navbar .dropdown.active > .nav-link {
    color: #28a745 !important;
    border-bottom: 2px solid #28a745;
    font-weight: 500;
  }
`;

const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number
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
        collapseOnSelect
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
              src={Logo ?? defaultLogo}
              width="35"
              height="35"
              className="rounded-circle logo-img"
              style={{ backgroundColor: "black" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {navLinks.routes.map((el) => {
                const isDropdownActive =
                  el.dropdown &&
                  Array.isArray(el.children) &&
                  el.children.some((child) => child.route === pathname);

                return el.dropdown && Array.isArray(el.children) ? (
                  <NavDropdown
                    key={el.id}
                    title={el.name}
                    id={`nav-dropdown-${el.id}`}
                    className={isDropdownActive ? "active" : ""}
                  >
                    {el.children.map((child) => (
                      <NavDropdown.Item
                        key={child.id}
                        as={Link}
                        to={child.route}
                        onClick={() =>
                          setTimeout(() => setisExpanded(false), closeDelay)
                        }
                      >
                        {child.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Item key={el.id}>
                    <Link
                      to={el.route}
                      className={`nav-link ${pathname === el.route ? "active" : ""
                        }`}
                      onClick={() =>
                        setTimeout(() => setisExpanded(false), closeDelay)
                      }
                    >
                      {el.name}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
            <Nav className="d-flex flex-row ms-auto align-items-center gap-3">
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
              <LoginLink
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;

export default NavBar;

