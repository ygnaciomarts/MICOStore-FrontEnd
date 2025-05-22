import { Outlet } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useState, useContext, useEffect } from "react";
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import QuickOffersSlider from "./QuickOfferSlider";
import Footer from "./Footer";
import { AccountCircle } from "@mui/icons-material";
import { SearchCheck, Search, User, ShoppingBag, ShoppingCart } from "lucide-react";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const { user, sessionExpired, clearSessionExpired, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [sessionExpiredAlert, setSessionExpiredAlert] = useState(false);

  const [hideSlider, setHideSlider] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        setHideSlider(true);
      } else if (scrollTop < lastScrollTop) {
        setHideSlider(false);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    setAnchorEl(null);
  }, [user]);

  useEffect(() => {
    if (sessionExpired) {
      setSessionExpiredAlert(true);
      clearSessionExpired();
      logout();
      navigate('/login');
    }
  }, [sessionExpired, clearSessionExpired, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdmin = () => {
    navigate('/admin/dashboard');
  };

  const handleProducts = () => {
    navigate('/admin/products');
  };

  const userButton = user?.username ? (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: '#fff', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <User />
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
        <MenuItem dense onClick={handleAdmin}>Admin tools</MenuItem>
        <MenuItem dense onClick={handleProducts}>Product tools</MenuItem>
        <MenuItem dense onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton onClick={() => navigate('/login')} sx={{ color: '#fff', fontSize: 'large' }}>
      <User />
    </IconButton>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      {!hideSlider && (
        <Box>
          <QuickOffersSlider />
        </Box>
      )}

      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1300,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          backgroundColor: '#222',
          flexShrink: 0,
        }}
      >
        {!isSmallScreen && (
          <Box sx={{ position: 'absolute', left: 180, maxWidth: '250px', width: isMediumScreen ? '10%' : '20%' }}>
            <TextField
              variant="outlined"
              placeholder="Buscar productos"
              sx={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '5px',
              }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        )}

        <Box
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <img
            src={MicoLogo}
            style={{
              width: isSmallScreen ? '110px' : isMediumScreen ? '140px' : '170px',
              filter: 'invert(1)',
              display: 'block'
            }}
            alt="MICO"
          />
        </Box>

        <Box sx={{ position: 'absolute', right: 180, display: 'flex', alignItems: 'center', gap: 2 }}>
          {isSmallScreen && (
            <IconButton sx={{ color: '#fff', fontSize: 'large' }}>
              <SearchIcon fontSize="large" />
            </IconButton>
          )}

          {userButton}

          <IconButton onClick={() => setMenuOpen(true)} sx={{ color: '#fff', fontSize: 'large' }}>
            <ShoppingCart />
          </IconButton>
        </Box>
      </Box>

      {/*
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
      */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "2rem",
          minHeight: 0,
        }}
      >
        <Outlet />
      </Box>

      <Snackbar
        open={sessionExpiredAlert}
        autoHideDuration={6000}
        onClose={() => setSessionExpiredAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" sx={{ width: '100%' }} onClose={() => setSessionExpiredAlert(false)}>
          Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default MainLayout;