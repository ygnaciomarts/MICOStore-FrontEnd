import React from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Grid, Typography, Box, Button } from '@mui/material';

const Home = () => {
  const products = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1604679296873-71c7f2342ee8'
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200,
      imageUrl: 'https://images.unsplash.com/photo-1587132249385-95341f0101b6'
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1586190840529-fb6f14fa26e0'
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      price: 250,
      imageUrl: 'https://images.unsplash.com/photo-1593703327495-00397ecde96b'
    },
  ];

  return (
    <div className="home">
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2" sx={{ color: '#fff', fontWeight: 'bold', marginBottom: '10px' }}>
          MICO
        </Typography>
      </Box>

      <Container sx={{ marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Productos Destacados
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <footer>
        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#333', color: '#fff' }}>
          <Typography variant="body2" color="inherit">
            &copy; 2025 Mico. Todos los derechos reservados.
          </Typography>
        </Box>
      </footer>
    </div>
  );
};

export default Home;