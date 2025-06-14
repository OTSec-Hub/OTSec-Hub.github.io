import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab6_Items/lab6.webp";
import image1 from "../images/lab6_Items/part1-image1.png"
import image2 from "../images/lab6_Items/step1.png"
import image3 from "../images/lab6_Items/step1,2.png"
import image4 from "../images/lab6_Items/step1,3.png"
import image5 from "../images/lab6_Items/step1,4.png"
import image6 from "../images/lab6_Items/step1,5.png"
import image7 from "../images/lab6_Items/step1,6.png"
import image8 from "../images/lab6_Items/step1,7.png"
import image9 from "../images/lab6_Items/step2,1.png"
import image10 from "../images/lab6_Items/step2,2.png"
import image11 from "../images/lab6_Items/step2,3.png"
import image12 from "../images/lab6_Items/step2,4.png"
import image13 from "../images/lab6_Items/step2,5.png"
import image14 from "../images/lab6_Items/step2,6.png"
import image15 from "../images/lab6_Items/step2,7.png"

const Lab6Page = () => {
  React.useEffect(() => {
    updateTitle("lab6 | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Lab 6 - PLC Binary Reverse Engineering" />
        </Container>

        <Container>
          <div className="row">
            {/* Left column: Main Content */}
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              {/* Image Placeholder */}
              <img
                src={image}
                alt="Lab 6"
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
                <strong style={{ color: "var(--custom-blue)" }}>LAB 6 </strong>
                </h3>
                <p style={{ fontSize: "1.1rem",maxWidth: "800px" }}> 
                The goal of this lab is to use tools for crafting a process-aware cyber attack.
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
                PART I: PREPARATION
                </h4>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Process Aware Attacks:{" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                Beyond traditional forms of cyber attacks, such as wipers, spyware, and ransomware, 
                ICS have become the targets of sophisticated process aware attacks in which the attackers 
                have some knowledge of the underlying controlled process that aids them with their goals. 
                Such goals can be to stealthily cause financial damages by reducing the process operating efficiency, 
                or even outright destroying components and causing physical damages. An example of such an attack is Stuxnet, 
                in which the attackers understood the operation of uranium enrichment centrifuges and modified the control 
                logic of the PLCs controlling them to damage them.
                </p>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Proportional-Integral-Derivative (PID) Controllers:{" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                PID controllers are a feedback based control loop mechanism that is widely used in ICS processes, 
                and a plethora of other applications that require continuous modulation. Given a time-varying 
                quantity <strong>y(t)</strong> that we observe and want to control, and the desired setpoint value that we want 
                it to have <strong>r(t)</strong>, a PID controller first calculates the error value <strong>(t) = y(t) - r(t)</strong>. Then 
                the controller calculates the control signal <strong>u(t)</strong> based on <strong>e(t)</strong> and the Proportional (<strong>P</strong>)
                , Integral (<strong>I</strong>), and Derivative (<strong>D</strong>) parameters of the controller. These parameters are tuned according to the 
                properties of the quantity that we want to control.
                </p>
                <img
                  src={image1}
                  alt="Proportional-Integral-Derivative (PID) Controllers"
                  style={{
                    width: "75%",
                    height: "250px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "9%",
                  }}
                />
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                An empirical example to intuitively understand the logic behind the PID controller would be adjusting 
                the running water temperature in your home. When you initially open the faucet you continuously sense the 
                temperature of the water, which is what you want to control <strong>y(t)</strong>. In your mind you have a specific temperature 
                that you want to reach r(t). Knowing this you estimate how far away the current temperature is from the desired 
                one <strong>e(t)</strong>. Based on this you calculate by how much you need to turn the faucet <strong>u(t)</strong> to reach the desired temperature.
                </p>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>ICS Reverse Engineering Framework (ICSREF):{" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                ICSREF is a modular framework developed by MoMA Lab that automates the reverse engineering process of Codesys 
                binaries compiled with the Codesys v2 compiler. Among other things, the framework allows the user with access 
                to just the compiled binary and no source code, to identify function calls and known libraries, extract static 
                arguments passed to functions, plot call graphs, and modify and repackage the control binary so that it passes 
                integrity checks. ICSREF is open source and available on Github:
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                  <a
                    href="https://github.com/momalab/ICSREF"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                    https://github.com/momalab/ICSREF
                  </a>
                   {" "}and the academic publication describing it can be found at:{" "}
                  <a
                    href="https://www.ndss-symposium.org/ndss-paper/icsref-a-framework-for-automated-reverse-engineering-of-industrial-control-systems-binaries/ "
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                    https://www.ndss-symposium.org/ndss-paper/icsref-a-framework-for-automated-reverse-engineering-of-industrial-control-systems-binaries/.
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
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                PART II: Developing a process-aware attack
                </h4>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Overview:{" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                In this part we will use the desalination model from Lab 1. We will provide a cascading PID controller 
                setup which is part of the same model to demonstrate how PLC control logic is implemented by the control engineer 
                (similar to how you created code in Lab 2). Afterwards, we will assume the role of the attacker, and use the 
                simulation to see how the desalination process behaves with respect to process aware attacks to the parameters 
                of the implemented controllers. As adversaries we will then assume that we have compromised the ICS network, 
                and managed to extract the control logic binary from the PLC in operation. Lacking source code access, we will 
                use ICSREF to reverse engineer the binary, and prepare a process aware attack payload for real-life deployment.
                </p>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Step 1: MSF Desalination (refresher){" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                This section repeats some of the steps of Lab 1 for refresher purposes. First open Matlab and then navigate to the directory of the provided simulation model{" "}
                  <a
                    href="/labMaterials/lab6-Materials/msf-thermal-desalination-plant-LAB.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                  (msf-thermal-desalination-plant-LAB.- Download Zip File)
                  </a>
                </p>
                <img
                  src={image2}
                  alt="step 1.1"
                  style={{
                    width: "75%",
                    height: "400px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "9%",
                  }}
                />
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                From the left-side pane double-click on the <strong>MSFcascade.mdl</strong> Simulink model to open the simulation.
                </p>
                <img
                  src={image3}
                  alt="step 1.2"
                  style={{
                    width: "75%",
                    height: "500px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "9%",
                  }}
                />
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                Here we can see the simulation block diagram. The majority of the process simulation and control logic is abstracted 
                in the main Multi Stage Flash Desalination block. However, two of the PID loops (yellow boxes) used to control the 
                process are exposed to allow for easy inspection. Their setpoints can be seen near them in light blue boxes. When 
                double clicking the yellow boxes we can inspect their PID parameters. As process engineers seeking to implement 
                these PID loops on PLC hardware we should take note of the PID and corresponding setpoint values.
                </p>
                <img
                  src={image4}
                  alt="step 1.3"
                  style={{
                    width: "75%",
                    height: "500px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "9%",
                  }}
                />
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                We can open the TB0 (Initial Brine Temperature, degrees Celsius), and Wd (Distillate product flow rate, 
                  tons per minute) monitors (red boxes) by double clicking on them, and then starting the simulation by clicking 
                the green run button to monitor its outputs.
                </p>
                <img
                  src={image5}
                  alt="step 1.4"
                  style={{
                    width: "90%",
                    height: "325px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "2%",
                  }}
                />
                <p style={{fontSize: "1.1rem",maxWidth: "800px"}}>
                As can be observed from the monitors, the process reaches its desired steady state and the two variables fluctuate around 
                their desired setpoints. Note that the fluctuation is due to the inherent presence of noise in the industrial process.
                </p>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Information: Creating the Control Logic Binary (refresher){" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                To program the control logic of these two PID controllers on a PLC we would use a PLC Programming environment 
                (similar to what you done in Lab 2). <strong>However, since you already went through Lab 2, this step is skipped and information 
                is provided here only for educational purposes to help you create the process aware attack</strong>. A precompiled binary will be provided.
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                As demonstration, we show how to use the IDE where we will implement the PLC loops in Structured Text (ST) code. When creating a new project 
                in the IDE ignore the option for a target for now and in the “New POU” prompt select Program as the type, and ST as the Language of the 
                Program Organization Unit (POU).
                </p>
                <img
                  src={image6}
                  alt="step 1.5"
                  style={{
                    width: "80%",
                    height: "425px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "5%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                This will create PLC_PRG, which will be the entry point for our control logic, and open its editor. Ignore the editor for now 
                and let us configure the Global Variables for the PLC Inputs and Outputs. By double clicking the Global_Variable list in the 
                Resources Tab, the editor comes up. There we will create the global variables of type WORD accordingly. When compiling the project 
                for a specific PLC, the process engineer would also point these variables to specific positions in memory.
                </p>
                <img
                  src={image7}
                  alt="step 1.6"
                  style={{
                    width: "70%",
                    height: "300px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "9%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                Once we are done with this, we will open the Library Manager from the Resources tab and add the Util Library which 
                contains the PID controller code.
                </p>
                <img
                  src={image8}
                  alt="step 1.7"
                  style={{
                    width: "75%",
                    height: "600px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "6.5%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                Finally, we are ready to return to PLC_PRG and write our code. In the upper part of the editor we statically register the variables 
                related to our PID loops, while on the lower part we insert the dynamic part of our code which routes the input through our 
                PID loops and then writes the result to the WS_Output variable. To compile the PLC binary just run the Build functionality in the 
                Project menu. <strong>The precompiled binary is named Desalination_WIO.PRG</strong> (
                  <a
                    href="/labMaterials/lab6-Materials/Desalination_WIO.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                  Download Zip File
                  </a>
                  ).
                </p>
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                <span style={{ color:"var(--custom-blue)"}}>Step 2: Reverse Engineering the PLC binary{" "}</span> 
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                We will now assume the role of the adversary. We assume that we have found a way to enter the internal network of the desalination 
                plant (e.g: by using stolen VPN credentials), and have extracted the .PRG binary file on the PLC that we want to control. With no 
                access to the source code, and having some basic knowledge of the ICS process, we set out to attack the desalination plant to damage 
                its equipment.
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                In order to attack the PLC we will have to first reverse engineer its binary using ICSREF to better understand what it does. 
                Therefore, ICSREF must be installed on a Linux machine following instructions at the github page:{" "}
                  <a
                    href="https://github.com/momalab/ICSREF"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                  https://github.com/momalab/ICSREF
                  </a>
                  {" "}and{" "}
                  <a
                    href="https://github.com/momalab/ICSREF/blob/master/INSTALL.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                  >
                  https://github.com/momalab/ICSREF/blob/master/INSTALL.md
                  </a>
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                ICSREF is built atop Python 2.7 and will require the use of a virtual machine (VM) based on Ubuntu 22.04 LTS.  
                This process will only run on a PC or Mac(with Intel chip), it does not support Apple Silicon M series chipsets.  
                Building the VM may be possible on Apple Silicon by using UTM but this is not tested and as of this writing will probably not work.
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                Building the VM:
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                  <ul>
                    <li>Download Ubuntu 22.04 LTS ISO</li>
                      <ul>
                        <li>
                          <a href="https://releases.ubuntu.com/jammy/ubuntu-22.04.5-desktop-amd64.iso" target="_blank" rel="noopener noreferrer" style={{ color: "var(--custom-blue)", textDecoration: "underline" }}>
                            https://releases.ubuntu.com/jammy/ubuntu-22.04.5-desktop-amd64.iso
                          </a>
                        </li>
                      </ul>
                    <li>Create a new VM in Virtual Box using the ISO downloaded previously:</li>
                      <ul>
                        <li>You can setup unattended install and set the username and password for the VM.</li>
                        <li>Setup the hardware for 2 CPU, 8 GB or RAM and 25 GB of hard disk (in Hardware and Hard Disk).</li>
                        <li>Networking:</li>
                        <ul>
                            <li>Note:  Networking should default to NAT, which is OK for the lab.</li>
                            <li>Note the VM will need Internet access for the download of packages and access to the GitHub.</li>
                        </ul>
                        <li>Click Finish.</li>
                        <li>Start VM to start the installation</li>
                        <li>Ubuntu will install</li>
                      </ul>
                    <li>Add Virtual Box Guest Additions to enable copy/paste and other drivers.</li>
                      <ul>
                        <li>Under Devices menu, select Insert Guest Additions CD Image... </li>
                        <li>The CD will appear in Ubuntu on the desktop.</li>
                        <li>Open a terminal window</li>
                        <li>To change to the root user type:  su - </li>
                        <li>In a terminal window cd to /media. </li>
                        <li>A directory with your username created during installation should exist, cd into that directory. </li>
                        <li>The directory should contain the mounted Guest Additions CD, cd into that directory.</li>
                        <li>To install Guest Additions:  ./VBoxLinuxAdditions.run </li>
                        <li>Once completed, restart the VM to ensure all of the guest additions function properly.</li>
                      </ul>
                    <li>Add the user account created during installation to the sudoers group</li>
                      <ul>
                        <li>su - </li>
                        <li>Create a file in /etc/sudoers.d, you can name it sudoers </li>
                        <li>Edit the file to add the following line to the file, change the username to the username created during installation.</li>
                        <ul>
                          <li>username  ALL=(ALL) NOPASSWD:ALL </li>
                        </ul>
                      </ul>
                    <li>Install ImHex:</li>
                      <ul>
                        <li>Download from here:{" "} 
                          <a 
                            href="https://github.com/WerWolv/ImHex/releases/download/v1.32.1/imhex-1.32.1-Ubuntu-22.04-x86_64.deb"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                          >
                            https://github.com/WerWolv/ImHex/releases/download/v1.32.1/imhex-1.32.1-Ubuntu-22.04-x86_64.deb
                          </a>
                        </li> 
                        <li>cd into the Downloads directory </li>
                        <li>Install using this command:  sudo apt install ./imhex-1.32.1-Ubuntu-22.04-x86_64.deb</li>
                      </ul>
                    <li>Prepare the VM for ICSREF</li>
                      <ul>
                        <li>Install curl: </li>
                        <ul>
                          <li>sudo apt install curl</li>
                        </ul>
                        <li>Install wheel a Python PIP package manager:</li>
                        <ul>
                          <li>sudo apt install python2-pip-whl</li>
                        </ul>
                      </ul>
                    <li>To install ICSREF continue with the steps here:{" "}
                      <a 
                        href="https://github.com/momalab/ICSREF/blob/master/INSTALL.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                      >
                        https://github.com/momalab/ICSREF/blob/master/INSTALL.md
                      </a>
                      <ul>
                        <li>Note:  At Step 10, modify the command to install ICSREF to this:  pip2.7 install --no-index --find-links=ICSREF/wheelhouse -r ICSREF/requirements.txt</li>
                      </ul>
                    </li>
                    <li>Note:  If you need to move files to and from the VM it may be necessary to use File Manager under the Machine menu in Virtual Box.</li>
                    <li>Download the precompiled binary from here:{" "}
                      <a 
                        href="/labMaterials/lab6-Materials/Desalination_WIO.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                      >
                        Download Zip File
                      </a>
                      . Unzip and store the files in the ICSREF directory within the home directory.
                    </li>
                  </ul>
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                After installing ICSREF, we first activate the python virtual environment and then execute 
                ICSREF. When the ICSREF prompt loads, we can instruct it to analyze the <strong>Desalination_WIO.PRG</strong> binary.  
                Note:  The directory and program file name may be different on your system.
                </p>
                <img
                  src={image9}
                  alt="step 2.1"
                  style={{
                    width: "75%",
                    height: "300px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "6.5%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                When the initial analysis has concluded we can search for PID loops inside the binary by 
                issuing the <strong>exp_pid_match</strong> command, and then the <strong>pidargs</strong> command.
                </p>
                <img
                  src={image10}
                  alt="step 2.2"
                  style={{
                    width: "75%",
                    height: "300px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "6.5%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                As we can see from the output, ICSREF has located two PID functions in the control logic binary. 
                To better understand the call procedures we can issue the <strong>graphbuilder</strong> command which builds the graph that 
                can be found in under the results subdirectory in the user's home directory(with a <strong>.svg</strong> extension). You can 
                open this graph using a web browser.
                </p>
                <img
                  src={image11}
                  alt="step 2.3"
                  style={{
                    width: "85%",
                    height: "425px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "2%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                In the graph we notice that there are two subroutines that make the calls to the PID functions. Namely <strong>sub_211c</strong> and <strong>sub_1d94</strong>. 
                Let’s focus on <strong>sub_211c</strong> and see how it looks when disassembled by clicking on the sub_211c box. While scrolling through the assembly 
                instructions we notice something interesting. Before the call to exp_maybe_PID which ICSREF indicates is the PID() function, there is 
                data being loaded into Register 8 (r8) from the address 0x2364. We suspect that these must be the function arguments passed to PID().
                </p>
                <img
                  src={image12}
                  alt="step 2.4"
                  style={{
                    width: "90%",
                    height: "125px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "1%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                To confirm we have to inspect the Desalination_WIO.PRG binary using a hex editor. We load the binary into ImHex and search 
                the area near 0x2360 using 4 byte increments. We are able to locate the P and I values at 0x2374 and 0x2370 respectively. 
                Confirm by entering the values into a float-hex converter with the big-endian setting:{" "}
                <a 
                  href="https://gregstoll.com/~gregstoll/floattohex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--custom-blue)", textDecoration: "underline" }}
                >
                  https://gregstoll.com/~gregstoll/floattohex/
                </a>
                </p>
                <img
                  src={image13}
                  alt="step 2.5"
                  style={{
                    width: "85%",
                    height: "500px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "4%",
                  }}
                />
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", marginTop: "1rem", maxWidth: "800px"}}>
                  <span style={{ color:"var(--custom-blue)"}}>Step 3: Crafting the payload</span> 
                </p>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                Because we are impatient adversaries who just want to see our simulated desalination plant burn, we are not going to 
                craft a stealthy and subtle attack that causes long term damage. We will instead cause a drastic anomaly that will 
                trigger the plant’s safety systems and cause it to shutdown. We can do this with many creative ways, for example by 
                boosting the Integral part of the second PID controller from 10 to 10000. You can understand the effects this will have 
                on the process variables by making this change while the Simulink model is running, and observing the changes in the TB0 
                and Wd monitors. In the report please describe which process aware attack you chose and why.
                </p>
                <img
                  src={image14}
                  alt="step 2.6"
                  style={{
                    width: "75%",
                    height: "275px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "6.5%",
                  }}
                />
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                To change the I value of the binary we just use ImHex and change 0x00002041 at 0x2370 to 0x00401c46 and save it. 
                We confirm our changes have been made correctly by analyzing it again using ICSREF. Our payload is now ready for deployment.
                </p>
                <img
                  src={image15}
                  alt="step 2.7"
                  style={{
                    width: "75%",
                    height: "275px",
                    objectFit: "fill",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    marginLeft: "6.5%",
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
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                DELIVERABLES
                </h4>
                <p style={{fontSize: "1.1rem", maxWidth: "800px"}}>
                Create a report describing the following:
                <ul>
                  <li>From Step 1, capture a screenshot showing both TB0 and Wd monitors in Matlab Simulink.</li>
                  <li>From Step 2, discuss which attack you chose to perform, a screenshot of ICSREF showing the 
                  changed parameters of your payload, and a screenshot of the TB0 and Wd monitors showing how these 
                  two variables change when you modify the process parameters (I and or P). </li>
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

export default Lab6Page;