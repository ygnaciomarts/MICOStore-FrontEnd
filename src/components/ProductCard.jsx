import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box>
        <Card sx={{ maxWidth: 320, width: '100%', borderRadius: 2, boxShadow: 3, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'secondary.main',
              color: 'white',
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              zIndex: 1,
              flexDirection: 'column',
              textAlign: 'center',
              padding: '4px',
            }}
          >
            <Typography sx={{ fontSize: 10, lineHeight: 1.1, fontWeight: 600 }}>
              Desde<br /><span style={{ fontSize: '16px', fontWeight: 700 }}>${product.price}</span>
            </Typography>
          </Box>
          <Box sx={{ overflow: 'hidden' }}>
            <CardMedia
              component="img"
              alt={product.name}
              image={product.imageUrl}
              sx={{
                aspectRatio: '0.5 / 0.5',
                objectFit: 'cover',
                width: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.07)',
                },
              }}
            />
          </Box>
        </Card>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '18px', mt: 1, fontWeight: '700' }}>
          {product.name.toUpperCase()}
        </Typography>
      </Box>
    </Link>
  );
};

export default ProductCard;