import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AddLab() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [lab, setLab] = useState({
    title: "",
    lab_img: "",
    status: "Pending",
    pdf: "",
    user_id: decoded.user_id,
    message:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLab((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!lab.title || !lab.lab_img || !lab.pdf) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/create_communityLab`,
        lab,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setLab({
        title: "",
        lab_img: "",
        status: "Pending",
        pdf: "",
        user_id: decoded.user_id,
        message:""
      });
    } catch (err) {
      console.error(err);
      if (Array.isArray(err.response?.data?.detail)) {
        // Join all validation error messages into one string
        const messages = err.response.data.detail.map(d => d.msg).join(", ");
        setError(messages);
      } else {
        setError(err.response?.data?.detail || "Failed to add lab");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <div className="row align-items-center mb-4">
        <div className="col-auto">
          <Button onClick={() => navigate(-1)}>← Back</Button>
        </div>
        <div className="col text-center" style={{ marginLeft: "-65px" }}>
          <h1 className="mb-0">Submit Community Lab!</h1>
        </div>
        <div className="col-auto" />
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Lab added successfully!</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Lab Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter lab title"
            value={lab.title}
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thumbnail Image URL *</Form.Label>
          <Form.Control
            type="text"
            name="lab_img"
            placeholder="Enter image URL"
            value={lab.lab_img}
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PDF URL *</Form.Label>
          <Form.Control
            type="url"
            name="pdf"
            placeholder="Paste Google Drive or Dropbox link"
            value={lab.pdf}
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Group>


        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Lab"}
        </Button>
      </Form>
    </Container>
  );
}
