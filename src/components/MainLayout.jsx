import { Outlet } from "react-router-dom";
import { Box, IconButton, Drawer, List, ListItem, ListItemText, TextField, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useState, useContext } from "react";
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          backgroundColor: '#222'
        }}
      >
        {/* Logo a la izquierda */}
        <img
          src={MicoLogo}
          style={{ width: isSmallScreen ? '150px' : isMediumScreen ? '160px' : '200px', filter: 'invert(1)' }}
          alt="MICO"
        />

        {/* Barra de búsqueda con tamaño dinámico */}
        {!isSmallScreen && (
          <TextField
            variant="outlined"
            placeholder="Buscar productos..."
            sx={{
              width: isMediumScreen ? '30%' : '40%',
              backgroundColor: '#fff',
              borderRadius: '5px'
            }}
          />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isSmallScreen && (
            <IconButton sx={{ color: '#fff', fontSize: 'large' }}>
              <SearchIcon fontSize="large" />
            </IconButton>
          )}

          {user?.username && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                backgroundColor: '#444',
                padding: '6px 12px',
                borderRadius: '20px'
              }}
            >
              <Person sx={{ color: '#fff' }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                {user.username}
              </Typography>
            </Box>
          )}

          <IconButton onClick={() => setMenuOpen(true)} sx={{ color: '#fff', fontSize: 'large' }}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Sidebar (Menú de navegación) */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List sx={{ width: 400, height: '100vh', backgroundColor: '#333', color: '#fff' }}>
          <ListItem button onClick={() => setMenuOpen(false)}>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button onClick={() => setMenuOpen(false)}>
            <ListItemText primary="Productos" />
          </ListItem>
          <ListItem button onClick={() => setMenuOpen(false)}>
            <ListItemText primary="Contacto" />
          </ListItem>
        </List>
      </Drawer>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;