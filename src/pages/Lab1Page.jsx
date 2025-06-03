import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab1pic.webp";

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
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 1 Wireshark Screenshot"
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
                <strong>LAB 1: NETWORK TRAFFIC ANALYSIS WITH WIRESHARK </strong> 
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                  🎯 <strong style={{ color: "var(--custom-blue)" }}>Objective:</strong> Analyze network captures to identify OT security attacks using Wireshark. Packet captures are provided inside a compressed archive (.zip).
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
                <h4 style={{ fontWeight: "bold" }}>
                  🛠️ SETUP INSTRUCTIONS
                </h4>

                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem"}}>
                  <strong>1. Install Wireshark: </strong>
                </p>
                <ul style={{ listStyleType: "none", paddingLeft: 0, fontSize: "1rem" }}>
                  <li>
                    👉 <a href="https://www.wireshark.org/download.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      Download Wireshark
                    </a>
                  </li>
                  <li>
                    🔹 <a href="https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallWinInstall.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      Windows Installation Guide
                    </a>
                  </li>
                  <li>
                    🔹 <a href="https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallOSXInstall.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      macOS Installation Guide
                    </a>
                  </li>
                  <li>
                    🔹 <a href="https://www.wireshark.org/#download" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      Linux Installation Guide
                    </a>
                  </li>
                </ul>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem"}}>
                  <strong>2. Download Lab Materials: </strong>
                </p>
                <a
                  href="/labMaterials/LAB1.zip"  // replace with your actual ZIP file path
                  download
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--custom-blue)",
                    color: "#fff",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#666666")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "var(--custom-blue)")}
                >
                  📦 Download lab1.zip
                </a>
                <p style={{ color: "#666666", fontSize: "0.9rem", marginTop: "0.5rem",maxWidth: "600px"}}>
                  <strong>Note:</strong> Packet capture files are named generically (e.g., attack1, attack2, attack3). Your task is to match each capture to the correct attack type.
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
                <h4 style={{ fontWeight: "bold" }}>
                  🎥 TUTORIAL RESOURCES
                </h4>
                <ul style={{ listStyleType: "none", paddingLeft: 0, fontSize: "1rem" }}>
                  <li>
                    👉 <a href="https://www.youtube.com/watch?v=txi2p5_OjKU" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      Modbus Protocol Basics (YouTube)
                    </a>
                  </li>
                  <li>
                    🔹 <a href="https://www.youtube.com/watch?v=MtI72wz4f5Y" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      WannaCry Ransomware Explained (YouTube)
                    </a>
                  </li>
                  <li>
                    🔹 <a href="https://www.youtube.com/watch?v=3t1BNAavrlQ" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      Malware Traffic Analysis Using Wireshark (YouTube)
                    </a>
                  </li>
                </ul>
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
                <h4 style={{ fontWeight: "bold" }}>
                  📋 ASSIGNMENT INSTRUCTIONS
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem"}}>
                  <strong>1. Analyze Any Two Packet Captures: </strong>
                </p>
                <p style={{ paddingLeft: "1.2rem", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  🧩 Packet captures included in the Lab (types you should identify):
                </p>
                <ul style={{ fontSize: "1rem", paddingLeft: "2.25rem" }}>
                  <li>Malformed Modbus Packet</li>
                  <li>WannaCry SMB Exploit</li>
                  <li>Reprogram Modbus PLC</li>
                  <li>Base Training Capture</li>
                  <li>Start/Stop and Upload Action</li>
                </ul>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem"}}>
                  <strong>2. Prepare a Report: </strong>
                </p>
                <p style={{ paddingLeft: "1.2rem", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  For each analyzed capture, include:
                </p>
                <ul style={{ fontSize: "1rem", paddingLeft: "2.25rem" }}>
                  <li>🗂️ File Name</li>
                  <li>🖼️ Analysis (with screenshots)</li>
                  <li>🧠 Conclusion and reasoning for identification</li>
                </ul>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem"}}>
                  <strong>3. Reference Sample: </strong>
                </p>
                <a
                  href="/labMaterials/Lab1_Analysis.pdf"  // replace with your actual ZIP file path
                  download
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--custom-blue)",
                    color: "#fff",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#666666")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "var(--custom-blue)")}
                >
                  📄 View sample analysis (PDF)
                </a>
              </section>
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab1Page;