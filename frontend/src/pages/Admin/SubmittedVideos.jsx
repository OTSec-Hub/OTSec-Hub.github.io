import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "styled-components";
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
    Modal,
    Button,
} from "@mui/material";
import Sidebar from "../../components/Admin/AdminSidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled components (unchanged)
const ThemedTableContainer = styled(TableContainer)`
  background-color: ${({ theme }) => (theme.name === "light" ? "#f8f9fa" : "#3a3b3c")};
  border-radius: 8px;
`;

const ThemedTableCell = styled(TableCell)`
  color: ${({ theme }) =>
        theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"} !important;
  border-color: ${({ theme }) => (theme.name === "light" ? "#dee2e6" : "#495057")} !important;
`;

const ThemedTableHead = styled(TableHead)`
  background-color: ${({ theme }) => (theme.name === "light" ? "#e9ecef" : "#343a40")} !important;
`;

const ThemedTableRow = styled(TableRow)`
  background-color: ${({ theme }) => (theme.name === "light" ? "#f8f9fa" : "#3a3b3c")} !important;
`;

const ThemedTypography = styled(Typography)`
  color: ${({ theme }) =>
        theme.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)"} !important;
`;

const EditButton = styled(Button)`
  && {
    background-color: #ffe100ff;
    color: black;
    &:hover {
      background-color: #fff828ff;
    }
  }
`;

const DeleteButton = styled(Button)`
  && {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }
`;

