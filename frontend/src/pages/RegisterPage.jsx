import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

// #region styled-components
const StyledRegister = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 3rem 1rem;

  .form-control {
    background: ${({ theme }) =>
        theme.name === "light"
            ? "rgba(var(--bs-body-color-rgb), 0.03)"
            : "var(--bs-gray-dark)"};
  }

  .form-label {
    font-weight: 500;
  }

  .register-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`;
// #endregion

const RegisterPage = () => {
    const theme = useSelector(selectMode);
    const [validated, setValidated] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleRegister = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);  // mark form as validated to trigger feedback messages
        setError(null);
        setSuccess(null);

        if (form.checkValidity()) {
            setLoading(true);

            const email = form.elements.email.value;
            const name = form.elements.fullName.value;
            const password = form.elements.password.value;
            const passwordConfirm = form.elements.confirmPassword.value;
            if (password !== passwordConfirm) {
                setError("Passwords do not match");
                setValidated(false);
                setLoading(false)
                return;
            }


            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/register`,
                    { email, name, password }
                );

                if (response.status === 201 || response.status === 200) {
                    setSuccess("A verification email has been sent. Please check your inbox.");
                    form.reset();
                    setValidated(false);
                } else if (response.status === 400) {
                    setError("Email already registered!");
                } else
                    setError("Registration failed. Please try again.");
            } catch (err) {
                if (err.response?.data?.detail) {
                    setError(err.response.data.detail);
                } else {
                    setError(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        // <div className="d-flex justify-content-center align-items-center min-vh-100">
        //     <StyledRegister theme={{ name: theme }}>
        //         <RegisterForm />
        //     </StyledRegister>
        // </div>
        <StyledRegister theme={{ name: theme }}>
            <h2 className="register-title">Register</h2>
            <Form noValidate validated={validated} onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                    // placeholder="Enter your full name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Full name is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        // placeholder="Enter your email"
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        // placeholder="Enter your password"
                        id="password"
                        minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                    />

                    <Form.Control.Feedback type="invalid">
                        Password doesn't match
                    </Form.Control.Feedback>
                </Form.Group>

                <p>
                    Already have an account?{" "}
                    <Link to={"/LoginPage"} className="text-decoration-none">
                        Login
                    </Link>
                </p>

                {error && (
                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                        {success}
                    </Alert>
                )}

                <div className="text-center">
                    <Button
                        size="lg"
                        variant={theme === "light" ? "outline-dark" : "outline-light"}
                        type="submit"
                        disabled={loading}
                    >
                        Register{" "}
                        {loading && (
                            <Spinner
                                animation="border"
                                variant="success"
                                size="sm"
                                className="ms-2"
                            />
                        )}
                    </Button>
                </div>
            </Form>
        </StyledRegister>
    );
};

export default RegisterPage;