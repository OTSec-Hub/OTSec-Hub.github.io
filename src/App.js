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
import IntroductionPage from "./pages/IntroductionPage";
import Lab0Page from "./pages/Lab0Page";
import Lab1Page from "./pages/Lab1Page";
import Lab2Page from "./pages/Lab2Page";
import Lab3Page from "./pages/Lab3Page";
import Lab4Page from "./pages/Lab4Page";
import Lab5Page from "./pages/Lab5Page";
import Lab6Page from "./pages/Lab6Page";
import Benchmarks from "./pages/Benchmarks"
import Announcements from "./pages/Announcements";
import Discussions from "./pages/Discussions";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import DatasetDetail from "./components/DatasetDetail";
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
        id: "Lab0",
        homepage: "Lab0",
        description: "",
        image: projectImages['lab0.png'],
        name: "Lab 0: Installing Course Software",
        url: "Lab0",
      },
      {
        id: "Lab1",
        homepage: "Lab1",
        description: "Lab 1 short description",
        image: projectImages['id_card.png'],
        name: "Lab 1: ",
        url: "Lab1",
      },
      {
        id: "Lab2",
        homepage: "Lab2",
        description: "Lab 2 short description",
        image: projectImages['security_1.png'],
        name: "Lab 2",
        url: "Lab2",
      },
      {
        id: "Lab3",
        homepage: "Lab3",
        description: "Lab 3 short description",
        image: projectImages['laptop.png'],
        name: "Lab 3",
        url: "Lab3",
      },
      {
        id: "Lab4",
        homepage: "Lab4",
        description: "Lab 4 short description",
        image: projectImages['lock.png'],
        name: "Lab 4",
        url: "Lab4",
      },
      {
        id: "Lab5",
        homepage: "Lab5",
        description: "Lab 5 short description",
        image: projectImages['lab5.png'],
        name: "Lab 5",
        url: "Lab5",
      },
      {
        id: "Lab6",
        homepage: "Lab6",
        description: "Lab 6 short description",
        image: projectImages['lab6.png'],
        name: "Lab 6",
        url: "Lab6",
      },
    ];

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
          : dispatch(setMainProjects([...projects.slice(0, 3)]));
      } else {
        dispatch(setMainProjects([...projects.slice(0, 3)]));
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
          <Route path="/Resources/All-Labs" element={<AllProjects />} />
          <Route path="/Resources/Benchmarks" element={<Benchmarks />} />
          <Route path="/Benchmarks/:datasetId" element={<DatasetDetail />} />
          <Route path="/IntroductionPage" element={<IntroductionPage />} />
          <Route path="/Announcements" element={<Announcements />} />
          <Route path="/Weekly-Discussions" element={<Discussions />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/All-Labs/Lab0" element={<Lab0Page />} />
          <Route path="/All-Labs/Lab1" element={<Lab1Page />} />
          <Route path="/All-Labs/Lab2" element={<Lab2Page />} />
          <Route path="/All-Labs/Lab3" element={<Lab3Page />} />
          <Route path="/All-Labs/Lab4" element={<Lab4Page />} />
          <Route path="/All-Labs/Lab5" element={<Lab5Page />} />
          <Route path="/All-Labs/Lab6" element={<Lab6Page />} />
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
