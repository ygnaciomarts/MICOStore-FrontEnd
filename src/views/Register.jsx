import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    gender: '',
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
    const response = await fetch(`${__API__}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        setFormData({
          name: '',
          lastname: '',
          gender: '',
          username: '',
          email: '',
          password: '',
        });
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (err) {
      setMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registro
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Apellido"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Género"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
            Registrarse
          </Button>
          {message && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;