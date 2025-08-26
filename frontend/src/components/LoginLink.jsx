import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Dropdown, NavDropdown } from "react-bootstrap";
import axios from "axios";

const LoginLink = ({ closeDelay = 250, setExpanded }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Changed from userName to user to store complete user object
    const [user, setUser] = useState(null);
    // Added loading state for better async handling
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${decoded.user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    const userData = res.data;
                    setUser(userData);
                })
                .catch((err) => {
                    // Clear invalid token
                    localStorage.removeItem("token");
                })
                .finally(() => {
                    setLoading(false);
                });

        } catch (error) {
            // Clear invalid token
            localStorage.removeItem("token");
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setExpanded(false);
        navigate("/LoginPage");
        window.location.reload() //not needed with proper state management
    };

    if (loading) {
        return <div className="nav-link p-0 pb-1">Loading...</div>;
    }

    if (user) {
        return (
            <NavDropdown 
                title={`Hello, ${user.name?.split(" ")[0] || 'User'}`} 
                id="user-dropdown"
            >
                {/* Changed to Dropdown.Item with as={Link} for better Bootstrap integration */}
                <Dropdown.Item
                    as={Link}
                    to="/ProfilePage"
                    onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
                >
                    Profile
                </Dropdown.Item>

                {/* Fixed role check - now properly checks user.role */}
                {(user.role === 'educator' || user.role === 'admin') && (
                    <Dropdown.Item
                        as={Link}
                        to="/AdminDashboard"
                        onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
                    >
                        Dashboard
                    </Dropdown.Item>
                )}

                <Dropdown.Item onClick={handleLogout}>
                    Logout
                </Dropdown.Item>
            </NavDropdown>
        );
    }

    // Added Login link and fixed Register link styling
    return (
        <>
            <Link
                to="/LoginPage"
                className={`nav-link ${location.pathname === "/LoginPage" ? "active" : ""} p-0 pb-1 me-2`}
                onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
            >
                Login
            </Link>
            <Link
                to="/RegisterPage"
                className={`nav-link ${location.pathname === "/RegisterPage" ? "active" : ""} p-0 pb-1`}
                onClick={() => setTimeout(() => setExpanded(false), closeDelay)}
            >
                Register
            </Link>
        </>
    );
};

export default LoginLink;