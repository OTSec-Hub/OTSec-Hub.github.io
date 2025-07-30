import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

import Quiz from "../components/Quiz";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab3_Items/lab3.webp";
import part1step2Image from "../images/lab3_Items/part1-step2.png"
import part1step3Image from "../images/lab3_Items/part1-step3.png"
import part1step4Image from "../images/lab3_Items/part1-step4.png"
import { useParams } from "react-router-dom";

const lab3QuizQuestions = [
  {
    id: 1,
    question: "What is the main objective of Lab 3?",
    options: [
      "To analyze network traffic with Wireshark",
      "To create and interact with an HMI for a simulated PLC system using Codesys",
      "To write structured text code for sensors",
      "To simulate firewall rules on a control system",
    ],
    correct_answer: "To create and interact with an HMI for a simulated PLC system using Codesys",
  },
  {
    id: 2,
    question: "Where can you access the web-based HMI once the simulation is running?",
    options: [
      "http://localhost:3000",
      "http://192.168.0.1:8080",
      "http://127.0.0.1:8080",
      "http://10.0.0.1:5000",
    ],
    correct_answer: "http://127.0.0.1:8080",
  },
  {
    id: 3,
    question: "What does Part II of Lab 3 require you to add to the HMI?",
    options: [
      "A script to compile the PLC code",
      "Data packet sniffer controls",
      "Commands to start/stop the PLC and change setpoint values",
      "Encryption settings for PLC communication",
    ],
    correct_answer: "Commands to start/stop the PLC and change setpoint values",
  },
  {
    id: 4,
    question: "Which of the following is a required component of your HMI design in Part II?",
    options: [
      "Real-time display and control of critical system variables",
      "A login screen with password encryption",
      "A dark mode theme switcher",
      "Network scanning and diagnostics tools",
    ],
    correct_answer: "Real-time display and control of critical system variables",
  },
];


const Lab3Page = ({labId}) => {
  React.useEffect(() => {
    updateTitle("lab3 | OTSec-Hub.io");
  }, []);


  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 3 - Human Machine Interface (HMI) development and interfacing" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 3"
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
                <strong style={{ color: "var(--custom-blue)" }}>LAB 3 </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                  The goal of this assignment is to better understand a <strong style={{ color: "var(--custom-blue)" }}>Human Machine Interface (HMI)</strong> and 
                  learn how to create it for a <strong style={{ color: "var(--custom-blue)" }}>simulated PLC</strong>. You will gain firsthand experience to understand 
                  how to program an HMI in Codesys, and add values to it from the simulation, as well as how 
                  to interact with the PLC through both the HMI and a web interface. The same water desalination 
                  process used in lab 1 will be demonstrated in this lab.
                  <br /><br />
                  This assignment is broken into two parts:
                  <br /><br />
                  <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                    <li>
                      <strong style={{ color: "var(--custom-blue)" }}>Part I: </strong>
                      You are tasked to run the HMI and play around with the drag and drop buttons
                      and see what each of them does. Members have to take a deep dive into the
                      <strong style={{ color: "var(--custom-blue)" }}> various settings</strong> and
                      <strong style={{ color: "var(--custom-blue)" }}>
                        {" "}figure out a way to change the URL to their own name
                      </strong>.
                    </li>
                    <li>
                      <strong style={{ color: "var(--custom-blue)" }}>Part II: </strong>
                      You will create a
                      <strong style={{ color: "var(--custom-blue)" }}> complete HMI</strong> of the system.
                      Be creative and make sure you are monitoring all the critical variables of the system.
                      You should also include some commands on your interface to interact with the code
                      in real-time, such as "start/stop the PLC", "change the setpoint to this value" and so on.
                    </li>
                  </ul>
                Both parts should be included in the same report. <strong style={{ color: "var(--custom-blue)" }}>A screenshot of the changed url</strong> and <strong style={{ color: "var(--custom-blue)" }}>the settings 
                changed</strong> is required, as well as a <strong style={{ color: "var(--custom-blue)" }}>screenshot of the code changed to achieve the desired result</strong> for 
                part 2 is needed. The entire process should be well documented.
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
                <ul style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px", paddingLeft: "1.5rem" }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    CODESYS installation instructions:{" "}
                    <a
                      href="/labMaterials/lab3-Materials/Lab 3 CODESYS install v2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                    >
                      Lab 3 CODESYS install v2.pdf
                    </a>
                  </li>
                  <li>
                    Download the Lab 3 folder:{" "}
                    <a
                      href="/labMaterials/lab3-Materials/LAB 3-20210723T184103Z-001.zip"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                    >
                      LAB 3-20210723T184103Z-001.zip
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
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
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
              <img
                src={part1step2Image}
                alt="Step 2 screenshot"
                style={{
                  width: "80%",
                  height: "400px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 3
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Start the PLC from the <strong>“Codesys Control Win sysTray”</strong> presented in the System tray (hidden icons) at the bottom right of your windows. 
                </p>
              <img
                src={part1step3Image}
                alt="Step 3 screenshot"
                style={{
                  width: "80%",
                  height: "250px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Login from the Online tab and click on the Play icon in the top bar. Note: You may have to login twice for this to work.
              </p>
              <img
                src={part1step4Image}
                alt="Step 4 screenshot"
                style={{
                  width: "80%",
                  height: "350px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
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

              <section style={{ paddingBottom: "0rem" }}>
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
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
              <Quiz questions={lab3QuizQuestions} labId={labId} mode="lab" />
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab3Page;