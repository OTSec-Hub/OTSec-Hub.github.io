import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert, Card, ListGroup } from "react-bootstrap";

import UserSidebar from "../components/UserSidebar";
import { Box } from "@mui/material";
import { useTheme } from 'styled-components';

const ProfileSubmittedExercises = () => {
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
                    `${process.env.REACT_APP_API_BASE_URL}/api/submission`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setProgress(response.data);
            } catch (err) {
                setError("Failed to load watched videos.");
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
            <Container className="mt-5" style={{ maxWidth: "1000px" }}>
                <Card>
                    <Card.Header as="h4">Submitted Exercises</Card.Header>
                    <Card.Body>
                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        <ListGroup variant="flush">
                            {progress.length > 0 ? (progress.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex gap-3 justify-content-between align-items-center"
                                >
                                    <Link
                                        to={`/Resources/Exercises/${item.exercise_id}`}
                                        className="text-decoration-none"
                                    >
                                        {item.exercise.title}
                                    </Link>

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
                                    {/* <br />
                                    {item.message && <p className="text-muted">{item.message}</p>} */}
                                </ListGroup.Item>
                            ))) : (
                                <ListGroup.Item>No exercises submitted yet.</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </Box>
    );
};


export default ProfileSubmittedExercises;