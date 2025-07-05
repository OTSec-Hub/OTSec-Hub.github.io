import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from 'styled-components'; // Changed from MUI theme
import {
    Box,
    Select,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from "@mui/material";
import Sidebar from "../../components/Admin/AdminSidebar";
import styled from "styled-components";
import AddVideo from "../../components/Admin/AddVideo";
import { Link } from "react-router-dom";
import EditVideoBtn from "../../components/Admin/EditVideoBtn";
import DeleteVideoBtn from "../../components/Admin/DeleteVideoBtn";

// Simple themed components
const ThemedTableContainer = styled(TableContainer)`
  background-color: ${({ theme }) => theme.name === "light" ? "#f8f9fa" : "#3a3b3c"};
  border-radius: 8px;
`;

const ThemedTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"} !important;
  border-color: ${({ theme }) => theme.name === "light" ? "#dee2e6" : "#495057"} !important;
`;

const ThemedTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.name === "light" ? "#e9ecef" : "#343a40"} !important;
`;

const ThemedTableRow = styled(TableRow)`
    background-color: ${({ theme }) => theme.name === "light" ? "#f8f9fa" : "#3a3b3c"} !important;
`;

const ThemedTypography = styled(Typography)`
  color: ${({ theme }) => theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"} !important;
`;



export default function VideoManagement({ children }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    const theme = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/video/get_videos`);
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } 
        }
        fetchData();
    }, []);

    const filteredVideos = videos.filter((video) => {
        const matchesSearch =
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch;
    });

    function getYouTubeVideoId(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname.slice(1);
            } else if (
                parsed.hostname === 'www.youtube.com' ||
                parsed.hostname === 'youtube.com'
            ) {
                return parsed.searchParams.get('v');
            }
            return null;
        } catch (err) {
            console.error('Invalid YouTube URL:', err);
            return null;
        }
    }

    // console.log(videos[0].id);

    return (
        <Box display="flex" minHeight="100vh" sx={{
            backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529"
        }}>
            <Sidebar />

            <Box flexGrow={1} p={4}>
                {children || (
                    <>
                        <ThemedTypography variant="h5" fontWeight={600} mb={3}>
                            All Videos
                        </ThemedTypography>

                        {loading ? (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <CircularProgress sx={{
                                    color: theme?.name === "light" ? "#28a745" : "#6c757d"
                                }} />
                            </Box>
                        ) : (
                            <>
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
                                    <AddVideo />
                                </Box>

                                <ThemedTableContainer component={Paper}>
                                    <Table>
                                        <ThemedTableHead>
                                            <TableRow>
                                                <ThemedTableCell align="center">ID</ThemedTableCell>
                                                <ThemedTableCell align="center">Title</ThemedTableCell>
                                                <ThemedTableCell align="center">Subtitle</ThemedTableCell>
                                                <ThemedTableCell align="center">Description</ThemedTableCell>
                                                <ThemedTableCell align="center">Actions</ThemedTableCell>
                                            </TableRow>
                                        </ThemedTableHead>

                                        <TableBody>
                                            {filteredVideos.map((video) => (
                                                <ThemedTableRow key={video.id} hover>
                                                    <ThemedTableCell align="center">
                                                        <Link to={video.url} target="_blank" style={{ textDecoration: 'none' }}>
                                                            <img
                                                                src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/sddefault.jpg`}
                                                                alt={video.title}
                                                                style={{ maxHeight: '50px', maxWidth: '100px' }}
                                                            />
                                                        </Link>
                                                    </ThemedTableCell>

                                                    <ThemedTableCell align="center" sx={{
                                                        maxWidth: 200,
                                                        maxHeight: 60,
                                                    }}>{video.title}</ThemedTableCell>

                                                    <ThemedTableCell align="center">
                                                        <Box
                                                            sx={{
                                                                maxWidth: 200,
                                                                maxHeight: 60,
                                                                overflow: 'auto',
                                                                whiteSpace: 'pre-wrap',
                                                                wordWrap: 'break-word',
                                                            }}
                                                        >
                                                            {video.subtitle}
                                                        </Box>
                                                    </ThemedTableCell>

                                                    <ThemedTableCell align="center">
                                                        <Box
                                                            sx={{
                                                                margin: '0 auto',
                                                                maxWidth: 300,
                                                                maxHeight: 100,
                                                                overflow: 'auto',
                                                                whiteSpace: 'pre-wrap',
                                                                wordWrap: 'break-word',
                                                            }}
                                                        >
                                                            {video.description}
                                                        </Box>
                                                    </ThemedTableCell>

                                                    <ThemedTableCell align="center">
                                                        <Box display="flex" justifyContent="center" gap={1}>
                                                            <EditVideoBtn video={video} />
                                                            <DeleteVideoBtn videoId={video.id}  />
                                                        </Box>
                                                    </ThemedTableCell>
                                                </ThemedTableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </ThemedTableContainer>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}