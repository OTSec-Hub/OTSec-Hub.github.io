import React from "react";
import { Container } from "react-bootstrap";
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import { updateTitle } from "../utils";

const Exercise002 = () => {
  React.useEffect(() => {
    updateTitle("exercise-002 | OTSec-Hub.io");
  }, []);

  const sectionHeaderStyle = {
    fontWeight: "bold",
    display: "inline-block",
    borderBottom: "2px solid var(--custom-blue)",
    paddingBottom: "0.2rem",
    marginTop: "0rem"
  };

    //Form state
  const [formResponses, setFormResponses] = React.useState({
    response1: "",
    response2: "",
    response3: "",
    response4:"",
    response5:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for submitting your reflections!");
    // You could also POST to an API or store in localStorage here
  };

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-3">
          <Title size="h2" text="AI-Augmented Intrusion: Disruption and Response" />
        </Container>
        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section>
                <h4 style={sectionHeaderStyle}>Purpose</h4>
                <p>
                  To simulate an AI-driven cyberattack that has progressed into full operational dysfunction, challenging the organization’s ability to maintain safety, recover control, communicate effectively, and investigate any synthetic behaviors. This exercise does this by exploring:
                </p>
                <ul>
                  <li>Cascading failures triggered by uninvestigated override anomalies</li>
                  <li> Synthetic operator behavior designed to avoid anomaly detection thresholds</li>
                  <li>Malware that mimics normal workflows using learned behavioral patterns</li>
                  <li>Crisis communications during public exposure and reputational risk</li>
                  <li>Digital forensics challenges involving human-AI command attribution</li>
                  <li>Organizational response, fallback readiness, and trust restoration</li>
                </ul>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Exercise Objectives</h4>
                <ol>
                  <li>Assess protocols for escalation, containment, and manual fallback operations during system failure</li>
                  <li>Evaluate methods for detecting AI-generated behavior within control systems</li>
                  <li>Practice crisis communication strategies during security incidents</li>
                  <li>Identify gaps in telemetry management and behavioral data protection</li>
                  <li>Explore forensics and operational approaches to distinguish between synthetic (e.g. AI-generated) and human input</li>
                  <li>Discuss improvements to response procedures and cross-functional coordination</li>
                </ol>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Scenario</h4>
                <p><i>Following a period of undetected/unresolved anomalous activity in your OT environment, your organization now faces its first clear signs of coordinated disruption.</i></p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 5 - Coordinated Subsystem Disruption:</h5>
                <p>At 2:15 p.m. local time, multiple override commands (previously flagged but not yet investigated) are executed automatically. This triggers a cascading failure within the control logic of an auxiliary cooling substation.</p>
                <p>A safety interlock associated with a pressurized hazardous system fails to engage, prompting an emergency shutdown. Operators are forced to manually actuate valves under high-pressure conditions, narrowly averting the release of a hazardous fluid.</p>
                <p>Subsequent investigation reveals that operator authentication logs originated from a mobile device that was not connected to the facility’s VPN at the time of the incident.</p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <ol>
                <li>What is your escalation protocol when override anomalies are noted but unconfirmed?</li>
                  <li>How do you differentiate between false alarms (noise) and genuine threats (signal) when multiple anomalies occur simultaneously?</li>
                  <li>Do you have backup ways to operate or control your ICS/SCADA systems that do not rely on the network or connected systems?</li>
                  <ol type="a">
                    <li>
                      Is there a formal process in place to verify, test, or isolate vendor patches before they are deployed in your OT environment? Who initiates that process?
                    </li>
                    <li>
                        How often are these fallback methods tested or practiced by operators?
                    </li>
                    <li>
                        How quickly can control transition to the offline fallback in an emergency?
                    </li>
                    <li>
                        What limitations or risks exist when operating using the fallback procedures?
                    </li>
                  </ol>
                </ol>
              </section>

              <section>
                <br />
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 6 - Adversarial Model Discovery:</h5>
                <p>An incident response team discovers that the plant’s HMI environment had been previously exfiltrated. The adversary appears to have trained an AI agent on recorded operator sessions, capturing routine responses to system conditions and alerts.</p>
                <p>This AI malware is now actively generating operator-like inputs at intervals that intentionally avoid thresholds that would trigger anomaly alerts. It mimics operator workflows during shift transitions and behaves just like a human operator would.</p>
                <p>As a result, several team members begin questioning whether certain logs and commands were actually generated by humans or by this synthetic AI agent.</p>
              </section>

              <section>
                <br />
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Day 7 - National Disclosure and Crisis Management:</h5>
                <p>Multiple facilities across different sectors are revealed to be affected and your organization is listed as one of the impacted operators.</p>
                <p>Misinformation spreads on social media, implying a catastrophic release occurred. Local emergency response centers receive multiple calls from concerned residents. Internally staff report morale issues and anxiety around system trust.</p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <ol>
                  <li>
                    What digital forensics procedures would your team activate to differentiate between human and AI-generated actions in ICS logs?
                    <ol type="a">
                      <li>How would you distinguish AI-generated inputs from genuine human commands in real time or during forensic analysis?</li>
                    </ol>
                  </li>
                <li>What are your containment protocols for malware that mimics normal operator workflows?</li>
                <li>How would you isolate potentially compromised operator terminals while maintaining operational continuity?</li>
                  <li>Does your crisis communication plan include procedures for AI-related cyber incidents?</li>
                  <li>What regulatory bodies (e.g., EPA, DOE, NRC) would require formal incident reporting in this case?</li>
                  <li>
                    How will this incident change how your organization treats sensitive operator telemetry and behavior modeling?
                    <ol type="a">
                      <li>How is operator interaction data (control inputs, session logs, telemetry) currently collected and stored? Are there policies in place to limit long-term retention or exposure?</li>
                      <li>Who has access to this behavioral data, and how is that access monitored or audited? Are there controls to prevent unauthorized use or exfiltration?</li>
                      <li>Has your organization considered how this data could be used to train AI models (internally or externally by adversaries)? What safeguards are in place to prevent its misuse in impersonation and automation attacks?</li>
                      <li>Could deploying honeypots, such as false setpoints or alerts, help detect synthetic or automated behavior?</li>
                      <li>Following this incident, what updates to data governance, security policy, or third-party agreements should be considered to protect operator behavior profiles better?</li>
                    </ol>
                  </li>
                  <li>How do you rebuild operator trust after system deception?</li>
                </ol>
              </section>
              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Supplemental Exercise Questions:</h4>
                <ol>
                <li>Does your SOC or OT team use behavioral biometrics to distinguish operator inputs?</li>
                <li>What protocols exist for revoking or auditing operator credentials in bulk during cyber events?</li>
                <li>How often are backup configurations of PLCs or HMIs validated or tested offline?</li>
                <li>Would your organization benefit from having a “kill switch” that reverts HMIs to read-only mode during suspected intrusions?</li>
                <li>Would your current EDR/OT monitoring stack detect behavioral mimicry?</li>
                <li>Are stale operator credentials automatically disabled after X days of inactivity?</li>
                <li>Is there a mechanism for bulk revocation and session reset in emergencies?</li>
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

export default Exercise002;

