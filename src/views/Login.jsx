import React, { useState, useContext } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Alert,
    Card,
    CardContent,
    Skeleton,
    CircularProgress
} from '@mui/material';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('devl');
    const [password, setPassword] = useState('devl');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${__API__}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 6
            }}
        >
            <Box sx={{ width: 400 }}>
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: 'white',
                        p: 4,
                        minHeight: 250
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" align="center" gutterBottom>
                                Iniciar sesión
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    fullWidth
                                    label="Usuario"
                                    placeholder="devl"
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    type="password"
                                    placeholder="devl"
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && <Alert severity="error">{error}</Alert>}
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Entrar
                                </Button>
                            </form>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default LoginView;