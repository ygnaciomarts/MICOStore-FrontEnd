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
  Divider,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useContext, useEffect } from "react";
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import QuickOffersSlider from "./QuickOfferSlider";
import Footer from "./Footer";
import { AccountCircle } from "@mui/icons-material";
import { SearchCheck, Search, User, ShoppingBag, ShoppingCart, LogOut, Cog, ChevronDown } from "lucide-react";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  const horizontalPaddingValues = {
    xs: 3,
    sm: 8.5,
    md: 12,
    lg: 16,
    xl: 24
  };

  let horizontalPadding = horizontalPaddingValues.xs;
  if (isSm) horizontalPadding = horizontalPaddingValues.sm;
  if (isMd) horizontalPadding = horizontalPaddingValues.md;
  if (isLg) horizontalPadding = horizontalPaddingValues.lg;
  if (isXl) horizontalPadding = horizontalPaddingValues.xl;

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
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  const isAdmin = user?.roles?.includes('ADMIN');

  const userButton = user?.username ? (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: '#fff', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <User />
        {!isMediumScreen && user?.username}
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
        {isAdmin && (
          <Box>
            <MenuItem dense onClick={() => { setAnchorEl(null); navigate('/admin'); }} sx={{ gap: 1 }}>
              <Cog size={20} />
              Admin dashboard
            </MenuItem>
            <Divider />
          </Box>
        )}
        <MenuItem dense onClick={handleLogout} sx={{ gap: 1 }}>
          <LogOut size={20} />
          Cerrar sesión
        </MenuItem>
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
        {!isSmallScreen ? (
          <Box sx={{ position: 'absolute', left: theme.spacing(horizontalPadding), maxWidth: '250px', width: isMediumScreen ? '15%' : '20%' }}>
            <TextField
              variant="outlined"
              placeholder="Buscar..."
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
        ) : (
          <IconButton
            onClick={() => setMenuOpen(true)}
            sx={{ position: 'absolute', left: theme.spacing(horizontalPadding), color: '#fff', fontSize: 'large' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <img
            src={MicoLogo}
            style={{
              width: isSmallScreen ? '130px' : isMediumScreen ? '140px' : '170px',
              filter: 'invert(1)',
              display: 'block'
            }}
            alt="MICO"
          />
        </Box>

        <Box sx={{ position: 'absolute', right: theme.spacing(horizontalPadding), display: 'flex', alignItems: 'center', gap: 2 }}>
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

      {!isSmallScreen && (
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#fff',
            py: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        >

          <Box
            sx={{
              display: 'flex',
              gap: 4,
              maxWidth: '1600px',
              width: '100%',
              px: {
                xs: 2,
                sm: 3,
                md: 4,
                lg: 6,
                xl: 8,
              },
              justifyContent: 'center',
            }}
          >
            <Button variant="text" sx={{ color: '#000' }} endIcon={<ChevronDown />}>
              Categoría 1
            </Button>
            <Button variant="text" sx={{ color: '#000' }} endIcon={<ChevronDown />}>
              Categoría 2
            </Button>
            <Button variant="text" sx={{ color: '#000' }} endIcon={<ChevronDown />}>
              Categoría 3
            </Button>
          </Box>

        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          mt: '15px',
          mb: '30px',
          width: '100%',
          px: {
            xs: 2,
            sm: 4,
            md: 8,
            lg: 12,
            xl: 20,
          },
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