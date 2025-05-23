import React from "react";
// Styles
import { ThemeProvider } from "styled-components";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import {
  setProjects,
  setMainProjects,
  selectProjects,
} from "./app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "./app/apiSlice";
import PropTypes from "prop-types";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
// Components
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "./components/AppFallback";
import GlobalStyles from "./components/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// Config
import { footerTheme, navLogo } from "./config";
// Util
import { getStoredTheme, getPreferredTheme, setTheme } from "./utils";

// #region component
const propTypes = {
  filteredProjects: PropTypes.arrayOf(PropTypes.string),
  projectCardImages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.node.isRequired,
    })
  ),
};

// Helper function to import all images from a folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    // item is like './imageName.png'
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

// Import all images from src/images folder
const projectImages = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const App = ({ projectCardImages = [], filteredProjects = [] }) => {
  const theme = useSelector(selectMode);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();
  let content;

  // Set all projects state
  React.useEffect(() => {
  //const tempData = [];
  //   if (projectsData !== undefined && projectsData.length !== 0) {
  //     projectsData.forEach((element) => {
  //       const tempObj = {
  //         id: null,
  //         homepage: null,
  //         description: null,
  //         image: null,
  //         name: null,
  //         html_url: null,
  //       };
  //       tempObj.id = element.id;
  //       tempObj.homepage = element.homepage;
  //       tempObj.description = element.description;
  //       tempObj.name = element.name;
  //       tempObj.html_url = element.html_url;
  //       tempData.push(tempObj);
  //     });
  //     if (
  //       projectCardImages !== (undefined && null) &&
  //       projectCardImages.length !== 0
  //     ) {
  //       projectCardImages.forEach((element) => {
  //         tempData.forEach((ele) => {
  //           if (element.name.toLowerCase() === ele.name.toLowerCase()) {
  //             ele.image = element.image;
  //           }
  //         });
  //       });
  //     }
  //     dispatch(setProjects(tempData));
  //   }
  // }, [projectsData, projectCardImages, dispatch]);
  //const tempData = [];

    const placeholderProjects = [
      {
        id: "placeholder-1",
        homepage: "#",
        description: "This is a placeholder project description.",
        image: projectImages['id_card.png'],
        name: "Placeholder Project 1",
        html_url: "https://www.google.com/search?q=puppy+images",
      },
      {
        id: "placeholder-2",
        homepage: "#",
        description: "Another placeholder for a future project.",
        image: projectImages['security_1.png'],
        name: "Placeholder Project 2",
        html_url: "https://www.google.com/search?q=cute+baby+alligator+images&tbm=isch",
      },
      {
        id: "placeholder-3",
        homepage: "#",
        description: "Stay tuned for more projects.",
        image: projectImages['laptop.png'],
        name: "Placeholder Project 3",
        html_url: "https://nyuad.nyu.edu/en/",
      },
      {
        id: "placeholder-4",
        homepage: "#",
        description: "Another one.",
        image: projectImages['lock.png'],
        name: "Placeholder Project 4",
        html_url: "#",
      },
    ];

    // if (projectsData !== undefined && projectsData.length !== 0) {
    //   projectsData.forEach((element) => {
    //     const tempObj = {
    //       id: element.id,
    //       homepage: element.homepage,
    //       description: element.description,
    //       image: null,
    //       name: element.name,
    //       html_url: element.html_url,
    //     };
    //     tempData.push(tempObj);
    //   });

    //   if (
    //     projectCardImages !== undefined &&
    //     projectCardImages !== null &&
    //     projectCardImages.length !== 0
    //   ) {
    //     projectCardImages.forEach((element) => {
    //       tempData.forEach((ele) => {
    //         if (element.name.toLowerCase() === ele.name.toLowerCase()) {
    //           ele.image = element.image;
    //         }
    //       });
    //     });
    //   }

    //   dispatch(setProjects(tempData));
    // } else {
      dispatch(setProjects(placeholderProjects));
    //}
  }, [projectsData, projectCardImages, dispatch]);

  // Set main projects state
  React.useEffect(() => {
    if (projects.length !== 0) {
      if (
        filteredProjects !== (undefined && null) &&
        filteredProjects.length !== 0
      ) {
        const tempArray = projects.filter((obj) =>
          filteredProjects.includes(obj.name)
        );
        tempArray.length !== 0
          ? dispatch(setMainProjects([...tempArray]))
          : dispatch(setMainProjects([...projects.slice(0, 4)]));
      } else {
        dispatch(setMainProjects([...projects.slice(0, 4)]));
      }
    }
  }, [projects, filteredProjects, dispatch]);

  // Theme
  const setThemes = React.useCallback(
    (theme) => {
      if (theme) {
        dispatch(setMode(theme));
        setTheme(theme);
      } else {
        dispatch(setMode(getPreferredTheme()));
        setTheme(getPreferredTheme());
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    setThemes();
  }, [setThemes]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setThemes();
      }
    });

  if (isLoading) {
    content = (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Element name={"Home"} id="home">
          <NavBar Logo={navLogo} callBack={(theme) => setThemes(theme)} />
        </Element>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/All-Projects" element={<AllProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer mode={footerTheme} />
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <h2>
          {error.status !== "FETCH_ERROR"
            ? `${error.status}: ${error.data.message} - check githubUsername in src/config.js`
            : `${error.status} - check URLs in  src/app/apiSlice.js`}
        </h2>
      </Container>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      {/* https://reactrouter.com/6.28.0/upgrading/future#v7_starttransition */}
      {/* https://reactrouter.com/6.28.0/upgrading/future#v7_relativesplatpath */}
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <ThemeProvider theme={{ name: theme }}>
          <ScrollToTop />
          <GlobalStyles />
          {content}
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

App.propTypes = propTypes;
// #endregion

export default App;
