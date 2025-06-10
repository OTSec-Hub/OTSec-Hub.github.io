import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab1pic.webp";

const Lab5Page = () => {
  React.useEffect(() => {
    updateTitle("lab5 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 5" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 5"
                style={{
                  width: "80%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
              <section>
                <h3 className="mt-4"> 
                <span role="img" aria-label="magnifying glass">🔎</span>{' '}
                <strong style={{ color: "var(--custom-blue)" }}>LAB 5 </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                  The goal of this assignment is to identify various attacks by <strong style={{ color: "var(--custom-blue)" }}>network capture analysis</strong> through <strong style={{ color: "var(--custom-blue)" }}>Wireshark</strong>. 
                  Various OT Security attacks were used for this lab and the network packets captured during their execution are 
                  provided to you in the folder. It will take <strong style={{ color: "var(--custom-blue)" }}>2-3 hours</strong> to complete all the analyses.
                </p>                
              </section>
              <hr
                style={{
                  borderTop: "3px solid var(--custom-blue)",
                  opacity: 0.4,
                  margin: "1.5rem 0",
                  width: "95%",
                }}
              />
              <section className="mt-4">
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                SET UP
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                In order to complete the assignment, you need to use Wireshark. 
                All the packet captures and one example can be downloaded from this folder:{" "}
                    <a
                      href="/labMaterials/lab5-Materials/LAB5.zip"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                    >
                      LAB5.zip
                    </a>
                </p>
              </section>
              <hr
                style={{
                  borderTop: "3px solid var(--custom-blue)",
                  opacity: 0.4,
                  margin: "1.5rem 0",
                  width: "95%",
                }}
              />
              <section className="mt-4">
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  TUTORIAL
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Check out{" "} 
                <a
                  href="https://www.youtube.com/watch?v=3t1BNAavrlQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                  this video
                </a>
                {" "}to learn how malware traffic analysis can be done in Wireshark.
                </p>
              </section>
              <hr
                style={{
                  borderTop: "3px solid var(--custom-blue)",
                  opacity: 0.4,
                  margin: "1.5rem 0",
                  width: "95%",
                }}
              />

              <section style={{ paddingBottom: "5rem" }}>
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  SUBMISSION
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Analyze <strong>any 2 of the packet captures</strong> and submit your findings in the form of a report. In your report, indicate:
                <br /><br />
                  <ul>
                    <li><strong>File Name</strong></li>
                    <li><strong>Analysis</strong> (with screenshots to support your reasoning)</li>
                    <li><strong>Conclusion</strong></li>
                  </ul>
                The packet captures in the folder include:
                <br /><br />
                  <ul>
                    <li>malformed_modbus_packet</li>
                    <li>wannacry_smb</li>
                    <li>reprogram_modbus_plc</li>
                    <li>base_training</li>
                    <li>start_stop_and_upload</li>
                  </ul>
                  A sample analysis is attached for reference:{" "} 
                  <a
                  href="/labMaterials/lab5-Materials/Lab5_Analysis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                  Lab5_Analysis.pdf
                </a>
                </p>
                <p style={{ color: "var(--custom-blue)", fontSize: "1.1rem" }}>
                  Submit your lab report to: mm6446@nyu.edu
                </p>
              </section>
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab5Page;