
//import core library
import React from "react";

//import components
import BackToTop from "../components/BackToTop";
import SidebarBox from "../components/SidebarBox";
import Title from "../components/Title";

//import utility function to update page title dynamically
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";

//functional component: announcements page
const Announcements = () => {
  React.useEffect(() => {
    // Run on mount: set the browser tab title
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
              {/* Main announcement message */}
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

            {/* Right column – Sidebar with static sections */}
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

export default Announcements;