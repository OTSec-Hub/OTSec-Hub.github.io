import React from "react";
import BackToTop from "../components/BackToTop";
import { updateTitle } from "../utils";
import Quiz from "../components/Quiz";
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab0_Items/lab0.webp";
import image1 from "../images/lab0_Items/pic1.png";
import image2 from "../images/lab0_Items/pic2.png";
import image3 from "../images/lab0_Items/pic3.png";
import image4 from "../images/lab0_Items/pic4.png";
import image5 from "../images/lab0_Items/pic5.png";
import image6 from "../images/lab0_Items/pic6.png";
import image7 from "../images/lab0_Items/pic7.png";
import { useParams } from "react-router-dom";

const lab0QuizQuestions = [
  {
    id: 1,
    question: "What is the minimum amount of free disk space recommended for installing the required lab software?",
    options: ["10 GB", "20 GB", "40 GB", "100 GB"],
    correct_answer: "40 GB",
  },
  {
    id: 2,
    question: "Which MATLAB tools must be installed to complete all labs?",
    options: [
      "Simulink and Data Acquisition Toolbox",
      "Simulink and Simulink PLC Coder",
      "Simulink only",
      "No add-ons are needed",
    ],
    correct_answer: "Simulink and Simulink PLC Coder",
  },
  {
    id: 3,
    question: "Why can’t the online version of MATLAB be used for this course?",
    options: [
      "It is a paid service",
      "It does not support all required features",
      "It is too slow for simulations",
      "It’s not compatible with Windows",
    ],
    correct_answer: "It does not support all required features",
  },
  {
    id: 4,
    question: "What version of CODESYS is required for the labs?",
    options: [
      "Latest version (any)",
      "Version 3.5.17.0 (32-bit)",
      "Version 3.5.20.0 (64-bit)",
      "Web-based version",
    ],
    correct_answer: "Version 3.5.17.0 (32-bit)",
  },
];

const Lab0Page = ({labId}) => {

  React.useEffect(() => {
    updateTitle("Lab 0 | OTSec-Hub.io");
  }, []);
  
  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 0 - Installing Course Software" />
        </Container>

        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "20%" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  In order to complete the Lab Assignments, you need to download and use several applications on a Windows PC
                  (this can be a virtual machine) with about 40 GB of free space. Both applications need to be installed on the same system.
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
                  <strong style={{ color: "var(--custom-blue)" }}>MATLAB, Simulink and Simulink PLC Coder</strong>
                </h3>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Note: MATLAB offers an online version of the software, this will not work with all of the labs in this course.
                </p>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                  <strong style={{ color: "var(--custom-blue)" }}>CODESYS</strong>
                </h3>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  <ul>
                    <li>Scroll down and click on the 32-bit version of 3.5.17.0. Note the project is written with a 32 bit library which is why the 32 bit version is required.</li>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  <ul>
                    <li>Accept the terms</li>
                    <li>The software will download</li>
                    <li>Run the installer and start the installation
                      <ul>
                        <li>When prompted, select Complete.</li>
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
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  <ul>
                    <li>Complete the installation process.</li>
                  </ul>
                </p>
              </section>

              <section>
                <h3 className="mt-4">
                  <strong style={{ color: "var(--custom-blue)" }}>WireShark</strong>
                </h3>
                <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
                  Download the latest stable release of Wireshark from{" "}
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
              <Quiz questions={lab0QuizQuestions} labId={labId} mode="lab" />
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab0Page;

// # Lab 0 - Installing Course Software

// ![image](https://res.cloudinary.com/mano22/image/upload/v1753985319/lab0_anrl18.webp)

// > In order to complete the Lab Assignments, you need to download and use several applications on a Windows PC (this can be a virtual machine) with about **40 GB of free space**. Both applications need to be installed on the same system.

// ---

// ## MATLAB, Simulink and Simulink PLC Coder

// You should first install **MATLAB**. A licensed version of MATLAB is provided by NYU and can be downloaded from the [NYU Software Library](https://www.nyu.edu/life/information-technology/computing-support/software/software/matlab.html).

// > ⚠️ **Note:** MATLAB offers an online version of the software. This will **not work** with all of the labs in this course.

// 1. Create a new account on the MATLAB portal using your **NYU email**.  
// 2. This grants you a **special license** as a member of New York University.
// 3. Make sure you have this account information and your **NYU Net ID** during the installation — you will need them multiple times.

// Once registered, download the installer for the **latest version of MATLAB** and install it.

// ![Screenshot 1](https://res.cloudinary.com/mano22/image/upload/v1753985314/pic1_qynpbw.png)

// During configuration:
// - Check **Simulink** (2nd item on the list).
// - Check **Simulink PLC Coder** to install them.

// If you already have the latest MATLAB installed but are missing the add-ons, simply repeat the installation and select **Simulink** and **Simulink PLC Coder**.

// ![Screenshot 2](https://res.cloudinary.com/mano22/image/upload/v1753985316/pic2_gxr2v4.png)  
// ![Screenshot 3](https://res.cloudinary.com/mano22/image/upload/v1753985319/pic3_jflulo.png)

// ---

// ## CODESYS

// **CODESYS** can be downloaded from [CODESYS Store](https://us.store.codesys.com/) by creating an account using your **NYU email** (create an _Individual Customer Account_).

// ### To install **CODESYS 3.5.17.0**, follow these steps:

// > 🧠 This process assumes that CODESYS is **not installed** on the target system.

// 1. Visit: [https://us.store.codesys.com/](https://us.store.codesys.com/)
// 2. Login to the website.
// 3. Click the **"Details"** button.

// ![Screenshot 4](https://res.cloudinary.com/mano22/image/upload/v1753985316/pic4_ztryrt.png)

// 4. Click on the **Versions** tab.

// ![Screenshot 5](https://res.cloudinary.com/mano22/image/upload/v1753985317/pic5_hvcugt.png)

// 5. Scroll down and click on the **32-bit version of 3.5.17.0**.  
//    > 📌 The project uses a 32-bit library, so **32-bit version** is required.

// ![Screenshot 6](https://res.cloudinary.com/mano22/image/upload/v1753985319/pic6_txht8v.png)

// 6. Accept the terms.
// 7. Download the software.
// 8. Run the installer and begin the installation.
// 9. When prompted, choose **Complete Installation**.

// ![Screenshot 7](https://res.cloudinary.com/mano22/image/upload/v1753985320/pic7_rqlgnr.png)

// 10. Complete the installation process.

// ---

// ## Wireshark

// Download the **latest stable release** of Wireshark from [https://www.wireshark.org/](https://www.wireshark.org/).
