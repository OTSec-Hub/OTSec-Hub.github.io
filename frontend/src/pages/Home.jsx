import React from "react";
import { Container } from "react-bootstrap";
import StyledNewsBox from "../components/StyledNewsBox"; // make sure path is correct
import Hero from "../components/Hero";
import BackToTop from "../components/BackToTop";
import Title from "../components/Title"; // Make sure this import path is correct
import { useGetUsersQuery } from "../app/apiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: userData } = useGetUsersQuery();

  React.useEffect(() => {
    document.title = "OTSec-Hub";  //Fix Title: Just OTSec-Hub
  }, [userData]);

  return (
    <>
      <Hero />
      <main>
        <Container className="my-5">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <section>
                {/* ✅ Centered Title and Description */}
                <div className="text-center mb-5">
                  <Title text="Welcome to OTSEC-HUB!" size="h1" />
                  <p
                    className="mt-3"
                    style={{
                      fontSize: "1.1rem",
                      maxWidth: "800px",
                      margin: "0 auto",
                    }}
                  >
                    OTSEC-HUB is a platform built for the Operational Technology (OT) Security community.
                    Whether you're here to learn, research, or share your insights, we provide free content
                    ranging from talks and courses to interactive labs and datasets.
                    Everyone’s welcome to join, collaborate, and contribute!
                  </p>
                </div>

                {/* ✅ Left-Aligned Content Below the Title */}
                <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
                <h4 className="text-center" style={{ marginTop: "2rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      paddingBottom: "0.25rem",
                      borderBottom: "3px solid var(--custom-blue)",
                    }}
                  >
                    What We're All About
                  </span>
                </h4>
                  <ul>
                    <li>Building one of the largest hubs for OT security professionals and enthusiasts.</li>
                    <li>Sharing hands-on learning experiences with courses and labs—from beginner to advanced levels.</li>
                    <li>Supporting OT security research by sharing datasets, connecting researchers, and hosting monthly expert talks.</li>
                  </ul>
                <h4 className="text-center" style={{ marginTop: "2rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      paddingBottom: "0.25rem",
                      borderBottom: "3px solid var(--custom-blue)",
                    }}
                  >
                    Explore the Platform
                  </span>
                </h4>
                  <ul>
                    <li><strong>Talks</strong> – Watch recordings of monthly sessions with leading voices in OT security.</li>
                    <li><strong>Resources</strong> – Browse courses, labs, papers, and open datasets.</li>
                    <li><strong>Get Involved</strong> – Visit the Contact page to become a member or contributor.</li>
                  </ul>
                  <h4 className="text-center" style={{ marginTop: "2rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        paddingBottom: "0.25rem",
                        borderBottom: "3px solid var(--custom-blue)",
                      }}
                    >
                      Want to Contribute?
                    </span>
                  </h4>
                  <p>
                    Interested in offering a talk, sharing a course or dataset, or just want to say hi?
                    Please visit our <Link to="/ContactPage" className="text-primary font-weight-bold">Contact Page</Link> — we’d love to hear from you!
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <BackToTop />
    </>
  );
};

export default Home;
