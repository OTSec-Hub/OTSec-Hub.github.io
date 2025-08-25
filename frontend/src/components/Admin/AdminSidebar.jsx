// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BarChart3, Users, BookOpen, LayoutDashboard, Flag, Dumbbell, Video, Settings, LineChart } from "lucide-react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const SidebarWrapper = styled.div`
  width: 300px;
  min-height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-right: 1px solid
    ${({ theme }) => (theme.name === "light" ? "#198754" : "#28a745")};
  transition: var(--transition);
`;


const SidebarLink = styled(NavLink)`
  color: ${({ theme }) =>
        theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"};
  margin-bottom: 1rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) =>
        theme.name === "light" ? "black" : "#fff"};
    background-color: ${({ theme }) =>
        theme.name === "light" ? "#f8f9fa" : "#3a3b3c"};
  }

  &.active {
    color: #28a745;
    border-left: 3px solid #28a745;
    background-color: ${({ theme }) =>
        theme.name === "light" ? "#e9ecef" : "#343a40"};
    font-weight: 600;
  }
`;


const SidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, route: "/AdminDashboard" },
    { name: "User Management", icon: <Users />, route: "/UsersManagment" },
    { name: "Track Progress", icon: <BarChart3 />, route: "/TrackProgress" },
    {
        name: "OTSec-Hub Management", icon: <LineChart />, children: [
            { name: "ICS Labs Management", icon: <BookOpen />, route: "/LabsManagement" },
            { name: "Exercises Management", icon: <Dumbbell />, route: "/ExercisesManagement" },
            { name: "Videos Management", icon: <Video />, route: "/VideosManagement" },

        ]
    },
    {
        name: "Community Managment", icon: <LineChart />, children: [
            { name: "Submitted Labs", icon: <BookOpen />, route: "/SubmittedLabs" },
            { name: "Submitted Videos", icon: <Video />, route: "/SubmittedVideos" },
        ]
    },
    // { name: "Benchmarks Management", icon: <Flag />, route: "/BenchmarksManagement" },
    // { name: "Settings", icon: <Settings />, route: "/Settings" } // Optional
];


const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState([]);
    const location = useLocation()

    const [role, setRole] = useState(null);

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setRole(res.data.role))
                .catch(err => console.error(err));

        } catch (err) {
            console.error("Invalid token", err);
        }
    }, [token]);

    const filteredItems = SidebarItems.filter(item => {
        if (role === "educator" && item.name === "User Management") {
            return false;
        }
        return true;
    });

    const toggleDropdown = (name) => {
        if (openDropdown.includes(name)) {
            setOpenDropdown(openDropdown.filter(item => item !== name))
        } else {
            setOpenDropdown([...openDropdown, name]);
        }
    };

    React.useEffect(() => {
        SidebarItems.forEach((item) => {
            if (item.children) {
                const shouldOpen = item.children.some((child) =>
                    location.pathname.includes(child.route)
                );
                if (shouldOpen && !openDropdown.includes(item.name)) {
                    setOpenDropdown((prev) => [...prev, item.name]);
                }
            }
        });
    }, [location.pathname]);

    return (
        <SidebarWrapper>
            <Link to="/" className="mb-4">
                <Button
                    size="md"
                    variant="outline-primary"
                    className="rounded-pill px-4 fw-semibold shadow-sm w-100"
                >
                    ← Back
                </Button>
            </Link>

            <Nav className="flex-column " >
                {filteredItems.map((item) => (
                    <div key={item.name} >
                        {item.children ? (
                            <>
                                <SidebarLink
                                    as="div"
                                    onClick={() => toggleDropdown(item.name)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {item.icon}
                                    {item.name}
                                    {openDropdown.includes(item.name) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}

                                </SidebarLink>

                                {openDropdown.includes(item.name) && (
                                    <div style={{ marginLeft: "1.5rem" }}>
                                        {item.children.map((child) => (
                                            <SidebarLink
                                                key={child.name}
                                                to={child.route}
                                                className="nav-link px-1"
                                            >
                                                {child.icon}
                                                {child.name}
                                            </SidebarLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <SidebarLink
                                as={NavLink}
                                to={item.route}
                                className="nav-link"
                            >
                                {item.icon}
                                {item.name}
                            </SidebarLink>
                        )}
                    </div>
                ))}
            </Nav>
        </SidebarWrapper>
    );
};

export default Sidebar;
