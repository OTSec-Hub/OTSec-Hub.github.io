import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert, Card, ListGroup } from "react-bootstrap";
import UserSidebar from "../components/UserSidebar";
import { Box } from "@mui/material";
import { useTheme } from 'styled-components';

const SolvedQuizzes = () => {
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
                    `${process.env.REACT_APP_API_BASE_URL}/api/track_progresss`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                const filtered = response.data.filter(
                    item => item.quiz_completed === true
                );
                setProgress(filtered);
            } catch (err) {
                console.error("Failed to fetch progress:", err);
                setError("Failed to load solved quizzes.");
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

    return (
        <Box display="flex" minHeight="100vh" sx={{
            backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529"
        }}>
            <UserSidebar />
            <Container className="mt-5" style={{ maxWidth: "600px" }}>
                <Card>
                    <Card.Header as="h4">Solved Quizzes</Card.Header>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                            <ListGroup variant="flush">
                                {progress.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {item.content_title}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </Box>
    );
};

export default SolvedQuizzes;