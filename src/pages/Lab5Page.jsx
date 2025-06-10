// import React from "react";
// // Components

// import BackToTop from "../components/BackToTop";
// // Utils
// import { updateTitle } from "../utils";

// // Styles
// import { Container } from "react-bootstrap";
// import Title from "../components/Title";
// import image from "../images/lab1pic.webp";

// const Lab5Page = () => {
//   React.useEffect(() => {
//     updateTitle("lab5 | OTSec-Hub.io");
//   }, []);

//   return (
//     <>
//       <main>
//         <Container className="d-flex justify-content-center my-5">
//           <Title size="h2" text="Lab 5" />
//         </Container>

//         <Container>
//           <div className="row">
//             {/* Left column: Main Content */}
//             <div className="col-md-8" style={{ marginLeft: "19%" }}>
//               {/* Image Placeholder */}
//               <img
//                 src={image}
//                 alt="Lab 5"
//                 style={{
//                   width: "80%",
//                   height: "300px",
//                   objectFit: "cover",
//                   borderRadius: "0.5rem",
//                   marginBottom: "1.5rem",
//                   marginLeft: "5%",
//                 }}
//               />
//               <section>
//                 <h3 className="mt-4"> 
//                 <span role="img" aria-label="magnifying glass">🔎</span>{' '}
//                 <strong style={{ color: "var(--custom-blue)" }}>LAB 5 </strong>
//                 </h3>
//                 <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
//                   The goal of this assignment is to identify various attacks by <strong style={{ color: "var(--custom-blue)" }}>network capture analysis</strong> through <strong style={{ color: "var(--custom-blue)" }}>Wireshark</strong>. 
//                   Various OT Security attacks were used for this lab and the network packets captured during their execution are 
//                   provided to you in the folder. It will take <strong style={{ color: "var(--custom-blue)" }}>2-3 hours</strong> to complete all the analyses.
//                 </p>                
//               </section>
//               <hr
//                 style={{
//                   borderTop: "3px solid var(--custom-blue)",
//                   opacity: 0.4,
//                   margin: "1.5rem 0",
//                   width: "95%",
//                 }}
//               />
//               <section className="mt-4">
//                 <h4 style={{ fontWeight: "bold",  display: "inline-block",
//                 borderBottom: "2px solid var(--custom-blue)",
//                 paddingBottom: "0.2rem" }}>
//                 SET UP
//                 </h4>
//                 <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
//                 In order to complete the assignment, you need to use Wireshark. 
//                 All the packet captures and one example can be downloaded from this folder:{" "}
//                     <a
//                       href="/labMaterials/lab5-Materials/LAB5.zip"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
//                     >
//                       LAB5.zip
//                     </a>
//                 </p>
//               </section>
//               <hr
//                 style={{
//                   borderTop: "3px solid var(--custom-blue)",
//                   opacity: 0.4,
//                   margin: "1.5rem 0",
//                   width: "95%",
//                 }}
//               />
//               <section className="mt-4">
//                 <h4 style={{ fontWeight: "bold",  display: "inline-block",
//                 borderBottom: "2px solid var(--custom-blue)",
//                 paddingBottom: "0.2rem" }}>
//                   TUTORIAL
//                 </h4>
//                 <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
//                 Check out{" "} 
//                 <a
//                   href="https://www.youtube.com/watch?v=3t1BNAavrlQ"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
//                 >
//                   this video
//                 </a>
//                 {" "}to learn how malware traffic analysis can be done in Wireshark.
//                 </p>
//               </section>
//               <hr
//                 style={{
//                   borderTop: "3px solid var(--custom-blue)",
//                   opacity: 0.4,
//                   margin: "1.5rem 0",
//                   width: "95%",
//                 }}
//               />

//               <section style={{ paddingBottom: "5rem" }}>
//                 <h4 style={{ fontWeight: "bold",  display: "inline-block",
//                 borderBottom: "2px solid var(--custom-blue)",
//                 paddingBottom: "0.2rem" }}>
//                   SUBMISSION
//                 </h4>
//                 <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
//                 Analyze <strong>any 2 of the packet captures</strong> and submit your findings in the form of a report. In your report, indicate:
//                 <br /><br />
//                   <ul>
//                     <li><strong>File Name</strong></li>
//                     <li><strong>Analysis</strong> (with screenshots to support your reasoning)</li>
//                     <li><strong>Conclusion</strong></li>
//                   </ul>
//                 The packet captures in the folder include:
//                 <br /><br />
//                   <ul>
//                     <li>malformed_modbus_packet</li>
//                     <li>wannacry_smb</li>
//                     <li>reprogram_modbus_plc</li>
//                     <li>base_training</li>
//                     <li>start_stop_and_upload</li>
//                   </ul>
//                   A sample analysis is attached for reference:{" "} 
//                   <a
//                   href="/labMaterials/lab5-Materials/Lab5_Analysis.pdf"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
//                 >
//                   Lab5_Analysis.pdf
//                 </a>
//                 </p>
//                 <p style={{ color: "var(--custom-blue)", fontSize: "1.1rem" }}>
//                   Submit your lab report to: mm6446@nyu.edu
//                 </p>
//               </section>
//             </div>
//           </div>
//         </Container>

//         <BackToTop home="Home" />
//       </main>
//     </>
//   );
// };

// export default Lab5Page;


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

