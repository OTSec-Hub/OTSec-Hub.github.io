import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import SidebarBox from "../components/SidebarBox";

const Lab1Page = () => {
  React.useEffect(() => {
    updateTitle("lab1 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 1: Wireshark" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8">
              <section>
                <h3 className="mt-4">Description</h3>
                <p>
                  Project Descrtion...
                </p>

{/*                <h4 className="mt-4">WEBSITE Objectives</h4>
                <ul>
                  <li>Becoming one of the largest hubs for OT security practitioners and enthusiasts.</li>
                  <li>Offering learning content through courses and interactive labs, covering topics from beginner to advanced levels.</li>
                  <li>Advancing OTSec research by collecting datasets, facilitating communication among researchers, and organizing monthly talks.</li>
                </ul>

                <h4 className="mt-4">What you will find here</h4>
                <ul>
                  <li><strong>Talks Page</strong> – Recordings of our monthly talks, featuring researchers and engineers discussing relevant topics.</li>
                  <li><strong>Resources Page</strong> – Links to courses, labs, research papers, and ready-to-use datasets.</li>
                  <li><strong>Contact Page</strong> – Instructions on how to become a permanent member by filling out a form.</li>
                </ul>

                <h4 className="mt-4">How to JOIN US?</h4>
                <p>
                  If you’d like to contribute by offering a talk, course, dataset, or if you have a suggestion, feel free to contact us at <code>mm6446 at nyu dot edu</code>.
                </p> */}
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
        </Container>*/}

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab1Page;