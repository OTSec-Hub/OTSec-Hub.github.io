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
import EditBtn from "../../components/Admin/EditBtn";
import DeleteBtn from "../../components/Admin/DeleteBtn";
import styled from "styled-components";

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

export default function UserManagment({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const theme = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredUsers = users.filter((user) => {
        const matchesRole =
            roleFilter === "all" || user.role.toLowerCase() === roleFilter;
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <Box display="flex" minHeight="100vh" sx={{
            backgroundColor: theme?.name === "light" ? "#ffffff" : "#212529"
        }}>
            <Sidebar />

            <Box flexGrow={1} p={4}>
                {children || (
                    <>
                        <ThemedTypography variant="h5" fontWeight={600} mb={3}>
                            All Users
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
                                        label="Search by name or email"
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        fullWidth
                                        sx={{
                                            '& .MuiInputLabel-root': {
                                                color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
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
                                    <FormControl sx={{ minWidth: 150 }}>
                                        <InputLabel
                                            id="role-filter-label"
                                            sx={{
                                                color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                '&.Mui-focused': {
                                                    color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                }
                                            }}
                                        >
                                            Role
                                        </InputLabel>
                                        <Select
                                            labelId="role-filter-label"
                                            value={roleFilter}
                                            label="Role"
                                            onChange={(e) => setRoleFilter(e.target.value)}
                                            size="small"
                                            sx={{
                                                color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme?.name === "light" ? "#ced4da" : "#6c757d",
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme?.name === "light" ? "#adb5bd" : "#495057",
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme?.name === "light" ? "#28a745" : "#28a745", // Keeping green for focus in both themes
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                }
                                            }}
                                        >
                                            <MenuItem
                                                value="all"
                                                sx={{
                                                    color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                    backgroundColor: theme?.name === "light" ? "#ffffff" : "#3a3b3c",
                                                    '&:hover': {
                                                        backgroundColor: theme?.name === "light" ? "#f8f9fa" : "#495057",
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: theme?.name === "light" ? "#e9ecef" : "#495057",
                                                    }
                                                }}
                                            >
                                                All Roles
                                            </MenuItem>
                                            <MenuItem
                                                value="student"
                                                sx={{
                                                    color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                    backgroundColor: theme?.name === "light" ? "#ffffff" : "#3a3b3c",
                                                    '&:hover': {
                                                        backgroundColor: theme?.name === "light" ? "#f8f9fa" : "#495057",
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: theme?.name === "light" ? "#e9ecef" : "#495057",
                                                    }
                                                }}
                                            >
                                                Student
                                            </MenuItem>
                                            <MenuItem
                                                value="educator"
                                                sx={{
                                                    color: theme?.name === "light" ? "rgba(33, 37, 41, 0.85)" : "rgba(255, 255, 255, 0.8)",
                                                    backgroundColor: theme?.name === "light" ? "#ffffff" : "#3a3b3c",
                                                    '&:hover': {
                                                        backgroundColor: theme?.name === "light" ? "#f8f9fa" : "#495057",
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: theme?.name === "light" ? "#e9ecef" : "#495057",
                                                    }
                                                }}
                                            >
                                                Educator
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <ThemedTableContainer component={Paper}>
                                    <Table>
                                        <ThemedTableHead>
                                            <TableRow>
                                                <ThemedTableCell align="center">ID</ThemedTableCell>
                                                <ThemedTableCell align="center">Name</ThemedTableCell>
                                                <ThemedTableCell align="center">Email</ThemedTableCell>
                                                <ThemedTableCell align="center">Role</ThemedTableCell>
                                                <ThemedTableCell align="center">Actions</ThemedTableCell>
                                            </TableRow>
                                        </ThemedTableHead>

                                        <TableBody>
                                            {filteredUsers.map((user) => (
                                                <ThemedTableRow key={user.id} hover>
                                                    <ThemedTableCell align="center">{user.id}</ThemedTableCell>
                                                    <ThemedTableCell align="center">{user.name}</ThemedTableCell>
                                                    <ThemedTableCell align="center">{user.email}</ThemedTableCell>
                                                    <ThemedTableCell align="center">{user.role}</ThemedTableCell>
                                                    <ThemedTableCell align="center">
                                                        <Box display="flex" gap={1} justifyContent="center">
                                                            <EditBtn />
                                                            <DeleteBtn />
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