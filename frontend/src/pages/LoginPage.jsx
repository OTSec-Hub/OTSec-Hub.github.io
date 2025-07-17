import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectMode } from "../app/appSlice";
import { Button, Form, Spinner, Alert } from "react-bootstrap";

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
    const [success, setSuccess] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            navigate("/");
            window.location.reload();
        }
    }, [success, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        setError(null);
        setValidated(true);

        if (form.checkValidity()) {
            setLoading(true);
            const email = form.elements.email.value;
            const password = form.elements.password.value;

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    if(response.status === 401)
                        throw new Error("Invalid email or password");
                    else if(response.status === 403)
                        throw new Error("Email is not verified");
                    else
                        throw new Error("Login failed, please try again later");
                }

                const data = await response.json();
                localStorage.setItem("token", data.access_token);
                setSuccess(true);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
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
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" minLength={6} />
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
                        disabled={loading || success}
                    >
                        {success ? (
                            "Login Success"
                        ) : (
                            <>
                                Login{" "}
                                {loading && (
                                    <Spinner
                                        animation="border"
                                        variant="success"
                                        size="sm"
                                        className="ms-2"
                                    />
                                )}
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </StyledLogin>
    );
};

export default LoginPage;