export default function SubmittedVideos({ children }) {
    const [submittedVideos, setSubmittedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [message, setMessage] = useState("");

    const theme = useTheme();
    const token = localStorage.getItem("token"); // Get JWT token from localStorage

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_communityVideos`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubmittedVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
                alert("Failed to fetch videos. Please check your login status.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleEdit = async () => {
        if (!token) {
            alert("Please log in to edit a video.");
            return;
        }
        try {
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/api/update_communityVideo/${selectedVideoId}`,
                { status: selectedStatus, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubmittedVideos((prevVideos) =>
                prevVideos.map((video) =>
                    video.id === selectedVideoId ? { ...video, status: selectedStatus, message } : video
                )
            );
            setEditModalOpen(false);
            setSelectedVideoId(null);
            setSelectedStatus("");
            setMessage("");
        } catch (error) {
            console.error("Failed to update video:", error);
            alert("Failed to update video. Please check your login status.");
        }
    };

    const handleDelete = async () => {
        if (!token) {
            alert("Please log in to delete a video.");
            return;
        }
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/delete_communityVideo/${selectedVideoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubmittedVideos((prevVideos) => prevVideos.filter((video) => video.id !== selectedVideoId));
            setDeleteModalOpen(false);
            setSelectedVideoId(null);
        } catch (error) {
            console.error("Failed to delete video:", error);
            alert("Failed to delete video. Please check your login status.");
        }
    };

    const handleOpenEditModal = (video) => {
        setSelectedVideoId(video.id);
        setSelectedStatus(video.status || "pending");
        setMessage(video.message || "");
        setEditModalOpen(true);
    };

    const handleOpenDeleteModal = (video) => {
        setSelectedVideoId(video.id);
        setDeleteModalOpen(true);
    };

    const filteredVideos = submittedVideos.filter(
        (v) =>
            v.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: theme.name === "light" ? "background.paper" : "#1e1e1e",
        color: theme.name === "light" ? "#000" : "#fff",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        outline: "none",
    };

    function getYouTubeVideoId(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === "youtu.be") {
                return parsed.pathname.slice(1);
            } else if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") {
                return parsed.searchParams.get("v");
            }
            return null;
        } catch (err) {
            console.error("Invalid YouTube URL:", err);
            return null;
        }
    }

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
                {children || (
                    <>
                        <ThemedTypography variant="h5" fontWeight={600} mb={3}>
                            All Community Videos
                        </ThemedTypography>

                        {loading ? (
                            <Box display="flex" justifyContent="center" mt={5}>
                                <CircularProgress
                                    sx={{
                                        color: theme?.name === "light" ? "#28a745" : "#6c757d",
                                    }}
                                />
                            </Box>
                        ) : (
                            <>
                                <Box display="flex" gap={2} mb={2} alignItems="center">
                                    <TextField
                                        label="Search by Name or Title"
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        fullWidth
                                        sx={{
                                            "& .MuiInputLabel-root": {
                                                color: theme?.name === "light" ? "#212529" : "rgba(255, 255, 255, 0.8)",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: theme?.name === "light" ? "#ced4da" : "#6c757d",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: theme?.name === "light" ? "#adb5bd" : "#495057",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                            },
                                        }}
                                    />
                                </Box>

                                <ThemedTableContainer component={Paper}>
                                    <Table>
                                        <ThemedTableHead>
                                            <TableRow>
                                                <ThemedTableCell align="center">Video</ThemedTableCell>
                                                <ThemedTableCell align="center">Member Name</ThemedTableCell>
                                                <ThemedTableCell align="center">Title</ThemedTableCell>
                                                <ThemedTableCell align="center">Subtitle</ThemedTableCell>
                                                <ThemedTableCell align="center">Description</ThemedTableCell>
                                                <ThemedTableCell align="center">Status</ThemedTableCell>
                                                <ThemedTableCell align="center">Actions</ThemedTableCell>
                                            </TableRow>
                                        </ThemedTableHead>
                                        <TableBody>
                                            {filteredVideos.map((video) => (
                                                <ThemedTableRow key={video.id} hover>
                                                    <ThemedTableCell align="center">
                                                        <Link to={video.url} target="_blank" rel="noopener noreferrer">
                                                            <img
                                                                src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/sddefault.jpg`}
                                                                alt={video.title}
                                                                style={{ maxHeight: "50px", maxWidth: "100px" }}
                                                            />
                                                        </Link>
                                                    </ThemedTableCell>
                                                    <ThemedTableCell align="center">
                                                        {video.user_name} ({video.created_at?.substring(0, 10)})
                                                    </ThemedTableCell>
                                                    <ThemedTableCell align="center">{video.title}</ThemedTableCell>
                                                    <ThemedTableCell align="center">{video.subtitle}</ThemedTableCell>
                                                    <ThemedTableCell align="center">{video.description}</ThemedTableCell>
                                                    <ThemedTableCell align="center">
                                                        <div
                                                            className={`alert d-inline-block py-2 px-3 m-0 ${video.status.toLowerCase() === "pending"
                                                                    ? "alert-warning"
                                                                    : video.status.toLowerCase() === "approved"
                                                                        ? "alert-success"
                                                                        : video.status.toLowerCase() === "rejected"
                                                                            ? "alert-danger"
                                                                            : "alert-secondary"
                                                                }`}
                                                            style={{ fontWeight: 600, textTransform: "capitalize" }}
                                                        >
                                                            {video.status}
                                                        </div>
                                                    </ThemedTableCell>
                                                    <ThemedTableCell align="center">
                                                        <Box display="flex" gap={1} justifyContent="center">
                                                            <EditButton onClick={() => handleOpenEditModal(video)}>
                                                                Edit
                                                            </EditButton>
                                                            <DeleteButton onClick={() => handleOpenDeleteModal(video)}>
                                                                Delete
                                                            </DeleteButton>
                                                        </Box>
                                                    </ThemedTableCell>
                                                </ThemedTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ThemedTableContainer>

                                {/* Edit Modal */}
                                <Modal
                                    open={editModalOpen}
                                    onClose={() => setEditModalOpen(false)}
                                    aria-labelledby="edit-modal-title"
                                    aria-describedby="edit-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography
                                            id="edit-modal-title"
                                            variant="h6"
                                            component="h2"
                                            mb={2}
                                            color={theme.name === "light" ? "black" : "white"}
                                        >
                                            Edit Video
                                        </Typography>
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <InputLabel
                                                sx={{
                                                    color: theme.name === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
                                                }}
                                            >
                                                Status
                                            </InputLabel>
                                            <Select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                sx={{
                                                    color: theme.name === "light" ? "black" : "white",
                                                    "& .MuiSvgIcon-root": {
                                                        color: theme.name === "light" ? "black" : "white",
                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: theme.name === "light" ? "#ced4da" : "#6c757d",
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: theme.name === "light" ? "#adb5bd" : "#495057",
                                                    },
                                                }}
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="approved">Approved</MenuItem>
                                                <MenuItem value="rejected">Rejected</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Message"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: {
                                                    color: theme.name === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
                                                },
                                            }}
                                            inputProps={{
                                                style: {
                                                    color: theme.name === "light" ? "black" : "white",
                                                },
                                            }}
                                        />
                                        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                            <Button variant="outlined" onClick={() => setEditModalOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={handleEdit}>
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>

                                {/* Delete Confirmation Modal */}
                                <Modal
                                    open={deleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    aria-labelledby="delete-modal-title"
                                    aria-describedby="delete-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <Typography
                                            id="delete-modal-title"
                                            variant="h6"
                                            component="h2"
                                            mb={2}
                                            color={theme.name === "light" ? "black" : "white"}
                                        >
                                            Confirm Delete
                                        </Typography>
                                        <Typography
                                            id="delete-modal-description"
                                            mb={3}
                                            color={theme.name === "light" ? "black" : "white"}
                                        >
                                            Are you sure you want to delete this video? This action cannot be undone.
                                        </Typography>
                                        <Box display="flex" justifyContent="flex-end" gap={2}>
                                            <Button variant="contained" color="error" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                            <Button variant="outlined" onClick={() => setDeleteModalOpen(false)}>
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}