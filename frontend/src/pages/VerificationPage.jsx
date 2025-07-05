import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setError("Missing verification token");
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email?token=${token}`
        );
        setStatus("verified");
      } catch (err) {
        setStatus("invalid");
        setError(
          err.response?.data?.message || "Invalid or expired verification link"
        );
      }
    };

    verifyToken();
  }, [token]);

  return (
    <>
      {/* <CssBaseline /> */}
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              p: 4,
              width: "100%",
              textAlign: "center",
              borderRadius: 2,
              border: "2px solid",
              borderColor:
                status === "verified"
                  ? "success.main"
                  : status === "invalid"
                  ? "error.main"
                  : "primary.main",
              backgroundColor: "transparent",
            }}
          >
            {status === "verifying" && (
              <>
                <Typography variant="h5" gutterBottom>
                  Verifying your email...
                </Typography>
                <CircularProgress size={60} thickness={4} sx={{ my: 3 }} />
              </>
            )}

            {status === "invalid" && (
              <>
                <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Verification Failed
                </Typography>
                <Typography paragraph>{error}</Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/")}
                  sx={{
                    mt: 2,
                    backgroundColor: "#28a745",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#218838",
                    },
                  }}
                >
                  Return to Home
                </Button>
              </>
            )}

            {status === "verified" && (
              <>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Email Verified Successfully!
                </Typography>
                <Typography  paragraph>
                  Your OTSEC-HUB account has been verified.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/LoginPage")}
                  sx={{ mt: 3 , backgroundColor: "#28a745",transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#218838",
                    },}}
                  fullWidth
                >
                  Proceed to Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
