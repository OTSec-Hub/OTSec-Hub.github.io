import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import MarkDownEditor from "../components/MarkDownEditor";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function VideoSubmission() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const [video, setVideo] = useState({
        title: "",
        subtitle: "",
        description: "",
        url: "",
        status: "Pending",
        user_id: decoded.user_id,
        message: ""
    });
    const [labFile, setLabFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null); // Clear error on any change
    };

    // Dedicated markdown change handler (value is string or null)
    // const handleMarkdownChange = (value) => {
    //   setVideo((prev) => ({
    //     ...prev,
    //     content: value || "",
    //   }));
    //   setError(null);
    // };

    const handleSubmit = async () => {
        if (!video.title || !video.subtitle || !video.description || !video.url) {
            setError("Please fill required fields");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/create_communityVideo`,
                video,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", // Change to JSON
                    },
                }
            );
            setSuccess(true);
            setVideo({
                title: "",
                subtitle: "",
                description: "",
                url: "",
                status: "Pending",
                user_id: decoded.user_id,
                message: ""
            });
            // ... rest of your success handling
        } catch (err) {
            console.error(err);
            if (Array.isArray(err.response?.data?.detail)) {
                const messages = err.response.data.detail.map(d => d.msg).join(", ");
                setError(messages);
            } else {
                setError(err.response?.data?.detail || "Failed to add video");
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
                    <h1 className="mb-0">Submit Community Video !</h1>
                </div>
                <div className="col-auto" />
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Video added successfully!</Alert>}

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Video Title *</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter video title"
                        value={video.title}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Video Subtitle *</Form.Label>
                    <Form.Control
                        type="text"
                        name="subtitle"
                        placeholder="Enter video subtitle"
                        value={video.subtitle}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Video Description *</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter video description"
                        value={video.description}
                        onChange={handleChange}
                        disabled={loading}
                        rows={3}  // optional: control height
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Video URL *</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        placeholder="Enter video URL"
                        value={video.url}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit Video"}
                </Button>
            </Form>
        </Container>
    );
}
