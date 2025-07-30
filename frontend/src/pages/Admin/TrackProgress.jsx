import React, { useEffect, useState } from "react";
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4CAF50", "#f39821", "#E0E0E0"];

// Styled MUI Accordion
const Accordion = styled(MuiAccordion)`
  background-color: ${({ theme, expanded }) =>
    expanded
      ? theme.name === "light"
        ? "#c8dadf"
        : "#3a4750"
      : theme.name === "light"
        ? "#dee2e6"
        : "#495057"};
  color: ${({ theme }) =>
    theme.name === "light" ? "#212529" : "#ffffffd9"};
  border-radius: 6px;
  margin-bottom: 16px;
`;

// Styled Typography
const ThemedTypography = styled(Typography)`
  color: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(33, 37, 41, 0.85)"
      : "rgba(255, 255, 255, 0.8)"};
`;

const TrackProgress = () => {
  const [membersProgress, setMembersProgress] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/progress/stats`
        );

        const progressData = response.data.map((member) => ({
          id: member.user_id,
          name: member.name,
          completedVideos: member.completed_videos,
          remainingVideos: member.remaining_videos,
          completedQuizzes: member.completed_quizzes,
          remainingQuizzes: member.remaining_quizzes,
          completedLabs: member.completed_labs,
          remainingLabs: member.remaining_labs,
        }));

        setMembersProgress(progressData);
      } catch (err) {
        console.error("Failed to fetch member progress", err);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) =>
      isExpanded
        ? [...prevExpanded, panel]
        : prevExpanded.filter((id) => id !== panel) 
    );
  };

  const filteredMembers = membersProgress.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          Member Progress Tracker
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
              "& .MuiInputLabel-root": {
                color: theme?.name === "light" ? "#212529" : "#ffffff",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme?.name === "light" ? "#ced4da" : "#6c757d",
                },
                "&:hover fieldset": {
                  borderColor:
                    theme?.name === "light" ? "#adb5bd" : "#495057",
                },
              },
              "& .MuiInputBase-input": {
                color:
                  theme?.name === "light"
                    ? "rgba(33, 37, 41, 0.85)"
                    : "rgba(255, 255, 255, 0.8)",
              },
            }}
          />
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          {filteredMembers.map((member) => {
            const {
              id,
              name,
              completedVideos,
              remainingVideos,
              completedQuizzes,
              remainingQuizzes,
              completedLabs,
              remainingLabs,
            } = member;

            const totalVideos = completedVideos + remainingVideos;

            const totalQuizzes = completedQuizzes + remainingQuizzes;

            const totalLabs = completedLabs + remainingLabs;

            const totalCompleted = completedLabs + completedQuizzes + completedVideos
            const totalItems = totalLabs + totalQuizzes + totalVideos

            const overallPercent = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0

            const percentQuizzes =
              totalQuizzes > 0
                ? Math.round((completedQuizzes / totalQuizzes) * 100)
                : 0;


            const percentVideos =
              totalVideos > 0
                ? Math.round((completedVideos / totalVideos) * 100)
                : 0;

            return (
              <Box
                key={id}
                sx={{
                  flex: "1 1 100%",
                  "@media (min-width: 768px)": {
                    flex: "1 1 calc(50% - 16px)",
                  },
                }}
              >
                <Accordion
                  expanded={expanded.includes(id)}
                  onChange={handleChange(id)}
                  theme={theme}
                  sx={{
                    backgroundColor:
                      theme?.name === "light" ? "#e9ecef" : "#343a40",
                    color:
                      theme?.name === "light" ? "#212529" : "#cecfd0",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography fontWeight={500}>{name}</Typography>
                      <Typography>{overallPercent}% Completed</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor:
                        theme?.name === "light" ? "#f8f9fa" : "#3a3b3c",
                      color:
                        theme?.name === "light" ? "#212529" : "#cecfd0",
                      padding: "50px 0px",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ padding: "0 20px" }}
                      gap={4}
                      flexWrap="wrap"
                    >
                      <Box height={270} width={270}>
                        <Typography
                          textAlign="center"
                          variant="subtitle2"
                          mb={1}
                          color={
                            theme?.name === "light" ? "#212529" : "#cecfd0"
                          }
                        >
                          Video and Quiz Progress
                        </Typography>
                        <Doughnut
                          data={{
                            labels: [
                              "Completed Videos",
                              "Completed Quizzes",
                              "Completed Labs",
                              "Remaining",
                              // "Remaining Quizzes",
                              // "Remaining Labs",
                            ],
                            datasets: [
                              {
                                data: [
                                  completedVideos,
                                  completedQuizzes,
                                  completedLabs,
                                  remainingVideos + remainingQuizzes + remainingLabs,
                                  // remainingVideos,
                                  // remainingQuizzes,
                                  // remainingLabs
                                ],
                                backgroundColor: [
                                  "#4CAF50",
                                  "#f39821",
                                  "#2196F3", // New color for labs
                                  "#E0E0E0",
                                  // "#B0B0B0",
                                  // "#78909C", //
                                ],
                                borderWidth: 1,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  color: theme?.name === "light" ? "#212529" : "#cecfd0",
                                },
                              },
                            },
                          }}
                        />
                      </Box>
                      <Box maxWidth={400} overflow="auto">
                        <div className="text-start mt-4">
                          <p>
                            🎥 <strong>Videos Watched:</strong> {completedVideos} / {totalVideos}
                          </p>
                          <p>
                            📝 <strong>Video Quizzes:</strong> {completedQuizzes} / {totalQuizzes}
                          </p>
                          <p>
                            🧪 <strong>Lab Quizzes:</strong> {completedLabs} / {totalLabs}
                          </p>
                        </div>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TrackProgress;