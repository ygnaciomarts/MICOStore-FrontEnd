import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        image={product.imageUrl}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="primary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="h6" color="secondary">
            ${product.price}
          </Typography>
          <Button size="small" variant="contained" color="primary">
            Comprar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;