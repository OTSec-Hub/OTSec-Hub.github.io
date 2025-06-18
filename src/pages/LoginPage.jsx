import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// #region styled-components
const StyledLogin = styled.div`
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

  .login-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`;
// #endregion

const LoginPage = () => {
    const theme = useSelector(selectMode);
    const [validated, setValidated] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleLogin = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        setError(null);
        setValidated(true);

        if (form.checkValidity()) {
            setLoading(true);

            // Simulate login
            setTimeout(() => {
                setLoading(false);
                const email = form.elements.email.value;
                const password = form.elements.password.value;

                if (email === "admin@example.com" && password === "123456") {
                    alert("Login successful!");
                } else {
                    setError("Invalid email or password.");
                }
            }, 1000);
        }
    };

    return (
        <StyledLogin theme={{ name: theme }}>
            <h2 className="login-title">Login</h2>
            <Form noValidate validated={validated} onSubmit={handleLogin}>
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
                    Not a member?{" "}
                    <Link to={"/RegisterPage"} className="text-decoration-none">
                        Register
                    </Link>
                </p>
                {error && (
                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}

                <div className="text-center">
                    <Button
                        size="lg"
                        variant={theme === "light" ? "outline-dark" : "outline-light"}
                        type="submit"
                        disabled={loading}
                    >
                        Login{" "}
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
        </StyledLogin>
    );
};

export default LoginPage;