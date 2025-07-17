import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Dropdown, NavDropdown } from "react-bootstrap";
import axios from "axios";


const LoginLink = ({ closeDelay = 250, setExpanded }) => {
    const location = useLocation();
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            console.log("Decoded user ID:", decoded);

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${decoded.user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    const user = res.data;
                    console.log("Fetched user:", user);

                    setUserName(user.name);
                })
                .catch((err) => {
                    console.error("Failed to fetch user:", err);
                    setUserName(null);
                });

        } catch (error) {
            console.error("Token decode failed:", error);
            setUserName(null);
        }
    }, []);

    if (userName) {
        return <NavDropdown title={`Hello, ${userName.split(" ")[0]}`} id="user-dropdown"
        >
            <Link
                to="/ProfilePage"
                className={`dropdown-item`}
                onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
            >
                Profile
            </Link>
            <Link
                to="/AdminDashboard"
                className={`dropdown-item`}
                onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
            >
                Dashboard
            </Link>
            <Dropdown.Item
                className="dropdown-item"
                onClick={() => {
                    localStorage.removeItem("token");
                    setExpanded(false);
                    navigate("/LoginPage");
                    window.location.reload();
                }}
            >
                Logout
            </Dropdown.Item>
        </NavDropdown >;
    }

    return (
        <Link
            to="/RegisterPage"
            className={`nav-link ${location.pathname === "/LoginPage" ? "active" : ""} p-0 pb-1`}
            onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
        >
            Register
        </Link>
    );
};

export default LoginLink;
