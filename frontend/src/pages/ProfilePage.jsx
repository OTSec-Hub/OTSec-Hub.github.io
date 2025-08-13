import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert, Card, Form, Button } from "react-bootstrap";
import UserSidebar from "../components/UserSidebar";
import { Box } from "@mui/material";
import { useTheme } from 'styled-components';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const theme = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/LoginPage");
            return;
        }

        const fetchUserData = async () => {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);

                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/users/${decoded.user_id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError("Failed to load user profile.");
            } finally {
                // setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/LoginPage");
            return;
        }

        try {
            setUpdating(true);
            setError(null);
            const decoded = jwtDecode(token);
            const response = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/update_user/${decoded.user_id}`,
                { password: newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccess("Password updated successfully!");
                setOpen(false);
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            console.error("Failed to update password:", err);
            setError(err.response?.data?.message || "Failed to update password.");
        } finally {
            // setUpdating(false);
        }
    };

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
                    <Card.Header as="h4">Profile</Card.Header>
                    <Card.Body>
                        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
                        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                        <p><strong>Role:</strong> {user?.role || "N/A"}</p>

                        <Button
                            onClick={() => setOpen(prev => !prev)}
                            variant="primary"
                            className="mb-3"
                        >
                            {open ? "Cancel" : "Change Password"}
                        </Button>

                        {open && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        isInvalid={newPassword.length > 0 && newPassword.length < 6}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password must be at least 6 characters.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={confirmPassword.length > 0 && newPassword !== confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Passwords do not match.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    onClick={handlePasswordChange}
                                    variant="primary"
                                    className="me-2"
                                    disabled={updating || !newPassword || newPassword !== confirmPassword || newPassword.length < 6}
                                >
                                    {updating ? (
                                        <>
                                            <Spinner as="span" size="sm" animation="border" role="status" />
                                            <span className="ms-2">Updating...</span>
                                        </>
                                    ) : "Update Password"}
                                </Button>

                                {/* <Button
                                onClick={() => {
                                    setOpen(false);
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    setError(null);
                                    }}
                                    variant="outline-secondary"
                            >
                            Cancel
                            </Button> */}
                            </>
                        )}
                        {success && <Alert variant="success">{success}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Card.Body>
                </Card>
            </Container>
        </ Box>
    );
};

export default ProfilePage;