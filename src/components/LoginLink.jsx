// src/components/LoginLink.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LoginLink = ({ closeDelay = 250, setExpanded }) => {
    const location = useLocation();

    return (
        <Link
            to="/RegisterPage"
            className={`nav-link ${location.pathname === "/login" ? "active" : ""} p-0 pb-1`}
            onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
        >
            Register
        </Link>
    );
};

export default LoginLink;
