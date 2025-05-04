import { Outlet } from "react-router-dom";
import { Box, IconButton, Drawer, List, ListItem, ListItemText, TextField, Typography, useMediaQuery, Button, Menu, MenuItem, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useState, useContext, useEffect } from "react";
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import QuickOffersSlider from "./QuickOfferSlider";
import Footer from "./Footer";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [user]);

  const userButton = user?.username ? (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: '#fff', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Person fontSize="small" />
        {user?.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            zIndex: 1500,
            fontSize: '0.9rem'
          }
        }}
      >
        <MenuItem dense onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      onClick={() => navigate('/login')}
      sx={{ color: '#fff', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
    >
      <Person fontSize="small" />
      Inicia sesión
    </Button>
  );

  return (
    <>
      <Box>
        <QuickOffersSlider />
      </Box>

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
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <img
            src={MicoLogo}
            style={{ width: isSmallScreen ? '100px' : isMediumScreen ? '120px' : '140px', filter: 'invert(1)' }}
            alt="MICO"
          />
        </Box>

        {!isSmallScreen && (
          <TextField
            variant="outlined"
            placeholder="Buscar productos..."
            sx={{
              width: isMediumScreen ? '30%' : '40%',
              backgroundColor: '#fff',
              borderRadius: '5px'
            }}
            size="small"
          />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isSmallScreen && (
            <IconButton sx={{ color: '#fff', fontSize: 'large' }}>
              <SearchIcon fontSize="large" />
            </IconButton>
          )}

          {userButton}

          <IconButton onClick={() => setMenuOpen(true)} sx={{ color: '#fff', fontSize: 'large' }}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

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

      <Footer />
    </>
  );
};

export default MainLayout;