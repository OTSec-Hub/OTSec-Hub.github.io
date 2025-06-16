import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab2pic.webp";
import part1step2Image from "../images/lab2_Items/part1-step2.png"
import part1step4Image from "../images/lab2_Items/part1-step4.png"
import part1step5Image from "../images/lab2_Items/part1-step5.png"
import part2step2Image from "../images/lab2_Items/part2-step2.png"
import part2step3Image from "../images/lab2_Items/part2-step3.png"
import part2step4Image from "../images/lab2_Items/part2-step4.png"
import part2step6Image from "../images/lab2_Items/part2-step6.png"
import part2step7Image from "../images/lab2_Items/part2-step7.png"

const Lab2Page = () => {
  React.useEffect(() => {
    updateTitle("lab2 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 2 - Programmable Logic Controller programming" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 2"
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
                <strong style={{ color: "var(--custom-blue)" }}>LAB 2: PROGRAMMABLE LOGIC CONTROLLER PROGRAMMING </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                The goal of this assignment is to better understand an <strong style={{ color: "var(--custom-blue)" }}>industrial control system (ICS)</strong> and gain hands-on experience with <strong style={{ color: "var(--custom-blue)" }}>Codesys</strong>. 
                Codesys is a development environment for programming controller applications. The same water desalination process used in lab 1 
                will be demonstrated in this lab.
                  <br /><br />
                  This assignment is broken into two parts:
                  <br /><br />
                <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                  <li> <strong style={{ color: "var(--custom-blue)" }}>Part I: </strong>You will open the <strong style={{ color: "var(--custom-blue)" }}>Lab 2 file (MSFcascade)</strong> and generate <strong style={{ color: "var(--custom-blue)" }}>PLC code for the subsystem </strong>
                  at the bottom of the PLC. This results in creation of a file which can be imported into Codesys and worked on.
                  </li>
                  <li> <strong style={{ color: "var(--custom-blue)" }}>Part II: </strong>Import the PLC code generated in <strong style={{ color: "var(--custom-blue)" }}>Part I </strong>and execute it. You will learn about PLC code 
                  generation, importing it into Codesys, and running it as well as altering the code and seeing the changes in the emulation. This assignment requires students 
                  to answer some questions on Brightspace and submit a write-up. Reports will be due for the second part of this project.
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
                SET UP
                </h4>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                  <li> In addition to Matlab, which you already used for the previous assignment, you will need to download and use <strong style={{ color: "var(--custom-blue)" }}>Codesys</strong>. The other files required are provided in the Lab 2 folder.
                  </li>
                  <li>
                  Download the Lab 2 folder and unzip it:{" "}
                  <a
                  href="/labMaterials/lab2-Materials/LAB 2-20210723T184048Z-001.zip" // Replace with actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                 LAB 2-20210723T184048Z-001.zip
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
                <h4 style={{ fontWeight: "bold",display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  PART I
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Follow the steps below to generate PLC code for the subsystem. It should take you <strong>10-20 minutes</strong> to complete (estimated time excluding software download). 
                </p>

                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Go to <strong>LAB 2/Simulation/msf-thermal-desalination-plant-PLC</strong> and open the file <strong>MSFcascade (Simulink Model)</strong>. 
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Go to <strong>Model Settings</strong> under the <strong>Modelling tab</strong>.  Make sure the Target IDE is set to <strong>“3S CoDeSys 3.5”</strong>.  The Target IDE path should point to the directory that your 
                Codesys application is installed within, the default is C:\Program Files (x86)\CODESYS 3.5.17.0.  Lastly, make sure that <strong>“Generate testbench for subsystem”</strong> and 
                <strong>“Include testbench diagnostic code”</strong> are checked. Then click “Apply.” 
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
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Click on Apps and PLC Coder to bring out the PLC Code tab at the top.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Make sure the <strong>control system at the bottom</strong> of the model is <strong>selected</strong> and click on Generate <strong>PLC Code</strong> at the top under the PLC Code tab. 
                </p>
              <img
                src={part1step4Image}
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
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Your model should look like the image below. If there’s an error while generating the code, delete <strong>plcsrc (in the folder you are working on)</strong> and follow the above steps again. 
                If the error persists, use the plcsrc provided in the <strong>Codesys folder inside Lab 2</strong> for further steps in Part II.
                </p>
              <img
                src={part1step5Image}
                alt="Step 5 screenshot"
                style={{
                  width: "80%",
                  height: "435px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
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
              <section className="mt-4">
                <h4 style={{ fontWeight: "bold",display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem"}}>
                  PART II
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Follow the steps below to complete the lab 2 activities. It will take approximately <strong>30-50 minutes</strong> to complete. 
                </p>

                <h4 style={{ fontWeight: "bold" }}>
                  STEP 1
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Open Codesys and start a new project. Select <strong>“standard project”</strong> and create a folder named <strong>“Solution” in Lab 2 folder</strong> to start the project in that.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 2
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Make sure <strong>PLC_PRG</strong> is set to <strong>Structured Text</strong>.  
                </p>
              <img
                src={part2step2Image}
                alt="Step 2 screenshot"
                style={{
                  width: "80%",
                  height: "325px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 3
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                In the left panel "Devices", click on "Application" to select it.  Go to <strong>“Project”</strong> in the top bar and select <strong>import PLCcodeXML</strong>. 
                Open <strong>Lab 2/Codesys/plcscr/MSFcascade.xml</strong> and import all the objects. 
                </p>
                <img
                  src={part2step3Image}
                  alt="Step 3 screenshot"
                  style={{
                    width: "50%",
                    height: "600px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "17%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 4
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Make sure that the objects on the left look like this after you are done importing them.
                </p>
                <img
                  src={part2step4Image}
                  alt="Step 4 screenshot"
                  style={{
                    width: "50%",
                    height: "450px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "17%",
                  }}
                />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 5
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                <strong>NOTE: If you cannot find the objects i.e. TestBench, MainTB and Control, use the Codesys project provided in Lab2/Codesys/Control System, which is already set up for you. </strong>
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 6
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Double click on the <strong>TestBench(FB)</strong> to open it in a tab. Delete <strong>PLC_PRG</strong> from the application and main 
                task if it exists, and drag-and-drop mainTB to main task for execution. (Look at the following image for reference)
                </p>
              <img
                src={part2step6Image}
                alt="Step 6 screenshot"
                style={{
                  width: "80%",
                  height: "450px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "5%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 7
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Start Plc from the <strong>“Codesys Control Win sysTray”</strong> present in the <strong>System tray (hidden icons)</strong> at the bottom right of your windows.
                <br /><br />
                If some issues arise during this,{" "}
                  <a
                  href="https://www.helpme-codesys.com/help-sp17-lower.html" // Replace with actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                 please refer to the FAS's here.
                </a>
                {/*need an updated link for the referal link*/}
                </p>
              <img
                src={part2step7Image}
                alt="Step 7 screenshot"
                style={{
                  width: "70%",
                  height: "200px",
                  objectFit: "fill",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  marginLeft: "11%",
                }}
              />
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 8
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Double click on Device to open the configuration. Click on <strong>Scan Network</strong> at the top.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 9
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Click on your device prompted on the scan network screen.  If you do not see a device in the listing, uncheck the box labeled 
                "Hide non-matching devices, filter by Target ID".  If you have to uncheck this box you will need to upgrade the device in the list.  
                Do this by double-clicking the device in the list and clicking "Yes" in the next dialog box, you will return to the beginning of this 
                step and should now be able to select the upgraded device.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 10
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                You will be prompted to add a device user. Input the credentials you desire. Username as <strong>“admin”</strong> and password as <strong>“admin”</strong> should work.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 11
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Once you set the credentials, you should be prompted to login automatically. If not, then go to Online from the top bar and login. 
                If it asks you to set up an active path, click ok. Download the latest version when prompted,  Run the testbench using the play button 
                on the top. (Make sure you are on the TestBench tab).   If the play button is grayed out you need to login.  When you click play the 
                emulation should run and you should see changes on the testbench tab.
                </p>
                <h4 style={{ fontWeight: "bold" }}>
                  STEP 12
                </h4>
                <p style={{ fontSize: "1.1rem", marginBottom: "1rem", maxWidth: "800px"}}>
                Using your knowledge acquired from playing around with the model, write a brief report (<strong>maximum 3 pages</strong>) addressing:
                <ul style={{ fontSize: "1.1rem", paddingLeft: "2.25rem" }}>
                  <li>
                  Alter the code to find the value of Ws when the test cycle number is 1000 and 1500? Specify in the report the values and how you got them. 
                  </li>
                  <li>
                  Identify the connection between the two softwares used for this lab and how do they interact with each other. If you make certain changes in 
                  Simulink model before converting it into a PLC, will those changes be reflected in Codesys? If Yes, make some changes and show how they are reflected. 
                  </li>
                </ul>
                </p>
{/*                <Card>
                  <CardHeader>Step 3: Generating PLC Code</CardHeader>
                  <CardContent>
                    <p>After selecting the subsystem, you should click:</p>
                    <Question
                      type="multiple-choice"
                      question="Where do you click to generate PLC code?"
                      options={["Apps > Simulation", "PLC Code tab", "Diagnostics Tab", "Project > Build"]}
                      answer="PLC Code tab"
                    />
                  </CardContent>
                </Card>*/}
              </section>
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Lab2Page;