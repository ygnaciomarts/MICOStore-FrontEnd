import React from 'react';
import { Box, Typography, Grid, Link, IconButton, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '40px 20px 20px 20px',
        mt: 'auto',
      }}
    >
      <Grid container spacing={4} maxWidth="lg" mx="auto" mb={6}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontSize={16} fontWeight={700} gutterBottom>
            CONTÁCTANOS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography>shopmicomx@gmail.com</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography>+52 871 400 2601</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography>-</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontSize={16} fontWeight={700} gutterBottom>
            ENLACES RÁPIDOS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/" color="inherit" underline="hover" sx={{ mb: 0.5 }}>
              Inicio
            </Link>
            <Link href="/productos" color="inherit" underline="hover" sx={{ mb: 0.5 }}>
              Productos
            </Link>
            <Link href="/nosotros" color="inherit" underline="hover" sx={{ mb: 0.5 }}>
              Nosotros
            </Link>
            <Link href="/contacto" color="inherit" underline="hover" sx={{ mb: 0.5 }}>
              Contacto
            </Link>
            <Link href="/faq" color="inherit" underline="hover">
              Preguntas Frecuentes
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontSize={16} fontWeight={700} gutterBottom>
            SÍGUENOS
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              href="https://facebook.com/shopmicomx"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#fff', pl: 0 }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              href="https://instagram.com/shopmicomx"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#fff', pl: 0}}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ m: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      <Typography variant="body2" color="inherit" textAlign="center">
        &copy; 2025 MICO. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}