import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert, Card, ListGroup } from "react-bootstrap";
import UserSidebar from "../components/UserSidebar";
import { Box } from "@mui/material";
import { useTheme } from 'styled-components';

const ProfileCommunityVideos = () => {
    const [progress, setProgress] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/LoginPage");
            return;
        }

        const fetchProgress = async () => {
            try {
                const decoded = jwtDecode(token);

                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/get_userCommunityVideos`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                console.log('user community labs', response.data);

                setProgress(response.data);
            } catch (err) {
                console.error("Failed to fetch progress:", err);
                setError("Failed to load submitted labs.");
            } finally {
                // setLoading(false);
            }
        };

        fetchProgress();
    }, [navigate]);

    // if (loading) {
    //     return (
    //         <Container className="text-center mt-5">
    //             <Spinner animation="border" />
    //         </Container>
    //     );
    // }

    function getYouTubeVideoId(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname.slice(1);
            } else if (
                parsed.hostname === 'www.youtube.com' ||
                parsed.hostname === 'youtube.com'
            ) {
                return parsed.searchParams.get('v');
            }
            return null;
        } catch (err) {
            console.error('Invalid YouTube URL:', err);
            return null;
        }
    }

    return (
        <Box display="flex" minHeight="100vh" sx={{
            backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529"
        }}>
            <UserSidebar />
            <Container className="mt-5" style={{ maxWidth: "1000px" }}>
                <Card>
                    <Card.Header as="h4">Submitted Community Labs</Card.Header>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <ListGroup variant="flush">
                            {progress.length > 0 ? (progress.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex flex-column mb-2 p-3"
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/* Lab image */}
                                        <img
                                            src={`https://img.youtube.com/vi/${getYouTubeVideoId(item.url)}/sddefault.jpg`}
                                            alt={item.content_title}
                                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                                        />

                                        {/* Lab title */}
                                        <p className="mb-0 flex-grow-1 ms-3">
                                            {item.title}
                                        </p>

                                        {/* Status badge */}
                                        <span
                                            className={`badge ${item.status?.toLowerCase() === "approved"
                                                ? "bg-success"
                                                : item.status?.toLowerCase() === "rejected"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Optional message */}
                                    {item.message && (
                                        <p className="text-muted fst-italic small mt-3 mb-0">
                                            Feedback: {item.message}
                                        </p>
                                    )}
                                </ListGroup.Item>
                            ))) : (
                                <ListGroup.Item>No labs submitted yet.</ListGroup.Item>
                            )}

                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </Box>
    );
};

export default ProfileCommunityVideos;