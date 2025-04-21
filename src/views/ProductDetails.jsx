import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, CardMedia, Box, Card } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${__API__}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, backgroundColor: '#fff', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>{product.name}</Typography>
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
          sx={{ height: 400, mt: 2, borderRadius: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
          Quedan {product.stock} disponibles
        </Typography>
      </Card>
    </Container>
  );
};

export default ProductDetails;