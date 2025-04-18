import React, { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import {
  Container, Grid, Typography, Box, TextField, IconButton, Drawer, List, ListItem, ListItemText,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import QuickOffersSlider from '../components/QuickOfferSlider';
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';
import { AccountBoxSharp, Person } from '@mui/icons-material';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container>
        <QuickOffersSlider />
      </Grid>

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
            <Box sx={{ width: '100%', m: 2 }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Grid>
      </Container>

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