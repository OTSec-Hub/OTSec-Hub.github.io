import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ExerciseSubmission = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    contributor: "",
    organization: "",
    purpose: "",
    summary: "",
    objectives: "",
    threatTags: [],
    sectors: [],
    otherCategory: "",
    otherSector: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "threatTags" || name === "sectors") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((v) => v !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("contributor", formData.contributor);
    submissionData.append("organization", formData.organization);
    submissionData.append("purpose", formData.purpose);
    submissionData.append("summary", formData.summary);
    submissionData.append("objectives", formData.objectives);
    submissionData.append("threatTags", JSON.stringify(formData.threatTags));
    submissionData.append("sectors", JSON.stringify(formData.sectors));
    submissionData.append("otherCategory", formData.otherCategory);
    submissionData.append("otherSector", formData.otherSector);
    if (pdfFile) {
      submissionData.append("pdfFile", pdfFile);
    }

    alert("Exercise submission saved.");
  };

  const threatOptions = [
    "AI-generated threats",
    "Insider threat",
    "Supply chain compromise",
    "Physical safety compromise",
    "Data governance",
    "PLC/HMI compromise",
    "Crisis communication",
    "Zero Trust / access control",
    "Forensics / investigation",
  ];

  const sectorOptions = [
    "Energy",
    "Water/Wastewater",
    "Manufacturing",
    "Transportation",
    "Chemical",
    "Maritime",
    "Healthcare",
    "General OT",
  ];

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
          <h1 className="mb-0">Submit Your Exercise!</h1>
        </div>
        <div className="col-auto" />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Exercise Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Contributor Name *</Form.Label>
              <Form.Control
                type="text"
                name="contributor"
                value={formData.contributor}
                onChange={handleChange}
                required
              />
              <Form.Text muted>
                Full name of the person submitting the exercise (e.g., Jane Smith).
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
              <Form.Text muted>
                The organization, agency, or institution you represent (optional).
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Purpose *</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
          <Form.Text muted>
            1–3 sentences: What the exercise aims to simulate and explore.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Summary *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
          <Form.Text muted>
            Brief narrative or context to frame the scenario.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Exercise Objectives *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            required
          />
          <Form.Text muted>
            3–6 learning objectives participants should explore (e.g., risk management, response readiness).
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Threat Theme / Category Tags *</Form.Label>
          <div className="d-flex flex-wrap">
            {threatOptions.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                name="threatTags"
                value={tag}
                label={tag}
                checked={formData.threatTags.includes(tag)}
                onChange={handleChange}
                className="me-3"
              />
            ))}
          </div>
          <Form.Group className="mt-2">
            <Form.Label>Other (if not listed)</Form.Label>
            <Form.Control
              type="text"
              name="otherCategory"
              value={formData.otherCategory}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sector Applicability *</Form.Label>
          <div className="d-flex flex-wrap">
            {sectorOptions.map((sector) => (
              <Form.Check
                key={sector}
                type="checkbox"
                name="sectors"
                value={sector}
                label={sector}
                checked={formData.sectors.includes(sector)}
                onChange={handleChange}
                className="me-3"
              />
            ))}
          </div>
          <Form.Group className="mt-2">
            <Form.Label>Other (if not listed)</Form.Label>
            <Form.Control
              type="text"
              name="otherSector"
              value={formData.otherSector}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>
            Upload Scenario & Questions (PDF)
          </Form.Label>
          <Form.Text className="d-block mb-2" muted>
            Please upload a PDF file that contains the scenario narrative and discussion questions for this exercise.
            Exercises should be designed to take approximately <strong>one hour</strong> to complete.
          </Form.Text>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
          {pdfFile && (
            <div className="mt-2">📎 Selected file: <strong>{pdfFile.name}</strong></div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit Exercise
        </Button>
      </Form>
    </Container>
  );
};

export default ExerciseSubmission;
