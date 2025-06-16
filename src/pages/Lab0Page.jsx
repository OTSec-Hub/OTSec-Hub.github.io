import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

import FillInTheBlank from "../components/FillInTheBlank";
import Quiz from "../components/Quiz";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab0_Items/lab0.webp";
import image1 from "../images/lab0_Items/pic1.png"
import image2 from "../images/lab0_Items/pic2.png"
import image3 from "../images/lab0_Items/pic3.png"
import image4 from "../images/lab0_Items/pic4.png"
import image5 from "../images/lab0_Items/pic5.png"
import image6 from "../images/lab0_Items/pic6.png"
import image7 from "../images/lab0_Items/pic7.png"

const lab0FillInQuestions = [
  {
    id: 1,
    question: "You must install MATLAB and ________ to complete all labs.",
    correctAnswer: "Simulink",
  },
  {
    id: 2,
    question: "To install CODESYS, create an ________ Customer Account.",
    correctAnswer: "Individual",
  },
];

const lab0QuizQuestions = [
  {
    id: 1,
    question: "What does PLC stand for?",
    options: [
      "Programmable Logic Controller",
      "Primary Logic Circuit",
      "Programmable Link Controller",
      "Process Logic Control",
    ],
    correctAnswer: "Programmable Logic Controller",
  },
  {
    id: 2,
    question: "Which software is used in Lab 2?",
    options: ["Matlab", "Codesys", "Wireshark", "Visual Studio"],
    correctAnswer: "Codesys",
  },
];



const Lab0Page = () => {
  React.useEffect(() => {
    updateTitle("lab0 | OTSec-Hub.io");
  }, []);





  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 0 - Installing Course Software" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "20%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 0"
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
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                  In order to complete the Lab Assignments, you need to download and use several applications on a Windows PC 
                  (this can be a virtual machine) with about 40 GB of free space.  Both applications need to be installed on the same system.
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
              <section>
                <h3 className="mt-4"> 
                <strong style={{ color: "var(--custom-blue)" }}>MATLAB, Simulink and Simulink PLC Coder </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}>
                You should first install Matlab. A licensed version of Matlab is provided by NYU and can be downloaded from NYU Software Library at{" "} 
                  <a
                  href="https://www.nyu.edu/life/information-technology/computing-support/software/software/matlab.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                  https://www.nyu.edu/life/information-technology/computing-support/software/software/matlab.html
                </a>
                .
                </p> 
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                Note:  MATLAB offers an online version of the software, this will not work with all of the labs in this course.
                </p>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                Create a new account on the Matlab portal using your NYU email. This grants you a special license as a member of 
                New York University. Make sure you have this account information and your NYU Net ID during the installation, because 
                you will have to enter this information a number of times during the installation process. Once registered, download 
                the installer for latest version of Matlab and install it.
                </p>
                <img
                  src={image1}
                  alt="screenshot 1"
                  style={{
                    width: "75%",
                    height: "325px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "7%",
                  }}
                />
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                During the configuration check <strong>Simulink</strong> (the 2nd item on the list) and <strong>Simulink PLC Coder</strong> to install them. If you already 
                have the latest version of <strong>Matlab</strong> installed but are missing the add-ons, you can go through the installation process and 
                select <strong>Simulink</strong> and <strong>Simulink PLC Coder</strong>.
                </p>
                <img
                  src={image2}
                  alt="screenshot 2"
                  style={{
                    width: "75%",
                    height: "350px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "7%",
                  }}
                /> 
                <img
                  src={image3}
                  alt="screenshot 3"
                  style={{
                    width: "75%",
                    height: "400px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "7%",
                  }}
                />                
              </section>
              <hr
                style={{
                  borderTop: "3px solid var(--custom-blue)",
                  opacity: 0.4,
                  margin: "1.5rem 0",
                  width: "95%",
                }}
              />
              <section>
                <h3 className="mt-4"> 
                <strong style={{ color: "var(--custom-blue)" }}>CODESYS </strong>
                </h3>  
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                Codesys can be downloaded from{" "}
                  <a
                    href="https://us.store.codesys.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                    https://us.store.codesys.com/
                  </a>
                  {" "}by creating an account using your NYU email (create an "Individual Customer Account").  
                  The labs required a specific version of Codesys, please follow these instructions to install the software:
                </p>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                To install CODESYS 3.5.17.0 please follow these steps...
                <ul>
                  <li>This process assumes that CODESYS is not installed on the target system.</li>
                  <li>Click the link below to open the US CODESYS Store.</li>
                  <ul>
                    <li>
                      <a
                        href="https://us.store.codesys.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                      >
                        https://us.store.codesys.com/
                      </a>
                    </li>
                  </ul>
                  <li>Login to the website.</li>
                  <li>Click on the "Details" button.</li>
                </ul>
                </p> 
                <img
                  src={image4}
                  alt="screenshot 4"
                  style={{
                    width: "75%",
                    height: "325px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "7%",
                  }}
                />
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                <ul>
                  <li>Click on the Versions tab.</li>
                </ul>
                </p>
                <img
                  src={image5}
                  alt="screenshot 5"
                  style={{
                    width: "75%",
                    height: "425px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "7%",
                  }}
                /> 
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                <ul>
                  <li>Scroll down and click on the 32-bit version of 3.5.17.0.  Note the project is written with a 32 bit library which is why the 32 bit version is required. </li>
                </ul>
                </p> 
                <img
                  src={image6}
                  alt="screenshot 6"
                  style={{
                    width: "70%",
                    height: "275px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "10%",
                  }}
                /> 
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                <ul>
                  <li>Accept the terms</li>
                  <li>The sofftware will download</li>
                  <li>Run the installer and start the installation
                  <ul>
                    <li> When prompted, select Complete.
                    </li>
                  </ul>
                  </li>
                </ul>
                </p>
                <img
                  src={image7}
                  alt="screenshot 7"
                  style={{
                    width: "60%",
                    height: "350px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "14%",
                  }}
                />
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                <ul>
                  <li>Complete the installation process. </li>
                </ul>
                </p>             
              </section>

              <section>
                <h3 className="mt-4"> 
                <strong style={{ color: "var(--custom-blue)" }}>WireShark </strong>
                </h3>  
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                Download the lates stable release of Wireshark from{" "}
                  <a
                    href="https://www.wireshark.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                    https://www.wireshark.org/
                  </a>
                  .
                </p>
              </section>
              <Quiz questions={lab0QuizQuestions} />
              <FillInTheBlank questions={lab0FillInQuestions} />
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab0Page;