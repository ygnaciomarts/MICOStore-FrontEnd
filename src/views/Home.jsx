import React, { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import {
  Container, Grid, Typography, Box, TextField, IconButton, Drawer, List, ListItem, ListItemText,
  LinearProgress,
  CircularProgress,
  Skeleton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import QuickOffersSlider from '../components/QuickOfferSlider';
import MicoLogo from '../assets/mico-letras.png';
import { AuthContext } from '../AuthContext';
import { AccountBoxSharp, Person } from '@mui/icons-material';
import HighlightTitle from '../util/HighlightTitle';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${__API__}/api/products`);
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
      <Container sx={{ flexGrow: 1, mt: '15px', mb: '30px' }}>
      <HighlightTitle />

        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            [1, 2, 3, 4].map((n) => (
              <Grid item sm={6} md={3} key={n}>
                <Box sx={{ backgroundColor: '#fff', borderRadius: 2, p: 2 }}>
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="text" sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;