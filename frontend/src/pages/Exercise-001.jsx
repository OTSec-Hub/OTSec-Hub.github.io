import React from "react";
import { Container } from "react-bootstrap";
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import { updateTitle } from "../utils";

const Exercise001 = () => {
  React.useEffect(() => {
    updateTitle("exercise-001 | OTSec-Hub.io");
  }, []);

  const sectionHeaderStyle = {
    fontWeight: "bold",
    display: "inline-block",
    borderBottom: "2px solid var(--custom-blue)",
    paddingBottom: "0.2rem",
    marginTop: "0rem"
  };

    // 👇 NEW: Form state
  const [formResponses, setFormResponses] = React.useState({
    response1: "",
    response2: "",
    response3: "",
    response4:"",
    response5:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted responses:", formResponses);
    alert("Thanks for submitting your reflections!");
    // You could also POST to an API or store in localStorage here
  };

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-3">
          <Title size="h2" text="AI-Augmented Intrusion: Reconnaissance and Deception" />
        </Container>

        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section>
                <h4 style={sectionHeaderStyle}>Purpose</h4>
                <p>
                  Evaluate your ability to detect, analyze, and respond to early-stage AI-enhanced intrusions involving:
                </p>
                <ul>
                  <li>AI-generated phishing and impersonation of trusted vendors</li>
                  <li>Synthetic operational instructions embedded in familiar workflows</li>
                  <li>Time manipulation and subtle log forgery</li>
                  <li>Threats to operator trust, system integrity and situational awareness</li>
                  <li>Cross-team coordination during low-signal anomalies</li>
                </ul>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Exercise Objectives</h4>
                <ol>
                  <li>Assess procedures for verifying vendor communications and urgent updates</li>
                  <li>Identify gaps in authentication, approval, and auditability of override actions</li>
                  <li>Test awareness and response to log tampering and time-based deception</li>
                  <li>Improve cross-validation between systems, data sources and roles</li>
                  <li>Reflect on trust boundaries across teams</li>
                </ol>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Scenario</h4>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 1 – Sector Wide Threat Advisory:</h5>
                <p>
                CISA releases a sector-wide Cybersecurity Advisory describing the emergence of a threat actor group named “Phantom Signal” who are leveraging generative AI to craft highly targeted spear-phishing emails. These campaigns are aimed at industrial control system engineers, HMI operators, and maintenance personnel across a range of sectors reliant on operational technology, such as energy, water, manufacturing, and chemical processing.
                </p>
                <p>
                Emails impersonating known vendors include malicious attachments disguised as vendor configuration updates. Several critical infrastructure providers have flagged phishing emails that imitate their internal change management workflows and support ticket formats with alarming accuracy.
                </p>
                <p>
                 Your facility’s CISO forwards the alert to the OT Security Lead, noting that your plant’s SCADA vendor was referenced in the advisory; either as a spoofed sender or as a potential compromised source of updates. 
                </p>
                <p>
                Later in the day, your OT Security team discovers that a shift engineer received an email appearing to be from the SCADA vendor’s support team, containing a ZIP file with a “critical patch.” The email was formatted correctly and referenced a known support ticket. Believing it was legitimate, the engineer unzipped the file and launched the included installer. No immediate issues were observed, and the activity was not reported at the time.
                </p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <ol>
                  <li>How do you verify the authenticity of SCADA vendor alerts and patches?</li>
                  <ol type="a">
                    <li>
                      How are SCADA vendor domains and certificates validated or whitelisted on your network?
                    </li>
                  </ol>
                  <li>Do you use out-of-band confirmations for urgent advisories?</li>
                  <li>Which individuals or teams are responsible for assessing and approving vendor-supplied patches that raise security concerns?</li>
                  <ol type="a">
                    <li>
                      Is there a formal process in place to verify, test, or isolate vendor patches before they are deployed in your OT environment? Who initiates that process?
                    </li>
                  </ol>
                  <li>What is your protocol for handling suspicious files before they're opened?</li>
                  <ol type="a">
                    <li>
                      What is your procedure for handling unsolicited vendor updates that appear urgent?
                    </li>
                    <li>
                      Would your email filtering or endpoint protection catch this ZIP file before delivery or execution?
                    </li>
                  </ol>
                </ol>
              </section>

              <section>
                <br />
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 3 - Deceptive Operational Guidance:</h5>
                <p>
                  An engineer at an HMI Terminal receives a digital bulletin titled "Sensor Drift Advisory – Maintenance Override Authorized." The message appears to originate from your internal maintenance scheduler and instructs the engineer to manually override Safety Damper 32 due to pressure fluctuations allegedly caused by sensor drift.
                </p>
                <p>
                 The bulletin is displayed through the standard workflow interface, uses exact internal formatting, and references a legitimate past maintenance ticket, making it appear fully credible. The system does not prompt for additional confirmation, and the override is staged and executed automatically. No alerts or warnings are triggered. 
                </p>
                <p>
                  Upon later review, no record of the advisory exists in the CMMS (Computerized Maintenance Management System) or the central work order system. Internal audit logs show no official
issuance of the override instruction. The command was generated by malware embedded within the HMI, mimicking past operator behavior based on cloned historical input patterns.
                </p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <ol>
                  <li>Are override instructions cross-checked with ticketing systems or supervisor approvals?</li>
                  <ol type="a">
                    <li>
                      Is there a process to ensure overrides are legitimate and not maliscious or mistaken?
                    </li>
                    <li>
                      Could an attacker forge override instructions that look real without being verified against authorized records?
                    </li>
                  </ol>
                  <li>Are HMI messages version controlled or auditable</li>
                  <ol type="a">
                    <li>
                      Can tampered or forged HMI messages be detected later?
                    </li>
                    <li>
                      Do you have digital forensics or change tracking on your HMI interface?
                    </li>
                  </ol>                  
                  <li>Does the system support dual-operator confirmation for overrides</li>
                  <ol type="a">
                    <li>
                      Are there safeguards to prevent a single point of failure or insider threat?
                    </li>
                  </ol>  
                </ol>
              </section>

              <section>
                <br />
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 4 - Temporal Log Disruptions:</h5>
                <p>
                  During overnight monitoring, a shift supervisor notices system logs containing alerts timestamped 6 to 12 hours in the future. Sensor values appear plausible, for example, showing a gradual rise in temperature or pressure, but contradict real-time readings from nearby independent gauges.
                </p>
                <p>
                 Some log entries have been edited and digitally signed using valid user credentials, even though those users were not on shift during the logged activity, suggesting credential compromise or impersonation. 
                </p>
                <p>
                Initial IT investigation confirms that log authenticity checksums remain intact, indicating that manipulation likely occurred at the firmware or storage layer.  
                </p>
                <p>
                 While all ICS subsystems use NTP for time synchronization, clock skew is regionally inconsistent, adding complexity to the forensic analysis. 
                </p>
                <p><i>IT and OT teams must collaborate to determine how these sophisticated temporal manipulations are occurring undetected and to identify affected systems.</i></p>

                <p><i>While the anomalies have not yet triggered operational consequences, the nature of the deception suggests deeper, undetected compromise may be present. At this stage, your organization must decide whether to escalate its posture or continue monitoring.</i></p>

                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <ol>
                  <li>What multi-factor or hardware-based validation methods exist for critical override commands?</li>
                  <li>
                    How does your organization authenticate the origin and validity of internal ICS messages?
                    <ol type="a">
                      <li>Have operators received scenario-based training on synthetic data threats or AI-injected instructions?</li>
                    </ol>
                  </li>
                  <li>How would you cross-check operational instructions with your internal work order systems or maintenance logs?</li>
                  <li>Are logs stored in WORM (Write Once Read Many) or immutable systems?</li>
                  <li>Is log metadata (e.g., MAC addresses, device ID) used for source correlation?</li>
                  <li>How do you detect tampering across decentralized time domains?</li>
                  <li>Do you maintain a historical “golden dataset” of baseline log behavior for anomaly detection?</li>
                  <li>
                    Considering the advanced nature of this manipulation, what process or technology gaps does this incident reveal in your OT security posture?
                    <ol type="a">
                      <li>What improvements would you prioritize in response to these gaps?</li>
                    </ol>
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </Container>

<Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section style={{ marginTop: "2rem", padding: "1rem", borderTop: "2px solid var(--custom-blue)" }}>
                <h4 style={sectionHeaderStyle}>Post-Exercise Reflection</h4>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="response1">What were your key takeaways from this exercise?</label>
                    <textarea
                      id="response1"
                      name="response1"
                      className="form-control"
                      rows={3}
                      value={formResponses.response1}
                      onChange={(e) =>
                        setFormResponses({ ...formResponses, response1: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="response2">How did this scenario highlight strengths or weaknesses in your current processes or tools?</label>
                    <textarea
                      id="response2"
                      name="response2"
                      className="form-control"
                      rows={3}
                      value={formResponses.response3}
                      onChange={(e) =>
                        setFormResponses({ ...formResponses, response3: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="response3">If this scenario occurred in your organization, what would you do differently now that you’ve completed the exercise?</label>
                    <textarea
                      id="response3"
                      name="response3"
                      className="form-control"
                      rows={3}
                      value={formResponses.response3}
                      onChange={(e) =>
                        setFormResponses({ ...formResponses, response3: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="response4">Were there any moments in the exercise where you felt unsure how to respond? What additional training or resources would help?</label>
                    <textarea
                      id="response4"
                      name="response4"
                      className="form-control"
                      rows={3}
                      value={formResponses.response3}
                      onChange={(e) =>
                        setFormResponses({ ...formResponses, response3: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="response5">What risks or system dependencies were exposed that you hadn’t fully considered before?</label>
                    <textarea
                      id="response5"
                      name="response5"
                      className="form-control"
                      rows={3}
                      value={formResponses.response3}
                      onChange={(e) =>
                        setFormResponses({ ...formResponses, response3: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
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

