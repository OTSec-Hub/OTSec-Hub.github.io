import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

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

        setValidated(true);
        setError(null);
        setSuccess(null);

        if (form.checkValidity()) {
            setLoading(true);

            // Simulate registration logic
            setTimeout(() => {
                setLoading(false);
                const email = form.elements.email.value;
                const name = form.elements.fullName.value;
                const password = form.elements.password.value;

                if (email && name && password.length >= 6) {
                    setSuccess("Registration successful!");
                } else {
                    setError("Please fill all fields correctly.");
                }
            }, 1000);
        }
    };

    return (
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
                        minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
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