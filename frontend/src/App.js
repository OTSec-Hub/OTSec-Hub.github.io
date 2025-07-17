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
import Lab0Page from "./pages/Lab0Page";
import Lab1Page from "./pages/Lab1Page";
import Lab2Page from "./pages/Lab2Page";
import Lab3Page from "./pages/Lab3Page";
import Lab4Page from "./pages/Lab4Page";
import Lab5Page from "./pages/Lab5Page";
import Lab6Page from "./pages/Lab6Page";
import Exercise001 from "./pages/Exercise-001"
import Exercise002 from './pages/Exercise-002'
import Exercise003 from './pages/Exercise-003'
import Benchmarks from "./pages/Benchmarks"
import Exercises from "./pages/Exercises"
import Announcements from "./pages/Announcements";
import Discussions from "./pages/Discussions";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import DatasetDetail from "./components/DatasetDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Videos from "./pages/Videos";
import VideoDetailPage from "./pages/VideoDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UsersManagment from "./pages/Admin/UsersManagment";
import TrackProgress from "./pages/Admin/TrackProgress";
import LabsManagement from "./pages/Admin/LabsManagement"
import VerificationPage from "./pages/VerificationPage";
import VideoSubmissionPage from "./pages/StudentVideoSubmission";
import ExerciseSubmission from "./pages/ExerciseSubmission";
import VideosManagment from "./pages/Admin/VideosManagement";
import LabSubmission from "./pages/LabSubmission";
import BenchmarkSubmission from "./pages/BenchmarkSubmission";
import CommunityLabs from "./pages/CommunityLabs";
import CommunityExercises from "./pages/CommunityExercises";
import CommunityVideos from "./pages/CommunityVideos";
import CommunityBenchmarks from "./pages/CommunityBenchmarks";

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

    const placeholderProjects = [
      {
        id: "Lab0",
        homepage: "Lab0",
        description: "Installing Course Software",
        image: projectImages['lab0.png'],
        name: "Lab 0",
        url: "Lab0",
      },
      {
        id: "Lab1",
        homepage: "Lab1",
        description: "Industrial process simulation and process-aware attacks",
        image: projectImages['id_card.png'],
        name: "Lab 1 ",
        url: "Lab1",
      },
      {
        id: "Lab2",
        homepage: "Lab2",
        description: "Programmable Logic Controller programming",
        image: projectImages['security_1.png'],
        name: "Lab 2",
        url: "Lab2",
      },
      {
        id: "Lab3",
        homepage: "Lab3",
        description: "Human Machine Interface (HMI) development and interfacing",
        image: projectImages['laptop.png'],
        name: "Lab 3",
        url: "Lab3",
      },
      {
        id: "Lab4",
        homepage: "Lab4",
        description: "Industrial Protocols Programming and Interfacing",
        image: projectImages['lock.png'],
        name: "Lab 4",
        url: "Lab4",
      },
      {
        id: "Lab5",
        homepage: "Lab5",
        description: "Operational Technology networks analysis",
        image: projectImages['lab5.png'],
        name: "Lab 5",
        url: "Lab5",
      },
      {
        id: "Lab6",
        homepage: "Lab6",
        description: "PLC Binary Reverse Engineering",
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
          <Route path="/Resources/Exercises" element={<Exercises />} />
          <Route path="/Resources/Videos" element={<Videos />} />
          <Route path="/Resources/Videos/:videoId" element={<VideoDetailPage />} />
          <Route path="/Benchmarks/:datasetId" element={<DatasetDetail />} />
          <Route path="/Exercises/Exercise-001" element={<Exercise001 />} />
          <Route path="/Exercises/Exercise-002" element={<Exercise002 />} />
          <Route path="/Exercises/Exercise-003" element={<Exercise003 />} />
          <Route path="/Resources/Videos/Video-Submission" element={<VideoSubmissionPage />} />
          <Route path="/Resources/Exercises/Exercise-Submission" element={<ExerciseSubmission />} />
          <Route path="/Resources/All-Labs/Lab-Submission" element={<LabSubmission />} />
          <Route path="/Resources/Benchmarks/Benchmark-Submission" element={<BenchmarkSubmission />} />
          <Route path="/Announcements" element={<Announcements />} />
          <Route path="/Weekly-Discussions" element={<Discussions />} />
          <Route path="/Community/Community-Labs" element={<CommunityLabs />} />
          <Route path="/Community/Community-Exercises" element={<CommunityExercises />} />
          <Route path="/Community/Community-Videos" element={<CommunityVideos />} />
          <Route path="/Community/Community-Benchmarks" element={<CommunityBenchmarks />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UsersManagment" element={<UsersManagment />} />
          <Route path="/TrackProgress" element={<TrackProgress />} />
          <Route path="/VideosManagement" element={<VideosManagment />} />
          <Route path="/LabsManagement" element={<LabsManagement />} />
          <Route path="/verify-email" element={<VerificationPage />} />
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
