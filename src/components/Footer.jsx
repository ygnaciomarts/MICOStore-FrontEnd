import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#222',
        color: '#fff',
        marginTop: 'auto'
      }}
    >
      <Typography variant="body2" color="inherit">
        &copy; 2025 MICO. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
