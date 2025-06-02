

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
      <Hero/>
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
