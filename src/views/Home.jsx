import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { 
  Container, Grid, Typography, Box, TextField, IconButton, Drawer, List, ListItem, ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import QuickOffersSlider from '../components/QuickOfferSlider';
import MicoLogo from '../assets/mico-letras.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar tamaños de pantalla
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      
      {/* Encabezado con Logo, Barra de Búsqueda y Menú */}
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

        {/* Iconos de búsqueda y menú a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isSmallScreen && (
            <IconButton sx={{ color: '#fff', fontSize: 'large' }}>
              <SearchIcon fontSize="large" />
            </IconButton>
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

      {/* Sección de Ofertas */}
      <Grid container>
        <QuickOffersSlider />
      </Grid>

      {/* Contenedor de Productos */}
      <Container sx={{ flexGrow: 1, marginTop: '30px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>
          Productos destacados
        </Typography>

        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#fff' }}>
              Cargando productos...
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Footer pegado abajo */}
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
    </Box>
  );
};

export default Home;