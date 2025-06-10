import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab4_Items/lab4.webp";
import part1step1Image from "../images/lab4_Items/part1-step1.png"
import part2step1Image from "../images/lab4_Items/part2-step1.png"
import part2step2Image from "../images/lab4_Items/part2-step2.png"
import part2step3Image from "../images/lab4_Items/part2-step3.png"
import part2step4Image from "../images/lab4_Items/part2-step4.png"
import part2step5Image from "../images/lab4_Items/part2-step5.png"
import part2step6Image from "../images/lab4_Items/part2-step6.png"
import part2step7Image from "../images/lab4_Items/part2-step7.png"

const Lab4Page = () => {
  React.useEffect(() => {
    updateTitle("lab4 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 4" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 4"
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
                <strong style={{ color: "var(--custom-blue)" }}>LAB 4 </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                The goal of this assignment is to better understand <strong style={{ color: "var(--custom-blue)" }}>SCADA</strong> and <strong style={{ color: "var(--custom-blue)" }}>industrial control 
                protocols like Modbus</strong>. Students will gain firsthand experience in identifying and 
                learning how a host (client) and a server interact, and how this interaction works.
                  <br /><br />
                  This assignment is broken into three parts:
                  <br /><br />
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                      <strong style={{ color: "var(--custom-blue)" }}>Part I: </strong>
                      You are tasked to get familiar with QModMaster and to go over the manual and understand what the Modbus protocol 
                      is and how it works. Refer to Step 1 in Part I to see how to open the QModMaster manual for information on the Modbus protocol.
                    </li>
                    <li>
                      <strong style={{ color: "var(--custom-blue)" }}>Part II: </strong>
                      You are tasked to observe how this communication works with Modbus protocol and play around with the interface. 
                      You will see if the changes done in either the client or the server are reflected in the other.
                    </li>
                    <li>
                      <strong style={{ color: "var(--custom-blue)" }}>Part III: </strong>
                      Open Wireshark and try to capture the packets that were used for communication.
                    </li>
                  </ul>
                  Both Parts II and III should be included in the lab report.
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
                <h4 style={{ fontWeight: "bold",
                            display: "inline-block",
                            borderBottom: "2px solid var(--custom-blue)",
                            paddingBottom: "0.2rem" }}>
                SET UP
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                      In order to complete the assignment, you need ModRSsim2 and QModMaster, which are already 
                      provided in the Lab 4 folder, and Wireshark. Wireshark can be downloaded from{" "}
                      <a
                      href="https://www.wireshark.org/#download" // Replace with actual URL
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                      >
                      https://www.wireshark.org/#download.
                      </a>
                    </li>
                    <li>
                      Download the Lab 4 folder and unzip it:{" "}
                      <a
                      href="/labMaterials/lab4-Materials/LAB 4-20210723T184106Z-001.zip" // Replace with actual URL
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                      >
                      LAB 4-20210723T184106Z-001.zip.
                      </a>
                    </li>
                  </ul>
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
                <h4 style={{ fontWeight: "bold",
                          display: "inline-block",
                          borderBottom: "2px solid var(--custom-blue)",
                          paddingBottom: "0.2rem" }}>
                  PART I
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Spend some time to get familar with QModMaster. It will take approximately <strong>10-20 minutes</strong> to complete. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Open Lab 4 folder and run QModMaster. In <strong>QModMaster</strong>, open the Manual page (click on the icon shown in the image below), and go over it.
                </p>
              <img
                src={part1step1Image}
                alt="Step 1 screenshot"
                style={{
                  width: "75%",
                  height: "215px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "9%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Click to answer the questions on Brightspace based on the manual.
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                    Questions: Lab 4 - Knowledge Checks
                    </li>
                  </ul>
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

              <section style={{ paddingBottom: "0rem" }}>
                <h4 style={{ fontWeight: "bold",
                          display: "inline-block",
                          borderBottom: "2px solid var(--custom-blue)",
                          paddingBottom: "0.2rem" }}>
                  PART II
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Follow the steps below to complete the lab 4 activities. It will take approximately <strong>20-40 minutes</strong> to complete.  
                All of the steps followed and the screenshots of the end results should be compiled in the lab report. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Open both <strong>ModRSsim2</strong> and <strong>QModMaster</strong>. In QModMaster, go to <strong>File</strong> and <strong>Load Session</strong>. 
                Navigate to the Lab 4 folder and open <strong>“Lab Client.ses”</strong> which is the session file you need for this lab.
                </p>
              <img
                src={part2step1Image}
                alt="Step 1 screenshot"
                style={{
                  width: "95%",
                  height: "107px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "0%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Start the <strong>ModRSsim2</strong> from the icon on the right top corner.
                </p>
              <img
                src={part2step2Image}
                alt="Step 2 screenshot"
                style={{
                  width: "75%",
                  height: "150px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "9%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 3
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Make sure your settings match these.
                </p>
                <img
                  src={part2step3Image}
                  alt="Step 3 screenshot"
                  style={{
                    width: "60%",
                    height: "400px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "16%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Click on the connect icon on the top bar in <strong>QModMaster</strong>.
                </p>
                <img
                  src={part2step4Image}
                  alt="Step 4 screenshot"
                  style={{
                    width: "70%",
                    height: "400px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "11%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 5
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Make sure both software are connected by checking the connected number on the left 
                top corner of the <strong>ModRSsim2</strong> software. Once it shows (1/10) connected, both of them 
                can talk to each other and we can proceed to the assignment.
                </p>
                <img
                  src={part2step5Image}
                  alt="Step 5 screenshot"
                  style={{
                    width: "90%",
                    height: "200px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "5%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 6
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Press the scan button on the top bar in <strong>QModMaster</strong>.
                </p>
                <img
                  src={part2step6Image}
                  alt="Step 6 screenshot"
                  style={{
                    width: "65%",
                    height: "400px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "15%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 7
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                The top bar of ModRSsim2 shows packets being sent and received - showing both the server and client are talking to each other. 
                </p>
                <img
                  src={part2step7Image}
                  alt="Step 7 screenshot"
                  style={{
                    width: "95%",
                    height: "200px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "2%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 8
                </h4>
                <ul style={{ fontSize: "1.1rem", marginBottom: "1rem", paddingLeft: "1.5rem", maxWidth: "800px" }}>
                  <li>
                    Make changes in the register via <strong>ModRSsim2</strong> and see if the changes are reflected in <strong>QModMaster</strong>.
                  </li>
                  <li>
                    Change the settings in <strong>QModMaster</strong> to Read holding register so that you can track the changes in the holding register.
                  </li>
                  <li>
                    Do the vice-versa: make changes through <strong>QModMaster</strong> and read through <strong>ModRSsim2</strong> to see if the changes are reflected. 
                    <strong> Hint:</strong> You may need to stop the scan and change settings such as the Function Code to do this.
                  </li>
                </ul>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 9
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "0rem"}}>
                Using your knowledge acquired from working with the model, write a report highlighting:
                <ul style={{ fontSize: "1.1rem", marginBottom: "1rem", paddingLeft: "1.5rem", maxWidth: "800px" }}>
                  <li>
                    Change the holding register values at address 400041-400050 to any integer value in ModRSsim2 and show how the changes are reflected in QModMaster.
                  </li>
                  <li>
                    Change the value of the 400016th address from QModMaster and show how it is reflected in ModRSsim2.
                  </li>
                </ul>
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
                <h4 style={{ fontWeight: "bold",
                          display: "inline-block",
                          borderBottom: "2px solid var(--custom-blue)",
                          paddingBottom: "0.2rem" }}>
                  PART III
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "0rem"}}>
                Let's perform the tasks above using Wireshark. It will take approximately <strong>30-60 minutes</strong> to complete. 
                </p>
                <h4 style={{ fontWeight: "bold",marginTop: "1.0rem" }}>
                  STEPS
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Open Wireshark and complete the following tasks. If you are new to Wireshark,{" "}
                <a
                href="https://www.youtube.com/watch?v=lb1Dw0elw0Q" // Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
               click here to watch this tutorial. 
                </a>
                {" "}All the tasks should be included in the report:
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                    Repeat the steps done in Part II, but with Wireshark open and find the packets used in that communication. 
                    Specify the protocol used, the transaction identifier, and the reference number for each of them.
                    </li>
                    <li>
                    All of the steps followed and the screenshots of the end results should be compiled in a detailed lab report. 
                    </li>
                  </ul>
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

export default Lab4Page;