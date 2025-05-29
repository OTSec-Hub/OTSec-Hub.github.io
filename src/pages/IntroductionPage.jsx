import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import SidebarBox from "../components/SidebarBox";

const IntroductionPage = () => {
  React.useEffect(() => {
    updateTitle("Introduction | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Welcome to OTSEC-HUB!" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-7 offset-md-0"
            style={{ marginLeft: "5%" }}>
              <section>
                {/*<h4 className="mt-4">WEBSITE Description</h4>*/}
                <h4
                  style={{
                    display: "inline-block",
                    paddingBottom: "0.25rem",
                    borderBottom: "3px solid var(--custom-blue)",
                  }}
                >
                  WEBSITE DESCRIPTION
                </h4>
                <p>
                  OTSEC-HUB is a platform for the Operational Technology (OT) Security community. We provide content related to OT security for both academic and research purposes. Our goal is to offer talks, courses, interactive labs, datasets, and more—free for everyone. Anyone can collaborate and share their knowledge here!
                </p>

                <h4
                  style={{
                    display: "inline-block",
                    paddingBottom: "0.25rem",
                    borderBottom: "3px solid var(--custom-blue)",
                  }}
                  >WEBSITE OBJECTIVES</h4>
                <ul>
                  <li>Becoming one of the largest hubs for OT security practitioners and enthusiasts.</li>
                  <li>Offering learning content through courses and interactive labs, covering topics from beginner to advanced levels.</li>
                  <li>Advancing OTSec research by collecting datasets, facilitating communication among researchers, and organizing monthly talks.</li>
                </ul>

                <h4                   
                  style={{
                    display: "inline-block",
                    paddingBottom: "0.25rem",
                    borderBottom: "3px solid var(--custom-blue)",
                  }}>WHAT YOU WILL FIND HERE</h4>
                <ul>
                  <li><strong>Talks Page</strong> – Recordings of our monthly talks, featuring researchers and engineers discussing relevant topics.</li>
                  <li><strong>Resources Page</strong> – Links to courses, labs, research papers, and ready-to-use datasets.</li>
                  <li><strong>Contact Page</strong> – Instructions on how to become a permanent member by filling out a form.</li>
                </ul>

                <h4                   
                  style={{
                    display: "inline-block",
                    paddingBottom: "0.25rem",
                    borderBottom: "3px solid var(--custom-blue)",
                  }}>HOW TO JOIN US?</h4>
                <p>
                  If you’d like to contribute by offering a talk, course, dataset, or if you have a suggestion, feel free to contact us at <code>mm6446 at nyu dot edu</code>.
                </p>
              </section>
            </div>
            <div className="col-md-4">
              <SidebarBox
                title="Recent Posts"
                items={[
                  { text: "NEWS", link: "/news" },     // add link if you have one, or remove link property
                  { text: "Welcome", link: "/welcome" }
                ]}
              />

              <SidebarBox
                title="Recent Comments"
                items={[
                  { text: "No comments to show." }     // no link here, just text
                ]}
              />

              <SidebarBox
                title="Archives"
                items={[
                  { text: "February 2025" }
                ]}
              />
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default IntroductionPage;
