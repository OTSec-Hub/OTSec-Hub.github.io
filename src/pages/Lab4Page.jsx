import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab1pic.webp";

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
                <h4 style={{ fontWeight: "bold" }}>
                SET UP
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                CODESYS installation instructions:{" "}
                <a
                href="/labMaterials/lab3-Materials/Lab 3 CODESYS install v2.pdf" // Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                Lab 3 CODESYS install v2.pdf
                </a>
                <br />
                Download the Lab 3 folder:{" "}
                <a
                href="/labMaterials/lab3-Materials/LAB 3-20210723T184103Z-001.zip" // Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                LAB 3-20210723T184103Z-001.zip
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
                <h4 style={{ fontWeight: "bold" }}>
                  PART I
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Arrange <strong>10-20 minutes</strong> to complete Part I. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Open <strong>Codesys</strong>, and open project from LAB 3\Control System/ and select the file <strong>Desalination Cascade Control_HMI</strong>.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Click on Visualization on the left menu and play around with properties on the right.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 3
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Start the PLC from the <strong>“Codesys Control Win sysTray”</strong> presented in the System tray (hidden icons) at the bottom right of your windows. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Login from the Online tab and click on the Play icon in the top bar. Note: You may have to login twice for this to work.
              </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 5
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
              Once you run it, it’ll open the application in a demo mode. Press <strong>Alt+F4</strong> to <strong>quit the demo mode</strong>.
              </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 6
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
              Open your preferred browser and go to <strong style={{ color: "var(--custom-blue)" }}>http://127.0.0.1:8080</strong> you may note 
              that the url automatically changes to <strong style={{ color: "var(--custom-blue)" }}>http://127.0.0.1:8080/nyu_ot_security.htm</strong> once the simulation opens.
              </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 7
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "0rem"}}>
              Your first task for this lab is to open settings and <strong>change the URL to your name</strong> instead of <strong>nyu_ot_security</strong>.
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
                <h4 style={{ fontWeight: "bold" }}>
                  PART II
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Follow the steps below to complete the lab 3 activities. It will take approximately <strong>30-50 minutes</strong> to complete. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                You will create a complete HMI of the system. Be creative and make sure you are 
                monitoring all the critical variables of the system. You should also include some 
                commands on your interface to interact with the code in real-time such as <strong>"start/stop the PLC"</strong> and <strong>"change the setpoint to a different value"</strong>. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "rem"}}>
                Using your knowledge acquired from the lab, write a report highlighting:
                <br /><br />
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                    Steps taken to create and program a button to start and stop the PLC when pressed.  
                    Hint:  You may need to change code to disable the testing loop at startup.
                    </li>
                    <li>
                    Steps taken to create and program a button to alter the value of setpoint to a different 
                    value. You can decide the value on your own.  Hint:  Instead of a button you might 
                    use another control that can display and control the value.
                    </li>
                    <li>
                    Screenshots of the final result (from Part I and Part II) as well as the code are needed in the report.
                    </li>
                  </ul>
                Hint: Watch{" "}
                <a
                href="https://www.youtube.com/watch?v=9PjPJDvVbgU" // Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                this video tutorial
                </a>
                {" "}if you need some help.
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