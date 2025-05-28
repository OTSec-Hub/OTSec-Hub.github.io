// import React from "react";
// import styled from "styled-components";
// // State
// import { useSelector } from "react-redux";
// import { selectMode } from "../app/appSlice";
// import PropTypes from "prop-types";
// // Router
// import { Link, useLocation } from "react-router-dom";
// // Images
// import defaultLogo from "../images/defaultNavLogo.svg";
// // Components
// import { Link as ScrollLink } from "react-scroll";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import ThemeToggle from "./ThemeToggle";

// // #region constants
// const navLinks = {
//   routes: [
//     { id: "1R", name: "Home", route: "/" },
//     // { id: "2R", name: "All Projects", route: "/All-Projects" },
//     { id: "2R", name: "Introduction", route: "/IntroductionPage" },
//     {
//       id: "3R",
//       name: "Resources",
//       dropdown: true,
//       children: [
//         { id: "3R-1", name: "ICS Labs", route: "/All-Projects" }
//       ]
//     },
//     { id: "4R", name: "Announcements", route: "/Announce"},
//     { id: "5R", name: "Weekly Discussions", route: "/Discussions"},
//     { id: "6R", name: "Contact Us", route: "/ContactPage"},
//   ],
//   to: [
//     { id: "1T", name: "Home", to: "Home" }, 
//     { id: "2T", name: "Introduction", to: "Introduction" },  
//     { id: "3T", name: "Resources", to: "Resources" }, 
//     { id: "4T", name: "Announcements", to: "Accouncements" },
//     { id: "5T", name: "Weekly Discussions", to: "Weekly Discussions" },
//     { id: "6T", name: "Contact Us", to: "Contact" },
//   ],
// };
// // #endregion

// //{ id: "3T", name: "Skills", to: "Skills" },
// // { id: "2T", name: "About Me", to: "About" },

// // #region styled-components
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
// `;
// // #endregion

// // #region component
// const propTypes = {
//   Logo: PropTypes.node,
//   callBack: PropTypes.func,
//   closeDelay: PropTypes.number,
// };

// const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
//   const theme = useSelector(selectMode);
//   const [isExpanded, setisExpanded] = React.useState(false);
//   const { pathname } = useLocation();

//   return (
//     <StyledDiv>
//       <div className="spacer" />
//       <Navbar
//         id="nav"
//         collapseOnSelect={true}
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
//               src={Logo === null ? defaultLogo : Logo}
//               width="35"
//               height="35"
//               className="rounded-circle logo-img"
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             onClick={() => setisExpanded(!isExpanded)}
//           />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav navbarScroll className="me-auto">
//               {pathname === "/"
//                 ? navLinks.to.map((el) => {
//                     return (
//                       <Nav.Item key={el.id}>
//                         <ScrollLink
//                           to={el.to}
//                           spy={true}
//                           activeClass="active"
//                           className="nav-link"
//                           onClick={() => {
//                             setTimeout(() => {
//                               setisExpanded(false);
//                             }, closeDelay);
//                           }}
//                         >
//                           {el.name}
//                         </ScrollLink>
//                       </Nav.Item>
//                     );
//                   })
//                 : navLinks.routes.map((el) => {
//                     if (el.dropdown && Array.isArray(el.children)) {
//                       return (
//                         <NavDropdown key={el.id} title={el.name} id={`nav-dropdown-${el.id}`}>
//                           {el.children.map((child) => (
//                             <NavDropdown.Item
//                               key={child.id}
//                               as={Link}
//                               to={child.route}
//                               onClick={() => {
//                                 setTimeout(() => {
//                                   setisExpanded(false);
//                                 }, closeDelay);
//                               }}
//                             >
//                               {child.name}
//                             </NavDropdown.Item>
//                           ))}
//                         </NavDropdown>
//                       );
//                     } else {
//                       return (
//                         <Nav.Item key={el.id}>
//                           <Link
//                             to={el.route}
//                             className={
//                               pathname === el.route
//                                 ? "nav-link active"
//                                 : "nav-link"
//                             }
//                             onClick={() => {
//                               setTimeout(() => {
//                                 setisExpanded(false);
//                               }, closeDelay);
//                             }}
//                           >
//                             {el.name}
//                           </Link>
//                         </Nav.Item>
//                       );
//                     }
//                   })
//               }
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
// // #endregion

// export default NavBar;


// import React from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { selectMode } from "../app/appSlice";
// import PropTypes from "prop-types";
// import { Link, useLocation } from "react-router-dom";
// import defaultLogo from "../images/defaultNavLogo.svg";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import ThemeToggle from "./ThemeToggle";

// // #region constants
// const navLinks = {
//   routes: [
//     { id: "1R", name: "Home", route: "/" },
//     { id: "2R", name: "Introduction", route: "/IntroductionPage" },
//     {
//       id: "3R",
//       name: "Resources",
//       dropdown: true,
//       children: [{ id: "3R-1", name: "ICS Labs", route: "/All-Projects" }]
//     },
//     { id: "4R", name: "Announcements", route: "/Announce" },
//     { id: "5R", name: "Weekly Discussions", route: "/Discussions" },
//     { id: "6R", name: "Contact Us", route: "/ContactPage" }
//   ]
// };
// // #endregion

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
//   .dropdown-item.active {
//     color: #28a745 !important; /* Bootstrap green */
//     border-bottom: 2px solid #28a745;
//     font-weight: 500;
//   }
// `;

// // #endregion

// // #region component
// const propTypes = {
//   Logo: PropTypes.node,
//   callBack: PropTypes.func,
//   closeDelay: PropTypes.number
// };

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
//             />
//           </Navbar.Brand>
//           <Navbar.Toggle
//             aria-controls="responsive-navbar-nav"
//             onClick={() => setisExpanded(!isExpanded)}
//           />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav navbarScroll className="me-auto">
//               {navLinks.routes.map((el) =>
//                 el.dropdown && Array.isArray(el.children) ? (
//                   <NavDropdown key={el.id} title={el.name} id={`nav-dropdown-${el.id}`}>
//                     {el.children.map((child) => (
//                       <NavDropdown.Item
//                         key={child.id}
//                         as={Link}
//                         to={child.route}
//                         //className={pathname === child.route ? "active" : ""}
//                         onClick={() => setTimeout(() => setisExpanded(false), closeDelay)}
//                       >
//                         {child.name}
//                       </NavDropdown.Item>
//                     ))}
//                   </NavDropdown>
//                 ) : (
//                   <Nav.Item key={el.id}>
//                     <Link
//                       to={el.route}
//                       className={`nav-link ${pathname === el.route ? "active" : ""}`}
//                       onClick={() => setTimeout(() => setisExpanded(false), closeDelay)}
//                     >
//                       {el.name}
//                     </Link>
//                   </Nav.Item>
//                 )
//               )}
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
// // #endregion

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

// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "Introduction", route: "/IntroductionPage" },
    {
      id: "3R",
      name: "Resources",
      dropdown: true,
      children: [{ id: "3R-1", name: "ICS Labs", route: "/All-Projects" }]
    },
    { id: "4R", name: "Announcements", route: "/Announce" },
    { id: "5R", name: "Weekly Discussions", route: "/Discussions" },
    { id: "6R", name: "Contact Us", route: "/ContactPage" }
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
                      className={`nav-link ${
                        pathname === el.route ? "active" : ""
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

export default NavBar;

