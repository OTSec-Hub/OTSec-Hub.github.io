// Sidebar.jsx
import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BarChart3, Users, BookOpen, LineChart } from "lucide-react";
import styled from "styled-components";


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
    { name: "Dashboard", icon: <LineChart />, route: "/AdminDashboard" },
    { name: "User Management", icon: <Users />, route: "/UsersManagment" },
    { name: "Track Progress", icon: <BarChart3 />, route: "/TrackProgress" },
    { name: "Course Management", icon: <BookOpen />, route: "/CourseMAnagment" },
]


const Sidebar = () => {
    return (
        <>
            < SidebarWrapper >
                <Link to="/" className="mb-4">
                    <Button
                        size="md"
                        variant="outline-primary"
                        className="rounded-pill px-4 fw-semibold shadow-sm w-100"
                    >
                        ← Back
                    </Button>
                </Link>

                <Nav className="flex-column">
                    {SidebarItems.map((item) => (
                        <SidebarLink as={NavLink} key={item.name} to={item.route} className="nav-link px-1">
                            {item.icon}
                            {item.name}
                        </SidebarLink>
                    ))}
                </Nav>
            </SidebarWrapper>
        </>
    );
};

export default Sidebar;
