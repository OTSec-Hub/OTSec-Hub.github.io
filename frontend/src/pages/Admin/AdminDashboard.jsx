import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";
import { useTheme } from "styled-components";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import styled from "styled-components";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

// Styled typography that adapts to theme
const ThemedTypography = styled(Typography)`
  color: ${({ theme }) =>
        theme.name === "light"
            ? "rgba(33, 37, 41, 0.85)"
            : "rgba(255, 255, 255, 0.8)"} !important;
`;

export default function AdminDashboard() {
    const theme = useTheme();

    const [stats, setStats] = useState({});

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/analytics`
                );
                setStats(res.data); // <-- res.data must have keys matching totalUsers, totalVideos etc.
            } catch (err) {
            }
        }
        fetchStats();
    }, []);

    const items = [
        {
            label: "Total Users",
            value: stats.users,
            icon: <PeopleIcon fontSize="large" color="primary" />,
        },
        {
            label: "Total Videos",
            value: stats.videos,
            icon: <VideoLibraryIcon fontSize="large" color="secondary" />,
        },
        {
            label: "Total Labs",
            value: stats.labs,
            icon: <QuizIcon fontSize="large" style={{ color: "orange" }} />,
        },
        {
            label: "Total Submissions",
            value: stats.submissions,
            icon: <CheckCircleIcon fontSize="large" style={{ color: "green" }} />,
        },
        {
            label: "Submitted Exercises",
            value: stats.exercises,
            icon: <PersonIcon fontSize="large" style={{ color: "purple" }} />,
        },
    ];

    return (
        <Box
            display="flex"
            minHeight="100vh"
            sx={{
                backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529",
            }}
        >
            <Sidebar />

            <Box flexGrow={1} p={4}>
                <Box>
                    <ThemedTypography variant="h5" fontWeight={600} mb={3}>
                        Admin Analytics
                    </ThemedTypography>

                    {/* Tower Analytics Grid */}
                    <Grid container spacing={3}>
                        {items.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                    <CardContent style={{
                                        backgroundColor: theme.name === "light" ? "#e9ecef" : "#343a40",
                                    }} className="flex flex-col items-center text-center">
                                        {item.icon}
                                        <Typography style={{
                                            color: theme.name === "light" ? " #343a40" : "#e9ecef",
                                        }} variant="h5" fontWeight="bold">
                                            {item.value}
                                        </Typography>
                                        <Typography style={{
                                            color: theme.name === "light" ? " #343a40" : "#e9ecef",
                                        }} variant="body2" color="textSecondary">
                                            {item.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
