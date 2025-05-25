import React, { useEffect, useState, useContext } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Typography
} from "@mui/material";
import { AuthContext } from "../../AuthContext";
import { authFetch } from "../../util/authFetch";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { token, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && token) {
            fetchUsers();
        }
    }, [loading, token]);

    const fetchUsers = async () => {
        try {
            const data = await authFetch("/admin/users");
            setUsers(data);
            console.log(data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedUser(null);
        setOpen(false);
    };

    const handleChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        console.log(token);
        await authFetch(`/admin/users/${selectedUser.id}`, {
            method: "PUT",
            body: JSON.stringify(selectedUser),
        });
        fetchUsers();
        handleClose();
    };

    const handleDelete = async (id) => {
        await authFetch(`/admin/users/${id}`, {
            method: "DELETE",
        });
        fetchUsers();
    };

    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>
                Admin Users Management
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Birthdate</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(users) && users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName || ""}</TableCell>
                                <TableCell>{user.lastName || ""}</TableCell>
                                <TableCell>{user.gender || ""}</TableCell>
                                <TableCell>{user.birthdate || ""}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(user)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <>
                            <TextField
                                margin="dense"
                                label="Username"
                                name="username"
                                value={selectedUser.username}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="First Name"
                                name="firstName"
                                value={selectedUser.firstName || ""}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Last Name"
                                name="lastName"
                                value={selectedUser.lastName || ""}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Gender"
                                name="gender"
                                value={selectedUser.gender || ""}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Birthdate"
                                name="birthdate"
                                type="date"
                                value={
                                    selectedUser.birthdate
                                        ? selectedUser.birthdate.split("T")[0]
                                        : ""
                                }
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminUsers;