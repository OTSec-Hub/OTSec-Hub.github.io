

// Components
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
// Utils
import { updateTitle } from "../utils";
// Styles
import { Container } from "react-bootstrap";
import React from "react";


const Exercise001 = () => {
  React.useEffect(() => {
    updateTitle("exercise-001 | OTSec-Hub.io");
  }, []);

const navLinkStyle = {
  background: "none",
  border: "none",
  color: "var(--custom-blue)",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.3s ease",
  fontSize: "1rem",
  fontFamily: "inherit",
  outline: "none",
};


// const navLinkHoverStyle = {
//   backgroundColor: "var(--custom-blue)",
//   color: "white",
// };


function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// function NavLink({ children, onClick }) {
//   return (
//     <button className="nav-link" onClick={onClick} type="button">
//       {children}
//     </button>
//   );
// }


  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Chemical Sector Cyber Tabletop Exercise" />
        </Container>

        <Container className="d-flex justify-content-center mb-4">
        <nav>
          <button style={navLinkStyle} onClick={() => scrollToId("module1")}>Module 1</button>
          <span style={{ margin: "0 1rem" }}>|</span>
          <button style={navLinkStyle} onClick={() => scrollToId("module2")}>Module 2</button>
        </nav>
{/*        <nav>
          <NavLink onClick={() => scrollToId("module2")}>Module 2</NavLink>
        </nav>*/}
        </Container>

        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section id="module1">
              <br />
                <h2 style={{ color: "var(--custom-blue)",textAlign: "center" }}>MODULE ONE: THREAT</h2>
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  Scenario
                </h4>
                <p><strong>[Insert Location]</strong></p>
                <p><strong>[Insert Month, Day, Year]: [Time]</strong></p>
                <p>
                  The <strong>[insert name of state or regional]</strong> Fusion Center has received updated intelligence 
                  analysis bulletins that express concern about the growing sophistication of and cooperation among 
                  groups involved in environmental, cyber, and economic terrorism.
                </p>
                <p>
                  The U.S. Department of Homeland Security (DHS) Industrial Control Systems Cyber Emergency Response Team 
                  (ICS-CERT) issues an alert stating that a software programmer has developed computer malware, which 
                  exploits a specific vulnerability, and can replicate itself over networks with vulnerable systems.
                </p>
                <p>
                  This malware appears to be very similar to Stuxnet, initially spreading indiscriminately; however, it 
                  is determined that this new malware includes a highly specialized payload that is designed to only 
                  target <strong>[insert your facility’s SCADA software program, i.e., Siemens]</strong> SCADA systems that 
                  are configured to control and monitor <strong>[insert your facility’s specific industrial processes]</strong>.
                </p>
                <p>
                  The programmer deployed this malware on the open Internet without any particular target in mind, only 
                  the goal of maximum infection.
                </p>
                <p>The media is reporting a cybersecurity scare of potential global proportions.</p>
                <p>
                  Several employees of <strong>[insert your facility name]</strong> use a company-owned laptop outside of 
                  the physical workspace. In particular, one employee frequently connects to a wireless network hotspot at 
                  a local coffee shop to check his / her social media accounts and personal email before work.
                </p>
              </section>

              <section>
              <br /> <br />
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  Discussion Questions
                </h4>
                <br /> <br />
                <h4
                  style={{
                    fontStyle: "italic",
                    fontWeight: "normal",
                    display: "inline",
                    color: "var(--custom-blue)",
                    fontSize: "1.3rem",  // smaller font size
                    marginBottom: "0.5rem",
                  }}
                >
                  General Discussion Questions
                </h4>
                <br /><br />
                <ol>
                  <li>
                    Given the threat, what is the process by which your organization would receive intelligence and protective measure information?
                    <ol type="a">
                      <li>
                        With which departments and/or agencies or other organizations would your organization communicate regarding the potential threat?
                      </li>
                      <li>
                        Does your organization maintain a relationship with its CISA Protective Security Advisor (PSA) or CISA Cybersecurity Advisor (CSA)?
                        If so, is there a rapid means of contacting them?
                      </li>
                      <li>
                        Does your organization use the Homeland Security Information Network-Critical Infrastructure (HSIN-CI) Chemical Sector portal?
                      </li>
                      <li>
                        Is your organization subscribed to the DHS Cyber Spotlight newsletter?
                      </li>
                    </ol>
                  </li>
                  <li>
                    What internal information sharing and dissemination processes does your organization currently have in place?
                    <ol type="a">
                      <li>
                        Who are the key stakeholders or groups (e.g., sectors, agencies, associations) with whom your organization must communicate to protect its critical infrastructure assets?
                      </li>
                      <li>
                        Does your stakeholder group currently have information sharing processes? Are they documented?
                      </li>
                      <li>
                        In addition to notifications to industry and federal government stakeholders, when would your organization initiate notification procedures to local and state authorities?
                      </li>
                      <li>
                        How does your organization prioritize internal and external notifications?
                      </li>
                    </ol>
                  </li>
                  <li>
                    What information platforms, if any, does your organization currently use?
                    <ol type="a">
                      <li>
                        Does your organization currently own an information sharing platform? If so, does it have collaboration capabilities or is it used more as an intelligence / information collection repository?
                      </li>
                      <li>
                        Are the platforms used for cyber incidents and the platforms used for other types of emergencies different? Are there common elements?
                      </li>
                      <li>
                        What other capabilities (e.g., document library, calendar, alerts, special tools) would allow your organization to share information and help protect its critical infrastructure assets?
                      </li>
                      <li>
                        Are there any technological conditions that, if not met, would be “show-stoppers”?
                      </li>
                      <li>
                        What restrictions regarding access to and dissemination of information affect the ability to share information within your organization and with its public and private stakeholders (e.g., protected critical infrastructure information [PCII], sensitive but unclassified [SBU], business confidential)?
                      </li>
                    </ol>
                  </li>
                  <li>
                    How does your organization process the information it receives (e.g., formal reporting, rumors, social media) for further dissemination within the organization and to personnel?
                  </li>
                  <li>
                    What resources are used to disseminate information?
                    <ol type="a">
                      <li>
                        What notification capabilities (e.g., alerts, emails, telecommunications, text messages, special tools) does your organization use to share information and to communicate the process for implementing protective measures?
                      </li>
                      <li>
                        Are there technological barriers, legal considerations, or institutional sensitivities that might affect or limit information sharing?
                      </li>
                    </ol>
                  </li>
                  <li>
                    Given current and established information sharing procedures, what types of official information are the most useful (immediate information versus analyzed information) to your organization?
                    <ol type="a">
                      <li>
                        Does your organization perform independent analysis on information provided? If so, what does that analysis process look like?
                      </li>
                    </ol>
                  </li>
                  <li>
                    If there is identified “suspicious behavior” observed at a chemical facility, how does the facility report this information locally and within the Chemical Sector?
                    <ol type="a">
                      <li>Are trends in suspicious activities tracked across the Chemical Sector nationwide?</li>
                      <li>Is your organization aware of the “If You See Something, Say Something™” campaign or the Nationwide Suspicious Activity Reporting (SAR) Initiative (NSI)?</li>
                    </ol>
                  </li>
                  <li>
                    Given evidence of a credible cyber threat to the Chemical Sector, does your organization review its cyber security protocols?
                  </li>
                  <li>
                    What protective security measures or recommendations, if any, will your organization employ following this cyber threat?
                    <ol type="a">
                      <li>Does your organization coordinate protective measure implementation with any other organization within the Chemical Sector, or with government entities, such as law enforcement agencies or the PSA / CSA?</li>
                      <li>How are the protective measures put in place by the Chemical Sector communicated back to the government?</li>
                      <li>How useful are the recommended protective measures provided in information bulletins and advisories distributed by DHS (e.g., a Joint Intelligence Bulletin [JIB])?</li>
                    </ol>
                  </li>
                </ol>
              <br /> <br />
                <h4
                  style={{
                    fontStyle: "italic",
                    fontWeight: "normal",
                    display: "inline",
                    color: "var(--custom-blue)",
                    fontSize: "1.3rem",  // smaller font size
                    marginBottom: "0.5rem",
                  }}
                >
                  Cyber-Specific Activities
                </h4>
                <br /><br />
                <ol>
                  <li>Does your organization have policies or procedures to address cyber vulnerabilities or cyber threats?</li>
                  <li>What are the procedures and requirements for hardening / securing mobile devices (e.g., laptops, smartphones, and tablets)?</li>
                  <li>Is the security of these mobile devices ever tested (vulnerability scans, penetration tests, assessments)?</li>
                  <li>How often is the security tested on these mobile devices?</li>
                  <li>Is software installed on mobile devices that can be used to control or access your organization’s control system? What are the security procedures? Are there any security controls in place (such as encryption of the communication channel)?</li>
                  <li>Is operational information (system configuration files, network diagrams, training manuals, or archive data) stored on these devices? How is this information protected from unauthorized access?</li>
                  <li>If SCADA or ICS systems are compromised, do you have back up manual procedures for these systems?</li>
                  <li>If SCADA or ICS systems are compromised, what cascading impacts may occur both internally to your facility and externally to other stakeholder / community members?</li>
                  <li>How are the security policies relating to your mobile devices enforced?</li>
                  <li>When onsite, are mobile devices connected to the internal operations local-area network (LAN)?</li>
                  <li>What would be the impact of a lost or stolen device? How many devices are lost or stolen per year? What is the procedure for reporting a lost or stolen device?</li>
                  <li>Are there laptops that function as servers when offsite (e.g., file transfer protocol [FTP], web, file shares)?</li>
                  <li>Has there ever been a security-related incident involving mobile devices?</li>
                  <li>
                    Does your company have a formal / informal policy or procedure pertaining to information technology (IT) account management?
                    <ol type="a">
                      <li>Do these policies or procedures include protocols / steps for establishing, activating, modifying, disabling, and removing accounts?</li>
                      <li>Do these policies or procedures include protocols / steps for notifying IT account managers / administrators when users are terminated?</li>
                    </ol>
                  </li>
                  <li>
                  Does your company employ a formal sanctions process for personnel failing to comply with established information security policies and procedures? If so, has this been communicated to the employees, and how often?
                  </li>
                  <li>
                    Security awareness and training:
                    <ol type="a">
                      <li>
                        Does your company provide basic cybersecurity awareness training to all your information system users (including managers and senior executives)? How often is this training provided?
                      </li>
                      <li>
                        Is cybersecurity awareness training provided to new employees prior to them being able to access the information system?
                      </li>
                      <li>
                        Does your company provide adequate security-related training to IT managers, system and network administrators, and other IT personnel having access to system-level software? How often do they receive the training?
                      </li>
                    </ol>
                  </li>
                  <li>
                    Does your company terminate information system access upon termination of an individual’s employment?
                  </li>
                  <li>
                    Does your company retrieve all information system-related property (e.g., authentication key, system administration’s handbook / manual, keys, identification cards) during the employment termination process?
                  </li>
                  <li>
                    Does your company participate in the Enhanced Cybersecurity Services (ECS) program through DHS? Would participation in such a program be useful in this situation? If so, how would it be used?
                  </li>
                  <li>
                    Is your company a member of the Critical Infrastructure Cyber Community (C3) Voluntary Program through DHS?
                  </li>
                  <li>
                    Has your company implemented the Framework for Improving Critical Infrastructure Cybersecurity issued by the National Institute of Standards and Technology (NIST)? How does the framework help your company manage cybersecurity risks?
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </Container>
        <hr
        style={{
        borderTop: "3px solid var(--custom-blue)",
        opacity: 0.4,
        margin: "1.5rem 0",
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        }}
        />
        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section id="module2">
              <br />
                <h2 style={{ color: "var(--custom-blue)",textAlign: "center" }}>MODULE TWO: INCIDENT AND INCIDENT AFTERMATH</h2>
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  Scenario
                </h4>
                <p><strong>[Insert Facility Name and Location]</strong></p>
                <p><strong>[Insert Month, Day, Year]: [Time]</strong></p>
                <p>
                On the morning of the outbreak, an employee of [insert your facility name] connects his / her laptop to a wireless network hotspot at a local coffee shop. 
                The employee frequently connects to this hotspot to check his / her personal email and social media accounts prior to work.
                </p>
                <p>
                  The malware (from an infected host connected to the wireless network) scans the local coffee shop subnet for vulnerable systems, 
                  propagating itself onto the employee’s laptop in a matter of seconds.
                </p>
                <p>
                  Later that morning, the employee briefly connects the laptop to the LAN at [insert your facility name] to 
                  download data for work-related purposes.
                </p>
                <p>
                  Within minutes, several systems are infected on [insert your facility name’s] network. The laptop is disconnected and unused for the 
                  remainder of the day, but the malware is already attempting to spread to other local subnets. Eventually, the primary control 
                  network is scanned, and vulnerable systems are exploited.
                </p>
                <p>
                At some point, infected systems begin to propagate the malware outside of [insert your facility name] by scanning thousands of 
                random IP addresses across the Internet, increasing overall network traffic severalfold. As a result of these activities, 
                network system performance degrades significantly in the control system environment.
                </p>
                <p>
                  The mid-shift operator notices some apparent system slowness in reporting system health, device status, etc. The operator logs 
                  onto the system and begins performing manual checks. During this process, the operator notices that the screen flickers several 
                  times, but there is no other evidence of a problem. He continues to perform manual checks of the devices and equipment, confirming 
                  that everything seems to be running normally.
                </p>
                <p>
                  A technician at the internet service provider (ISP) for [insert your facility name] is aware of outbreaks of this particular malware and 
                  begins to check traffic logs for possible signs of contamination. ISP sends out an email alert to customers that appear to be infected before 
                  complaints are generated by other network providers. [Insert your facility name] received one of those emails but it does not get routed to 
                  the appropriate cybersecurity personnel until mid-afternoon.
                </p>
                <p>
                  A worker, who is verifying that all valves are in the “off” position, notices Valve #1 is “open”. According to company 
                  protocols, he reports the incident.
                </p>
                <p>
                Half (50%) of the failsafe systems are triggered and begin to shutdown various processes. These shutdowns are accompanied by several effluent 
                and / or gas releases that mandate reporting to the Environmental Protection Agency (EPA), state environmental officials, and local first 
                responders. A hazardous materials emergency is declared, and the local media outlets begin to call asking for a statement.
                </p>
                <p>
                Half (50%) of the failsafe systems are triggered and begin to shutdown various processes. These shutdowns are accompanied by several effluent 
                and / or gas releases that mandate reporting to the Environmental Protection Agency (EPA), state environmental officials, and local first 
                responders. A hazardous materials emergency is declared, and the local media outlets begin to call asking for a statement.
                </p>
                <p>
                Once the attack is realized, control system administrators need to contain and recover the environment at [insert your facility name]. 
                They determine that the outbreak is isolated to the control networks. During the process, control data is lost, aspects of the SCADA 
                operation are forced to manual overrides, and there is general loss of functionality in key services across the entire facility.
                </p>
              </section>
              <section>
              <br /> <br />
                <h4 style={{ fontWeight: "bold",  display: "inline-block",
                borderBottom: "2px solid var(--custom-blue)",
                paddingBottom: "0.2rem" }}>
                  Discussion Questions
                </h4>
              <br /> <br />
                <h4
                  style={{
                    fontStyle: "italic",
                    fontWeight: "normal",
                    display: "inline",
                    color: "var(--custom-blue)",
                    fontSize: "1.3rem",  // smaller font size
                    marginBottom: "0.5rem",
                  }}
                >
                  General Discussion Questions
                </h4>
                <br /><br />
                <ol>
                  <li>
                    What are your organization’s information sharing responsibilities during the response to the incident?
                  </li>
                  <li>
                    What formal information sharing processes would your organization use at this point?
                  </li>
                  <li>What resources are used to disseminate information?</li>
                  <ol type="a">
                  <li>
                    What notification capabilities (e.g. alerts, emails, telecommunications, text messages, special tools) does your organization use to share information and communicate protective measures implementation?
                  </li>
                  <li>
                    Are there technological barriers, legal considerations, or institutional sensitivities that might affect or limit information sharing, such as religious customs that prohibit use of electronic communication during specific times?
                    <ol type="i">
                      <li>
                        If so, how will threat-based alerts and notifications be distributed to community members who might not receive the latest alert through electronic communication methods?
                      </li>
                    </ol>
                  </li>
                  </ol>
                  <li>
                  What protective security measures will be employed at your organization following these cyber-attacks?
                  </li>
                  <li>
                  What measures would local law enforcement take at this time to protect your organization (e.g., improved cyber security, employee training, increased vigilance)?
                  </li>
                </ol>
              <br /> <br />
                <h4
                  style={{
                    fontStyle: "italic",
                    fontWeight: "normal",
                    display: "inline",
                    color: "var(--custom-blue)",
                    fontSize: "1.3rem",  // smaller font size
                    marginBottom: "0.5rem",
                  }}
                >
                  Cyber-Specific Activities
                </h4>
                <br /><br />
              </section>
            </div>
          </div>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Exercise001;
