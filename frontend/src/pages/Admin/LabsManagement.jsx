import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from 'styled-components';
import {
    Box,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Pagination
} from "@mui/material";
import Sidebar from "../../components/Admin/AdminSidebar";
import EditBtn from "../../components/Admin/EditBtn";
import DeleteBtn from "../../components/Admin/DeleteBtn";
import styled from "styled-components";
import AddBtn from './../../components/Admin/AddBtn';
import AddLab from "../../components/Admin/AddLab";
import EditLab from "../../components/Admin/EditLab";

// Styled components
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

const StyledPagination = styled(Pagination)`
  .MuiPagination-ul {
    justify-content: center;
  }
  .MuiPaginationItem-root {
    color: #28a745;
    background-color: #222;
    border-color: #444;
  }
  .MuiPaginationItem-root.Mui-selected {
    background-color: #28a745;
    color: #222;
    border-color: #28a745;
  }
  .MuiPaginationItem-root.Mui-disabled {
    color: #666;
    background-color: #222;
    border-color: #444;
  }
`;

export default function LabsManagement({ children }) {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const labsPerPage = 9;

    const theme = useTheme();

    const fetchData = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_labs`, {
                params: { page, limit: labsPerPage, search }
            });
            setLabs(response.data.items || []);
            setTotalPages(Math.ceil(response.data.total / labsPerPage));
        } catch (error) {
            console.error("Error fetching labs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activePage, searchQuery);
    }, [activePage, searchQuery]);

    useEffect(() => {
        setActivePage(1);
    }, [searchQuery]);

    return (
        <Box display="flex" minHeight="100vh" sx={{
            backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529"
        }}>
            <Sidebar />

            <Box flexGrow={1} p={4}>
                {children || (
                    <>
                        <ThemedTypography variant="h5" fontWeight={600} mb={3}>
                            All Labs
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
                                        label="Search by Name"
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        fullWidth
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                color: theme?.name === "light" ? "#212529" : "rgba(255, 255, 255, 0.8)",
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
                                    <AddLab />
                                </Box>

                                {labs.length === 0 ? (
                                    <Box display="flex" justifyContent="center" mt={5}>
                                        <ThemedTypography variant="h6">
                                            No labs found matching your search.
                                        </ThemedTypography>
                                    </Box>
                                ) : (
                                    <>
                                        <ThemedTableContainer component={Paper}>
                                            <Table>
                                                <ThemedTableHead>
                                                    <TableRow>
                                                        <ThemedTableCell align="center">ID</ThemedTableCell>
                                                        <ThemedTableCell align="center">Image</ThemedTableCell>
                                                        <ThemedTableCell align="center">Title</ThemedTableCell>
                                                        <ThemedTableCell align="center">Content</ThemedTableCell>
                                                        <ThemedTableCell align="center">Actions</ThemedTableCell>
                                                    </TableRow>
                                                </ThemedTableHead>

                                                <TableBody>
                                                    {labs.map((labData) => (
                                                        <ThemedTableRow key={labData.id} hover>
                                                            <ThemedTableCell align="center">{labData.id}</ThemedTableCell>
                                                            <ThemedTableCell align="center">
                                                                <img src={labData.lab_img} alt={labData.title} style={{ maxHeight: '50px', maxWidth: '100px' }} />
                                                            </ThemedTableCell>
                                                            <ThemedTableCell align="center">{labData.title}</ThemedTableCell>
                                                            <ThemedTableCell align="center">
                                                                <Box
                                                                    sx={{
                                                                        margin: '0 auto',
                                                                        maxWidth: 400,
                                                                        maxHeight: 100,
                                                                        overflow: 'auto',
                                                                        whiteSpace: 'pre-wrap',
                                                                        wordWrap: 'break-word',
                                                                    }}
                                                                >
                                                                    {labData.content}
                                                                </Box>
                                                            </ThemedTableCell>
                                                            <ThemedTableCell align="center">
                                                                <Box display="flex" gap={1} justifyContent="center">
                                                                    <EditLab lab={labData} />
                                                                    <DeleteBtn name="lab" id={labData.id} />
                                                                </Box>
                                                            </ThemedTableCell>
                                                        </ThemedTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </ThemedTableContainer>

                                        {totalPages > 1 && (
                                            <Box display="flex" justifyContent="center" mt={4}>
                                                <StyledPagination
                                                    count={totalPages}
                                                    page={activePage}
                                                    onChange={(event, page) => setActivePage(page)}
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                />
                                            </Box>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
