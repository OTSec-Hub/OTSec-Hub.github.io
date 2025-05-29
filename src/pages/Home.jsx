
// import React from "react";
// // State
// import { useGetUsersQuery } from "../app/apiSlice";
// // Components
// import Hero from "../components/Hero";
// import BackToTop from "../components/BackToTop";
// import { useSelector } from "react-redux";
// import { Container } from "react-bootstrap";
// // Utils
// import { updateTitle } from "../utils";

// // #region component
// const Home = () => {
//   const { data: userData } = useGetUsersQuery();
//   // const data = useSelector(selectProjects); // Uncomment if needed

//   React.useEffect(() => {
//     updateTitle(`OTSec-Hub.io`);
//   }, [userData]);

//   return (
//     <>
//       <Hero name="OTSec-Hub" />
// {/*      <main>
//         <Container className="my-5">
//           <section>
//             <h2>NEWS</h2>

//             <div className="mb-4">
//               <h5>Posted on February 6, 2025 Upcoming Events</h5>
//               <p>A new ICS lab has been uploaded.</p>
//             </div>

//             <h2>WELCOME</h2>
//             <div>
//               <h5>Posted on February 6, 2025 Upcoming Events</h5>
//               <p>Welcome to OTSec-Hub!</p>
//             </div>
//           </section>
//         </Container>
//       </main>
//       <BackToTop />*/}
//       <main>
//         <Container className="my-5">
//           <section>
//             <h2 className="text-center mb-4">Latest Updates</h2>

//             {/* NEWS Item */}
//             <div className="mb-4 p-4 bg-light shadow-sm rounded border-start border-8 border-primary">
//               <h4 className="mb-1">NEWS</h4>
//               <small className="text-muted">Posted on February 6, 2025 · Upcoming Events</small>
//               <p className="mt-2">A new ICS lab has been uploaded.</p>
//             </div>

//             {/* WELCOME Item */}
//             <div className="mb-4 p-4 bg-light shadow-sm rounded border-start border-8 border-success">
//               <h4 className="mb-1">WELCOME</h4>
//               <small className="text-muted">Posted on February 6, 2025 · Upcoming Events</small>
//               <p className="mt-2">Welcome to OTSec-Hub!</p>
//             </div>
//           </section>
//         </Container>
//       </main>
//       <BackToTop />
//     </>
//   );
// };
// // #endregion

// export default Home;

import React from "react";
import { Container } from "react-bootstrap";
import StyledNewsBox from "../components/StyledNewsBox"; // make sure path is correct
import Hero from "../components/Hero";
import BackToTop from "../components/BackToTop";
import { useGetUsersQuery } from "../app/apiSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const { data: userData } = useGetUsersQuery();

  React.useEffect(() => {
    document.title = "OTSec-Hub.io";
  }, [userData]);

  return (
    <>
      <Hero name="OTSec-Hub" />
      <main>
        <Container className="my-5">
          <h2 className="mb-4">Latest Updates</h2>

          <StyledNewsBox>
            <div className="card">
              <div className="card-title">NEWS</div>
              <div className="card-meta">Posted on February 6, 2025 · Upcoming Events</div>
              <div className="card-text">A new ICS lab has been uploaded.</div>
            </div>
          </StyledNewsBox>

          <StyledNewsBox>
            <div className="card">
              <div className="card-title">WELCOME</div>
              <div className="card-meta">Posted on February 6, 2025 · Upcoming Events</div>
              <div className="card-text">Welcome to OTSec-Hub!</div>
            </div>
          </StyledNewsBox>
        </Container>
      </main>
      <BackToTop />
    </>
  );
};

export default Home;
