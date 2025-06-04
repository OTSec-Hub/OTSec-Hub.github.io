import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import SidebarBox from "../components/SidebarBox";

const Announcements = () => {
  React.useEffect(() => {
    updateTitle("Announcements | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Announcements" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-7 offset-md-0" style={{ marginLeft: "5%" }}>
              <section>
                {/*<h3 className="mt-4">Description</h3>*/}
{/*                <p style={{ fontSize: "1.25rem" }}>
                  We are preparing new <strong>teaching, research, and industry-related</strong> content for all <strong>Operational Technology Security enthusiasts!</strong> This page will list all our latest news and announcements—keep refreshing and checking for newly uploaded content!
                </p> */} 
                <p style={{ fontSize: "1.25rem" }}>
                  We are preparing new{" "}
                  <strong style={{ color: "var(--custom-blue)" }}>
                    teaching, research, and industry-related
                  </strong>{" "}
                  content for all{" "}
                  <strong style={{ color: "var(--custom-blue)" }}>
                    Operational Technology Security enthusiasts!
                  </strong>{" "}
                  This page will list all our latest news and announcements—keep refreshing and checking for newly uploaded content!
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

export default Announcements;