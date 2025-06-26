import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert, Card } from "react-bootstrap";

const ProfilePage = () => {
    const [user, setUser] = useState(null); // Will hold {name, email, role}
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // redirect if no token
            return;
        }

        try {
            const decoded = jwtDecode(token);
            axios
                .get(`${process.env.REACT_APP_API_BASE_URL}/users/${decoded.user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch user:", err);
                    setError("Failed to load user profile.");
                    setLoading(false);
                });
        } catch (error) {
            console.error("Token decode failed:", error);
            setError("Invalid token. Please login again.");
            setLoading(false);
            navigate("/login");
        }
    }, [navigate]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
            <Card>
                <Card.Header as="h4">Profile</Card.Header>
                <Card.Body>
                    <p>
                        <strong>Name:</strong> {user?.name || "N/A"}
                    </p>
                    <p>
                        <strong>Email:</strong> {user?.email || "N/A"}
                    </p>
                    <p>
                        <strong>Role:</strong> {user?.role || "N/A"}
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
