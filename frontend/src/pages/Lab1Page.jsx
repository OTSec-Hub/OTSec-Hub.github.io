

import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

import Quiz from "../components/Quiz";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab1pic.webp";
import step2Image from "../images/lab1_Items/lab1-step2.png"
import step3Image from "../images/lab1_Items/lab1-step3.png"
import step4Image from "../images/lab1_Items/lab1-step4.png"
import { useParams } from "react-router-dom";


const lab1QuizQuestions = [
  {
    id: 1,
    question: "What is the primary objective of Lab 1?",
    options: [
      "To configure network firewalls for industrial systems",
      "To install Simulink add-ons",
      "To understand industrial processes and simulate a desalination system",
      "To analyze Wireshark packet captures",
    ],
    correct_answer: "To understand industrial processes and simulate a desalination system",
  },
  {
    id: 2,
    question: "What type of control system is featured in the simulation of Lab 1?",
    options: ["On/Off Control", "Feedforward Loop", "Cascade PID Loop", "Fuzzy Logic Controller"],
    correct_answer: "Cascade PID Loop",
  },
  {
    id: 3,
    question: "What is the purpose of reviewing the research paper in Part I of the lab?",
    options: [
      "To learn how to install MATLAB",
      "To write a technical manual",
      "To understand threats, attack surfaces, and their impact on industrial processes",
      "To study programming syntax",
    ],
    correct_answer: "To understand threats, attack surfaces, and their impact on industrial processes",
  },
  {
    id: 4,
    question: "Which tool is used to run and visualize the desalination process simulation?",
    options: ["Wireshark", "MATLAB with Simulink", "CODESYS", "Python"],
    correct_answer: "MATLAB with Simulink",
  },
];


const Lab1Page = ({labId}) => {
  React.useEffect(() => {
    updateTitle("lab1 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 1 - Industrial process simulation and process-aware attacks" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 1"
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
                <strong style={{ color: "var(--custom-blue)" }}>LAB 1</strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                  The goal of this assignment is to gain a better understanding of what an <strong style={{ color: "var(--custom-blue)" }}>industrial process</strong> is
                  and gain hands-on experience with <strong style={{ color: "var(--custom-blue)" }}>Matlab</strong> and <strong style={{ color: "var(--custom-blue)" }}>Simulink</strong>. These tools 
                  are typically used to simulate industrial processes. A water desalination will be demonstrated in this lab. 
                  <br /><br />
                  This assignment is broken into two parts:
                  <br /><br />
                <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                  <li> <strong style={{ color: "var(--custom-blue)" }}>Part I: </strong>you are tasked to go over a <strong style={{ color: "var(--custom-blue)" }}>research paper </strong> describing the <strong style={{ color: "var(--custom-blue)" }}>desalination process </strong>and summarize your findings. 
                  Going over the paper is essential as it provides details of the various processes you will be interacting with in the lab.  The lab report summary should include a discussion of the paper that covers threats, 
                  attack surfaces, and specific attacks with impacts to performance and mechanical/physical systems.</li>
                  <li> <strong style={{ color: "var(--custom-blue)" }}>Part II: </strong>you will perform a simulation of parts of the desalination process. You will learn what <strong style={{ color: "var(--custom-blue)" }}>input (sensors)</strong>, <strong style={{ color: "var(--custom-blue)" }}>outputs (actuators)</strong>, and <strong style={{ color: "var(--custom-blue)" }}>control (cascade PID loop) </strong>
                  are. You will familiarize yourself with the simulation environment and experiment with different values on which the output of the desalination process depends. These values should be specified in the report for this project. This assignment requires you to answer some questions on Brightspace and submit a write-up.</li>
                </ul>
                Both Part I and Part II should be documented in your lab report. 
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
                <a
                  href="/labMaterials/lab1-Materials/AsiaCCS-19.pdf" // Replace with actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                  Click here to download the research article
                </a>{""}
                . Arrange <strong>20–40 minutes</strong> to read it before moving on to Part II.
                </p>
                <h4 style={{ fontWeight: "bold",
                display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  PART II
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Follow the steps below to complete the lab 1 activities. It will take approximately <strong>40-80 minutes</strong> to complete. 
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
                In order to complete the assignment, you need to use <strong style={{ color: "var(--custom-blue)" }}>MATLAB</strong> and <strong style={{ color: "var(--custom-blue)" }}>Simulink</strong>. If you have not yet done so, 
                view Lab 0: Installing Course Software for instructions on installing MATLAB and Simulink.
                <br /><br />
                *<strong>If you are using a Mac</strong>, you can use <strong>MATLAB online</strong> to complete this lab. Use these instructions for accessing MATLAB online and using Lab 1 files.
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
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                  Download the Lab 1 folder and unzip it:{" "}
                  <a
                  href="/labMaterials/lab1-Materials/LAB 1-20210723T183949Z-001.zip" // Replace with actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                 LAB 1-20210723T183949Z-001.zip
                </a>
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Go to <strong>LAB 1\Simulation\msf-thermal-desalination-plant-LAB</strong> folder in your machine, copy and paste the path to folder in MATLAB and wait for it to initialize. Then open the MSFcascade.mdl file. This can take anywhere from 30 secs to 2 mins. A text is provided at the bottom left to indicate the current state of the program in Matlab.
                </p>
              <img
                src={step2Image}
                alt="Step 2 screenshot"
                style={{
                  width: "80%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 3
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Go to the simulation tab on the top bar, and find the <strong>“Run”</strong> button on it. Press the button to run the simulation and see the results.
                </p>
              <img
                src={step3Image}
                alt="Step 3 screenshot"
                style={{
                  width: "80%",
                  height: "450px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Change the values of signal selection and observe the changes to the graphs.
                </p>
              <img
                src={step4Image}
                alt="Step 4 screenshot"
                style={{
                  width: "80%",
                  height: "425px",
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
                Recall what you read from the research paper, and play around with the interface and find out the various values that impact the output of the simulation.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 6
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem"}}>
                Using your knowledge acquired from reading the research paper, and playing around with the model (changing values and seeing their impact), write a brief report (maximum 3 pages) highlighting:
                <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                  <li>The key things you understood from the lab </li>
                  <li>The various factors affecting the output of the simulation.</li>
                  <li>Screenshots showing the above.</li>
                </ul>
                </p>
              </section>
              <Quiz questions={lab1QuizQuestions} labId={labId} mode="lab" />
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab1Page;