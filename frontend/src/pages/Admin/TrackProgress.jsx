import React, { use, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Doughnut } from "react-chartjs-2";
import { useTheme, styled } from "styled-components";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4CAF50", "#E0E0E0"];

// Styled MUI Accordion with theme-based colors & expanded styles
const Accordion = styled(MuiAccordion)`
  background-color: ${({ theme, expanded }) =>
    expanded ? (theme.name === "light" ? "#c8dadf" : "#3a4750") :
      (theme.name === "light" ? "#dee2e6" : "#495057")};
  color: ${({ theme }) => (theme.name === "light" ? "#212529" : "#ffffffd9")};
  border-radius: 6px;
  margin-bottom: 16px;
`;

// Styled Typography consistent with theme
const ThemedTypography = styled(Typography)`
  color: ${({ theme }) =>
    theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"};
`;

const TrackProgress = () => {
  const [studentsProgress, setStudentsProgress] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [expanded, setExpanded] = useState(false); // for controlling which Accordion is open
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/video/video_views`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const views = response.data;

        const grouped = {};
        views.forEach((view) => {
          if (!grouped[view.user_id]) {
            grouped[view.user_id] = {
              id: view.user_id,
              name: view.user_name,
              videos: new Set(),
            };
          }
          grouped[view.user_id].videos.add(view.video_title);
        });

        const processed = Object.values(grouped).map((student) => ({
          ...student,
          completedCount: student.videos ? student.videos.size : 0,
          videoList: student.videos ? Array.from(student.videos) : [],
        }));

        setStudentsProgress(processed);
      } catch (err) {
        console.error("Failed to fetch student progress", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/video/get_videos`
        );
        setTotalVideos(response.data.length || 0);
      } catch (err) {
        console.error("Failed to fetch total videos", err);
      }
    };

    fetchStudents();
    fetchVideos();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredStudents = studentsProgress.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
        <ThemedTypography variant="h4" fontWeight={600} mb={3}>
          Student Progress Tracker
        </ThemedTypography>
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': {
                color: theme?.name === "light" ? "#212529" : "#ffffff",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme?.name === "light" ? "#ced4da" : "#6c757d",
                },
                '&:hover fieldset': {
                  borderColor: theme?.name === "light" ? "#adb5bd" : "#495057",
                },
              },
              '& .MuiInputBase-input': {
                color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
              },
            }}
          />
        </Box>
        {filteredStudents.map((student) => {
          const completed = student.completedCount;
          const remaining = totalVideos - completed;
          const percent =
            totalVideos > 0 ? Math.round((completed / totalVideos) * 100) : 0;

          const data = {
            labels: ["Completed", "Remaining"],
            datasets: [
              {
                data: [completed, remaining],
                backgroundColor: COLORS,
                borderWidth: 1,
              },
            ],
          };

          const options = {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: theme?.name === "light" ? "#212529" : "#cecfd0",
                },
              },
            },
          };


          return (
            <Accordion
              key={student.id}
              expanded={expanded === student.id}
              onChange={handleChange(student.id)}
              theme={theme}
              sx={{
                backgroundColor: theme?.name === "light" ? "#e9ecef" : "#343a40",
                color: theme?.name === "light" ? "#212529" : "#cecfd0",
              }}
            // e9ecef
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" justifyContent="space-between" width="100%" >
                  <Typography fontWeight={500}>
                    {student.name} (ID: {student.id})
                  </Typography>
                  <Typography>{percent}% Completed</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{
                backgroundColor: theme?.name === "light" ? "#f8f9fa" : "#3a3b3c",
                color: theme?.name === "light" ? "#212529" : "#cecfd0",
                padding: '16px 0px'
              }}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  gap={4}
                  flexWrap="wrap"
                >
                  <Box height={200} width={200}>
                    <Doughnut data={data} options={options} />
                  </Box>

                  <Box maxWidth={400} overflow="auto">
                    <ThemedTypography
                      variant="subtitle1"
                      fontWeight={500}
                      mb={1}
                    >
                      Watched Videos:
                    </ThemedTypography>
                    {student.videoList.length > 0 ? (
                      <ul style={{ paddingLeft: 20, margin: 0 }}>
                        {student.videoList.map((title, idx) => (
                          <li className="list-unstyled" key={idx}>
                            <ThemedTypography variant="body2">
                              {title}
                            </ThemedTypography>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography>No videos watched yet.</Typography>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrackProgress;
