import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import SidebarBox from "../components/SidebarBox";

const Discussions = () => {
  React.useEffect(() => {
    updateTitle("Discussion-Forums | OTSec-Hub");  //Fix Title: Just OTSec-Hub
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Discussion Forums" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-7 offset-md-0" style={{ marginLeft: "5%" }}>
              <section>
                {/*<h3 className="mt-4">Description</h3>*/}
                <p style={{ fontSize: "1.25rem" }}>
                  OTSEC-HUB is proud to host an open discussion forum dedicated to the{" "}
                  <strong style={{ color: "var(--custom-blue)" }}>
                    Operational Technology and ICS Security community
                  </strong>
                  . Here, anyone can share insights, ask questions, post research, and collaborate on topics related to ICS security. Whether you’re a beginner, practitioner, or researcher, this space is yours to connect, learn, and grow together.
                </p>
              </section>
            </div>
            <div className="col-md-4">
              {/* <SidebarBox
                title="Recent Posts"
                items={[
                  { text: "NEWS", link: "/news" },     // add link if you have one, or remove link property
                  { text: "Welcome", link: "/welcome" }
                ]}
              /> */}

              <SidebarBox
                title="Recent Comments"
                items={[
                  { text: "No comments to show." }     // no link here, just text
                ]}
              />

              {/* <SidebarBox
                title="Archives"
                items={[
                  { text: "February 2025" }
                ]}
              /> */}
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Discussions;
