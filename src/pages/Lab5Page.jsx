
import React from "react";
// Components
import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";
// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab5_Items/lab5.webp";

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
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
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
                  <span role="img" aria-label="magnifying glass">🔎</span>{" "}
                  <strong style={{ color: "var(--custom-blue)" }}>Lab 5: Network Traffic Analysis with Wireshark</strong>
                </h3>
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
                <h4
                  style={{
                    display: "inline-block",
                    borderBottom: "2px solid var(--custom-blue)",
                    paddingBottom: "0.2rem",
                  }}
                >
                  🎯 Objective
                </h4>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Analyze network captures to identify OT security attacks using Wireshark. Packet captures are provided inside a compressed archive (.zip)
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
                <h4
                  style={{
                    display: "inline-block",
                    borderBottom: "2px solid var(--custom-blue)",
                    paddingBottom: "0.2rem",
                  }}
                >
                  🛠️ Setup Instructions
                </h4>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Install Wireshark:
                  <br />👉 <a href="https://www.wireshark.org/download.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>Download Wireshark</a>
                  <br />🔹 <a href="https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallWinInstall.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>Windows Installation Guide</a>
                  <br />🔹 <a href="https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallOSXInstall.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>macOS Installation Guide</a>
                  <br />🔹 <a href="https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallUnixInstall.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>Linux Installation Guide</a>
                </p>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Download Lab Materials:
                </p>
                <a
                  href="/labMaterials/lab5-Materials/LAB5.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--custom-blue)",
                    color: "white",
                    borderRadius: "0.4rem",
                    textDecoration: "none",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e0e0e0";
                    e.target.style.color = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--custom-blue)";
                    e.target.style.color = "white";
                  }}
                >
                  📥 Download Lab5.zip
                </a>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px", marginTop: "0.5rem" }}>
                  Note: Packet capture files are named generically (e.g., <em>attack1</em>, <em>attack2</em>, <em>attack3</em>). Your task is to match each capture to the correct attack type.
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
                <h4
                  style={{
                    display: "inline-block",
                    borderBottom: "2px solid var(--custom-blue)",
                    paddingBottom: "0.2rem",
                  }}
                >
                  🎥 Tutorial Resources
                </h4>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  📚 <a href="https://www.youtube.com/watch?v=txi2p5_OjKU" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>Modbus Protocol Basics (YouTube)</a>
                  <br />🛡️ <a href="https://www.youtube.com/watch?v=MtI72wz4f5Y" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>WannaCry Ransomware Explained (YouTube)</a>
                  <br />🧪 <a href="https://www.youtube.com/watch?v=3t1BNAavrlQ" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>Malware Traffic Analysis Using Wireshark (YouTube)</a>
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

              <section className="mt-4" style={{ paddingBottom: "5rem" }}>
                <h4
                  style={{
                    display: "inline-block",
                    borderBottom: "2px solid var(--custom-blue)",
                    paddingBottom: "0.2rem",
                  }}
                >
                  📋 Assignment Instructions
                </h4>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Analyze <strong>any 2 of the packet captures</strong> and submit your findings in a report. In your report, include:
                  <br />
                  <ul>
                    <li><strong>🗂️ File Name</strong></li>
                    <li><strong>🖼️ Analysis</strong> (with screenshots)</li>
                    <li><strong>🧠 Conclusion and reasoning for identification</strong></li>
                  </ul>

                  <p>🧩 Packet captures included in the Lab (types you should identify):</p>
                  <ul>
                    <li>Malformed Modbus Packet</li>
                    <li>WannaCry SMB Exploit</li>
                    <li>Reprogram Modbus PLC</li>
                    <li>Base Training Capture</li>
                    <li>Start/Stop and Upload Action</li>
                  </ul>

                  Reference Sample:
                </p>
                <a
                  href="/labMaterials/lab5-Materials/Lab5_Analysis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--custom-blue)",
                    color: "white",
                    borderRadius: "0.4rem",
                    textDecoration: "none",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e0e0e0";
                    e.target.style.color = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--custom-blue)";
                    e.target.style.color = "white";
                  }}
                >
                  📄 Lab5_Analysis.pdf
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

export default Lab5Page;

