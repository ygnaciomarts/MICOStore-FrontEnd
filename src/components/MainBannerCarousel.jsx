import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

// Importa imágenes o usa props para las imágenes del banner
const banners = [
  '/banners/banner1.jpg',
  '/banners/banner2.jpg',
  '/banners/banner3.jpg',
];

const MainBannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <Slider {...settings}>
        {banners.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`Banner ${i + 1}`}
            sx={{ width: '100%', height: { xs: 200, sm: 350, md: 450 }, objectFit: 'cover', borderRadius: 2 }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default MainBannerCarousel;