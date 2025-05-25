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
import ProductCarousel from '../components/ProductCarousel';
import Slider from "react-slick";

const banners = [
  {
    src: "/src/assets/mico1.png",
    title: "Tu tienda de confianza",
    description: "Compra rápido y con estilo"
  },
  {
    src: "/src/assets/mico2.png",
    title: "Promoción Especial 2",
    description: "Descuentos limitados para ti"
  },
  {
    src: "/src/assets/mico3.png",
    title: "Promoción Especial 3",
    description: "Lo mejor en personalización"
  },
  {
    src: "/src/assets/mico4.png",
    title: "Promoción Especial 4",
    description: "No te lo pierdas"
  },
];

const MainBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots custom-dots",
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <Box sx={{ maxWidth: "100%", mb: 4, position: "relative" }}>
      <style>
        {`
          @keyframes slideFromLeftFade {
            0% {
              opacity: 0;
              transform: translateX(-15px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .custom-dots {
            position: absolute;
            bottom: 15px;
            right: 10px;
            left: auto;
            display: flex !important;
            justify-content: flex-end;
            gap: 0px;
            padding: 0;
            margin: 0;
            list-style: none;
            z-index: 10;
          }
          .custom-dots li button:before {
            font-size: 10px;
            color: white;
            opacity: 0.7;
          }
          .custom-dots li.slick-active button:before {
            opacity: 1;
            color: white;
          }
          .overlay-text {
            animation: slideFromLeftFade 0.7s ease forwards;
            font-weight: 700;
            font-size: 1.8rem;
            padding: 8px 12px;
            border-radius: 6px;
          }
        `}
      </style>
      <Slider {...settings}>
        {banners.map((banner, i) => (
          <Box key={i} sx={{ position: "relative" }}>
            <Box
              component="img"
              src={banner.src}
              alt={`Banner ${i + 1}`}
              sx={{
                width: "100%",
                height: { xs: 200, sm: 300, md: 400 },
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 2,
                background: 'linear-gradient(30deg,rgba(0, 0, 0, 0.75) 5%, rgba(87, 199, 133, 0) 55%)',
                display: 'flex',
                alignItems: 'flex-end',
                paddingLeft: 2,
                paddingBottom: 2,
                opacity: currentSlide === i ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            >
              {currentSlide === i && (
                <Box className="overlay-text">
                  <div>{banner.title}</div>
                  <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 400 }}>
                    {banner.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

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
    <Box
      sx={{
        flexGrow: 1,
        mt: '15px',
        mb: '30px',
        width: '100%',
      }}
    >
      <MainBannerCarousel />
      <HighlightTitle />

      {products.length > 0 ? (
        <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
          <ProductCarousel products={products} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((n) => (
            <Grid item sm={6} md={3} key={n}>
              <Box sx={{ backgroundColor: '#fff', borderRadius: 2, p: 2 }}>
                <Skeleton variant="rectangular" height={140} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;