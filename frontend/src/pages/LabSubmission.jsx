import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LabSubmission = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const [formData, setFormData] = useState({
    labName: "",
    contributor: "",
    organization: "",
    description: "",
    objectives: "",
    tools: "",
    labTags: [],
    otherCategory: "",
    practicality: "",
    reflectionQuestions: ""
  });

  const labTypeOptions = [
    "AI/ML in OT",
    "ICS Forensics",
    "HMI/PLC Security",
    "Network Monitoring",
    "SCADA Analysis",
    "Physical Process Simulation",
    "Sensor Data Integrity",
    "OT Risk Assessment"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "labTags") {
      setFormData((prev) => ({
        ...prev,
        labTags: checked
          ? [...prev.labTags, value]
          : prev.labTags.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        submissionData.append(key, JSON.stringify(val));
      } else {
        submissionData.append(key, val);
      }
    });

    if (pdfFile) {
      submissionData.append("pdfFile", pdfFile);
    }

    console.log("Submitted Lab:", submissionData);
    alert("Lab submission received!");
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <div className="row align-items-center mb-4">
        <div className="col-auto">
          <Button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover ? "lightgray" : "var(--custom-blue)",
              borderColor: hover ? "lightgray" : "var(--custom-blue)",
              color: hover ? "black" : "white",
              transition: "background-color 0.2s ease",
            }}
          >
            ← Back
          </Button>
        </div>
        <div className="col text-center" style={{ marginLeft: "-65px" }}>
          <h1 className="mb-0">Submit Your Lab!</h1>
        </div>
        <div className="col-auto" />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Lab Name *</Form.Label>
          <Form.Control
            type="text"
            name="labName"
            value={formData.labName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Contributor Name *</Form.Label>
            <Form.Control
            type="text"
            name="contributor"
            value={formData.contributor}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lab Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Form.Text muted>Provide a clear overview of the lab, including the scenario, goals, and context.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Objectives *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            required
          />
          <Form.Text muted>List 3–6 specific learning goals members should achieve by completing this lab.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Required Tools *</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="tools"
            value={formData.tools}
            onChange={handleChange}
            required
          />
          <Form.Text muted>List software, hardware, or platforms needed to complete the lab.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lab Category / Tags *</Form.Label>
          <div className="d-flex flex-wrap">
            {labTypeOptions.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                name="labTags"
                value={tag}
                label={tag}
                checked={formData.labTags.includes(tag)}
                onChange={handleChange}
                className="me-3"
              />
            ))}
          </div>
          <Form.Group className="mt-2">
            <Form.Label>Other Category</Form.Label>
            <Form.Control
              type="text"
              name="otherCategory"
              value={formData.otherCategory}
              onChange={handleChange}
              placeholder="Custom tag if not listed"
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Practicality / Setup Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="practicality"
            value={formData.practicality}
            onChange={handleChange}
          />
          <Form.Text muted>Include setup complexity, environment needs, or estimated duration.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Upload Lab PDF *</Form.Label>
          <Form.Text className="d-block mb-2" muted>
            Include detailed steps, images, and part references. PDF only.
          </Form.Text>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />
          {pdfFile && (
            <div className="mt-2">📎 Selected file: <strong>{pdfFile.name}</strong></div>
          )}
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>Optional Reflection Questions</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="reflectionQuestions"
            value={formData.reflectionQuestions}
            onChange={handleChange}
          />
          <Form.Text muted>Optional prompts you’d like learners to consider after completing this lab.</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit Lab
        </Button>
      </Form>
    </Container>
  );
};

export default LabSubmission;
