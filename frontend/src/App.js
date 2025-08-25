import React from "react";
import styled from "styled-components";
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
import { Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import Lab0Page from "./pages/Lab0Page";
import Lab1Page from "./pages/Lab1Page";
import Lab2Page from "./pages/Lab2Page";
import Lab3Page from "./pages/Lab3Page";
import Lab4Page from "./pages/Lab4Page";
import Lab5Page from "./pages/Lab5Page";
import Lab6Page from "./pages/Lab6Page";
import Exercise001 from "./pages/Exercise-001";
import Exercise002 from "./pages/Exercise-002";
import Exercise003 from "./pages/Exercise-003";
import Benchmarks from "./pages/Benchmarks";
import Exercises from "./pages/Exercises";
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
import LabsManagement from "./pages/Admin/LabsManagement";
import VerificationPage from "./pages/VerificationPage";
import ExerciseSubmission from "./pages/ExerciseSubmission";
import VideosManagment from "./pages/Admin/VideosManagement";
import LabSubmission from "./pages/LabSubmission";
import BenchmarkSubmission from "./pages/BenchmarkSubmission";
import CommunityExercises from "./pages/CommunityExercises";
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
// Auth
import { ProtectedRoute, AdminRoute } from './app/ProtectedRoutes';
import LabPage from "./pages/LabPage";
import ExcercisesManagement from "./pages/Admin/ExercisesManagement";
import AllLabs from "./pages/AllLabs";
import ExercisePage from "./pages/ExercisePage";
import CommunityLab from "./pages/CommunityLab";
import AllCommunityLabs from "./pages/AllCommunityLabs";
import VideoSubmission from "./pages/VideoSubmission";
import SubmittedLabs from "./pages/Admin/SubmittedLabs";
import SubmittedVideos from "./pages/Admin/SubmittedVideos";
import AllCommunityVideos from "./pages/AllCommunityVideos";
import CommunityVideo from "./pages/CommunityVideo";
import ProfileCompletedLabs from './pages/ProfileCompletedLabs';
import ProfileSolvedQuizzes from './pages/ProfileSolvedQuizzes';
import ProfileSubmittedExercises from './pages/ProfileSubmittedExercises';
import ProfileWatchedVideos from './pages/ProfileWatchedVideos';
import ProfileCommunityLabs from "./pages/ProfileCommunityLabs";
import ProfileCommunityVideos from "./pages/ProfileCommunityVideos";

// Styled layout component
const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  main {
    flex: 1;
    padding-bottom: 2rem;
  }
`;

// Helper function to import all images from a folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const projectImages = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const App = ({ projectCardImages = [], filteredProjects = [] }) => {
  const theme = useSelector(selectMode);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();
  let content;

  // Set main projects state
  React.useEffect(() => {
    if (projects.length !== 0) {
      if (filteredProjects?.length > 0) {
        const tempArray = projects.filter((obj) => filteredProjects.includes(obj.name));
        dispatch(setMainProjects(tempArray.length ? [...tempArray] : [...projects.slice(0, 3)]));
      } else {
        dispatch(setMainProjects([...projects.slice(0, 3)]));
      }
    }
  }, [projects, filteredProjects, dispatch]);

  // Theme management
  const setThemes = React.useCallback((theme) => {
    const selectedTheme = theme || getPreferredTheme();
    dispatch(setMode(selectedTheme));
    setTheme(selectedTheme);
  }, [dispatch]);

  React.useEffect(() => {
    setThemes();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setThemes();
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [setThemes]);

  if (isLoading) {
    content = (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Announcements" element={<Announcements />} />
        <Route path="/Weekly-Discussions" element={<Discussions />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Resources/All-Labs" element={<AllLabs />} />
          <Route path="/Resources/Benchmarks" element={<Benchmarks />} />
          <Route path="/Resources/Exercises" element={<Exercises />} />
          <Route path="/Resources/Videos" element={<Videos />} />
          <Route path="/Resources/Videos/:videoId" element={<VideoDetailPage />} />
          <Route path="/Benchmarks/:datasetId" element={<DatasetDetail />} />
          <Route path="/Resources/Exercises/:exerciseId" element={<ExercisePage />} />
          {/* <Route path="/Exercises/Exercise-001" element={<Exercise001 />} /> */}
          {/* <Route path="/Exercises/Exercise-002" element={<Exercise002 />} />
          <Route path="/Exercises/Exercise-003" element={<Exercise003 />} /> */}
          <Route path="/Resources/Videos/Video-Submission" element={<VideoSubmission />} />
          <Route path="/Resources/Exercises/Exercise-Submission" element={<ExerciseSubmission />} />
          <Route path="/Resources/All-Labs/Lab-Submission" element={<LabSubmission />} />
          <Route path="/Resources/Benchmarks/Benchmark-Submission" element={<BenchmarkSubmission />} />
          <Route path="/Community/Community-Labs" element={<AllCommunityLabs />} />
          <Route path="/Community/Community-Labs/:id" element={<CommunityLab />} />
          <Route path="/Community/Community-Exercises" element={<CommunityExercises />} />
          <Route path="/Community/Community-Videos" element={<AllCommunityVideos />} />
          <Route path="/Community/Community-Videos/:id" element={<CommunityVideo />} />
          <Route path="/Community/Community-Benchmarks" element={<CommunityBenchmarks />} />
          <Route path="/Resources/All-Labs/:id" element={<LabPage />} />
          <Route path="/Resources/All-Labs/0" element={<Lab0Page labId={0} />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/CompletedLabs" element={<ProfileCompletedLabs />} />
          <Route path="/SolvedQuizzes" element={<ProfileSolvedQuizzes />} />
          <Route path="/SubmittedExercises" element={<ProfileSubmittedExercises />} />
          <Route path="/WatchedVideos" element={<ProfileWatchedVideos />} />
          <Route path="/ProfileCommunityLabs" element={<ProfileCommunityLabs />} />
          <Route path="/ProfileCommunityVideos" element={<ProfileCommunityVideos />} />
          {/* <Route path="/All-Labs/1" element={<Lab1Page labId={1} />} />
          <Route path="/All-Labs/2" element={<Lab2Page labId={2} />} />
          <Route path="/All-Labs/3" element={<Lab3Page labId={3} />} />
          <Route path="/All-Labs/4" element={<Lab4Page labId={4} />} />
          <Route path="/All-Labs/5" element={<Lab5Page labId={5} />} />
          <Route path="/All-Labs/6" element={<Lab6Page labId={6} />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UsersManagment" element={<UsersManagment />} />
          <Route path="/TrackProgress" element={<TrackProgress />} />
          <Route path="/VideosManagement" element={<VideosManagment />} />
          <Route path="/LabsManagement" element={<LabsManagement />} />
          <Route path="/ExercisesManagement" element={<ExcercisesManagement />} />
          <Route path="/SubmittedLabs" element={<SubmittedLabs />} />
          <Route path="/SubmittedVideos" element={<SubmittedVideos />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <h2>
          {error.status !== "FETCH_ERROR"
            ? `${error.status}: ${error.data.message}`
            : "Network Error - Please check your connection"}
        </h2>
      </Container>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      {/* Removed the Router wrapper since it's already in index.js */}
      <ThemeProvider theme={{ name: theme }}>
        <ScrollToTop />
        <GlobalStyles />
        <AppLayout>
          <Element name="Home" id="home">
            <NavBar Logo={navLogo} callBack={setThemes} />
          </Element>
          <main>
            {/* <Container> */}
              {content}
            {/* </Container> */}
          </main>
          <Footer mode={footerTheme} />
        </AppLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

App.propTypes = {
  filteredProjects: PropTypes.arrayOf(PropTypes.string),
  projectCardImages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.node.isRequired,
    })
  ),
};

export default App;