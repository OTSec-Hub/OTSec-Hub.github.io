import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const students = [
  {
    id: 1,
    name: "John Doe",
    completedVideos: 8,
    totalVideos: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    completedVideos: 5,
    totalVideos: 10,
  },
  {
    id: 3,
    name: "Alice Johnson",
    completedVideos: 10,
    totalVideos: 10,
  },
];

const COLORS = ["#4CAF50", "#E0E0E0"];

const TrackProgress = () => {
  return (
    <Box p={4} maxWidth={600} margin="auto">
      <Typography variant="h4" mb={3}>
        Student Progress Tracker
      </Typography>

      {students.map((student) => {
        const completed = student.completedVideos;
        const remaining = student.totalVideos - completed;
        const percent = Math.round((completed / student.totalVideos) * 100);

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
            },
          },
        };

        return (
          <Accordion key={student.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flexGrow: 1 }}>
                {student.name} (ID: {student.id})
              </Typography>
              <Typography>{percent}% Completed</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent="center">
                <Doughnut data={data} options={options} />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default TrackProgress;
