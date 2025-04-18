import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8081/auth/login', {
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
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ width: 400 }}>
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: 'white',
                        p: 4,
                    }}
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Iniciar sesión
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Usuario"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
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
                </Box>
            </Box>
        </Box>
    );
};

export default LoginView;