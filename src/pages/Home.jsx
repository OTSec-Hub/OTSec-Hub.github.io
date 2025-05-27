import React from "react";
// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
//import Introduction from "../components/Introduction";
//import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
import { useSelector } from "react-redux";
import { selectProjects } from "../app/projectsSlice";
// Config
import { filteredProjects, moreInfo } from "../config";
// Utils
import { updateTitle } from "../utils";

// #region component
const Home = () => {
  const { data: userData } = useGetUsersQuery();
  const data = useSelector(selectProjects);

  React.useEffect(() => {
    updateTitle(`OTSec-Hub.io`);
  }, [userData]);

  return (
    <>
      {/*<Hero name={userData.name} */} 
      <Hero name="OTSec-Hub" />
      <main>
        {/*<Introduction
          moreInfo={moreInfo}
        /> */}
        {/* <Skills /> */}
        {/*<Projects filteredProjects={filteredProjects} /> */}
        <Projects filteredProjects={data.slice(0, 6)} />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
};
// #endregion

export default Home;
