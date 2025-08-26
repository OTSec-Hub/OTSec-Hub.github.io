import React from "react";
import { Container } from "react-bootstrap";
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import { updateTitle } from "../utils";

const Exercise003 = () => {
  React.useEffect(() => {
    updateTitle("exercise-003 | OTSec-Hub.io");
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
          <Title size="h2" text="Cloud Blind: OT Security at Risk in a Cloud Analytics Failure" />
        </Container>
        <Container>
          <div className="row">
            <div className="col-md-8" style={{ marginLeft: "19%" }}>
              <section>
                <h4 style={sectionHeaderStyle}>Purpose</h4>
                <p>
                  Cloud-based analytics and dashboards are becoming more popular in ICS environments, however OT systems depend on real-time accuracy, integrity, and operator trust. In this exercise, a cloud-side ingestion failure and multi-zone latency issue challenges the security posture of your operational technology environment.
                </p>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Exercise Objectives</h4>
                <ol>
                  <li>Assess OT security safeguards against external system failure</li>
                  <li>Evaluate detection, validation, and escalation when cloud-based data is compromised</li>
                  <li>Explore incident response and containment options when cloud-linked ICS tools misreport operational state</li>
                  <li>Identify all fallback plans to preserve operational continuity and trusted data during cloud disruptions</li>
                </ol>
              </section>

              <section>
                <br />
                <h4 style={sectionHeaderStyle}>Scenario</h4>
                <p>Time: 9:30am</p>
                <p>Your facility uses a cloud-hosted analytics and historian service, running on a third-party cloud provider (e.g., Azure or AWS), to track pump health, flow rates, and predictive maintenance. These dashboards feed operator displays, generate maintenance tickets, and support regulatory reporting.</p>
                <p>Early this morning, your control room staff detects a minor pressure discrepancy between local HMIs and the cloud dashboard. At 9:45am, a chiller appears to be offline on the HMI, but the cloud analytics panel displays a “healthy” status.</p>
                <p>Soon after, some staff report dashboard latency across different systems:</p>
                <ul>
                    <li>Compressor metrics update normally</li>
                    <li>Pump status refreshes only every 5-7 minutes</li>
                    <li>Flow data from one site is several hours "out of date", meanwhile temperature data appears to be current</li>
                </ul>
                <p>These inconsistencies are not flagged as alerts, and operators are left uncertain about the cloud dashboard’s accuracy.</p>
                <p>At 10:25am, the cloud vendor sends an advisory:</p>
                <p><i>"We are investigating a telemetry ingestion issue affecting select cloud regions. Dashboard data may be delayed or stale, as well as logging and performance data may not reflect the real-time states.”</i></p>
                <p>Simultaneously, your compliance team downloads an automated report from the cloud service for regulator submission; which shows no data faults for the past 25 hours despite the known issues. The OT engineers are concerned about false assurance, operational blind spots, and potential overreliance on external analytics.</p>
                <h5 style={{ marginTop: "1rem", color: "var(--custom-blue)" }}>Discussion Questions</h5>
                <h6>A. Maintaining OT Integrity between conflicting data sources</h6>
                <ol>
                    <li>How does your OT security team validate operational state when cloud dashboards conflict with local HMIs and sensors?</li>
                    <ol type = "a">
                        <li>Are trusted local systems prioritized?</li>
                        <li>Does your organization have a documented procedure for resolving discrepancies between telemetry sources (e.g., local vs. cloud data)?</li>
                    </ol>
                    <li>How do operators know when cloud analytics are stale, delayed, or misleading?</li>
                    <ol type = "a">
                        <li>Are there anomaly detection tools or alerts (e.g., SCADA/HMI-based alerts, PLC level fault detection) in place to flag mismatches?</li>
                        <li>Is metadata (e.g., timestamps, latency warnings) monitored?</li>
                    </ol>
                    <li>What security risks arise when cloud dashboards show “healthy” while local systems are in fault/failure mode?</li>
                    <ol type = "a">
                        <li>Could the response team’s actions be delayed?</li>
                    </ol>
                </ol>
                <h6>B. Protecting ICS assets from external system failures</h6>
                <ol start={4}>
                    <li>Does your OT architecture rely on cloud dashboards for any safety-related decisions or interlocks?</li>
                    <ol type = "a">
                        <li>If yes, how are those decisions protected if cloud data becomes unreliable?</li>
                    </ol>
                    <li>How do you protect the ICS environment from cascading effects when connected systems (e.g., analytics or ticketing tools) fail silently?</li>
                    <ol type = "a">
                        <li>Are ICS components segmented or isolated from cloud-connected tools and services?</li>
                    </ol>
                    <li>What safeguards are in place within your OT environment to detect or respond when telemetry or alerts become unreliable?</li>
                    <ol type = "a">
                        <li>Do you use validation logic or local-only overrides?</li>
                    </ol>
                </ol>
                <h6>C. Securing Cloud Integration Points</h6>
                <ol start = {7}>
                    <li>How are telemetry flows between ICS/SCADA and cloud platforms secured?</li>
                    <ol type = "a">
                        <li>Is data encrypted and time stamped at the edge before sending?</li>
                        <li>Are endpoints authenticated and monitored?</li>
                    </ol>
                    <li>If telemetry is delayed or lost in transit, can your team distinguish between a communication fault, misconfiguration, or malicious filtering?</li>
                    <ol type = "a">
                        <li>Are OT logs independtly retained for later comparison?</li>
                    </ol>
                    <li>Do your service contracts with cloud vendors include OT security specific provisions, such as real-time telemetry service level agreements (SLA), alert fidelity, or breach impact thresholds?</li>
                </ol>
                <h6>D. Fallback Systems, Isolation, and Continuity</h6>
                <ol start={10}>
                    <li>Can your facility safely operate for 48 to 72 hours using local-only telemetry and manual controls?</li>
                    <ol type = "a">
                        <li>Are engineers trained and equipped to switch to “air-gapped” or fallback operations?</li>
                    </ol>
                    <li>How do you isolate cloud-connected systems from core control system components during an incident?</li>
                    <li>Is there a local historian or offline dashboard to restore data visibility during cloud failure or data manipulation events?</li>
                </ol>
                <h6>E. Communication, Escalation, and Governance of OT Security Incidents</h6>
                <ol start={13}>
                    <li>When a cloud-linked system fails or misleads, who in the team is responsible for escalating the issue internally?</li>
                    <li>How do you ensure field personnel, shift leads, and engineers are informed about untrustworthy cloud telemetry during this incident?</li>
                    <li>Does your cyber incident response plan include playbooks for vendor analytics or dashboard compromise?
                        <ol type = "a">
                            <li>Who leads containment and operational decision-making?</li>
                        </ol>
                    </li>
                </ol>
                <h6>F. Conclusion</h6>
                <ol start = {16}>
                    <li>Which system-level protection or control was missing or underprepared in this scenario?</li>
                    <li>17. What safeguards within your operational environment proved ineffective or insufficient?</li>
                    <li>Where did your existing safety or monitoring measures fall short during the incident?</li>
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

export default Exercise003;

