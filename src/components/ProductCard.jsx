import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card sx={{ maxWidth: '90vh', borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={product.imageUrl}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="h6">
              ${product.price}
            </Typography>
            <Button size="small" variant="contained" color="secondary">
              Comprar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;