import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BenchmarkSubmission = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const [formData, setFormData] = useState({
    datasetName: "",
    contributor: "",
    organization: "",
    datasetDescription: "",
    datasetLink: "",
    tags: [],
    otherTag: "",
  });

  const tagOptions = [
    "AI/ML",
    "ICS Data",
    "Network Traffic",
    "Sensor Data",
    "Threat Intelligence",
    "Incident Logs",
    "Simulation Data",
    "Forensics",
    "Training",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle submission, e.g. send to API

    alert("Benchmark submission received!");
  };

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
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
          <h1 className="mb-0">Submit a Dataset!</h1>
        </div>
        <div className="col-auto" />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Dataset Name *</Form.Label>
          <Form.Control
            type="text"
            name="datasetName"
            value={formData.datasetName}
            onChange={handleChange}
            required
            placeholder="e.g., Industrial Control System Network Traffic 2024"
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
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        <Form.Text muted>
        Organization that created, contributed to, or used this dataset (if applicable).
        </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dataset Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="datasetDescription"
            value={formData.datasetDescription}
            onChange={handleChange}
            required
            placeholder="Briefly describe what this dataset contains and its intended use."
          />
          <Form.Text muted>
            Provide enough context so others understand the dataset's contents and purpose.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dataset Link *</Form.Label>
          <Form.Control
            type="url"
            name="datasetLink"
            value={formData.datasetLink}
            onChange={handleChange}
            required
            placeholder="https://example.com/dataset"
          />
          <Form.Text muted>
            Provide a direct link to access or download the dataset.
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Dataset Tags *</Form.Label>
          <div className="d-flex flex-wrap">
            {tagOptions.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                name="tags"
                value={tag}
                label={tag}
                checked={formData.tags.includes(tag)}
                onChange={handleChange}
                className="me-3"
              />
            ))}
          </div>
          <Form.Group className="mt-2">
            <Form.Label>Other Tag</Form.Label>
            <Form.Control
              type="text"
              name="otherTag"
              value={formData.otherTag}
              onChange={handleChange}
            />
          <Form.Text muted>
            Add custom tag if not listed.
          </Form.Text>
          </Form.Group>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit Benchmark
        </Button>
      </Form>
    </Container>
  );
};

export default BenchmarkSubmission;
