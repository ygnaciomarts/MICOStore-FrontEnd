import React from "react";
import Slider from "react-slick";
import { Grid, Card, Typography, Link } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const offers = [
    { title: "Oferta 1", url: "#" },
    { title: "Oferta 2", url: "#" },
    { title: "Oferta 3", url: "#" }
];

const QuickOffersSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: false,
        rtl: false,
    };

    return (
        <Grid container sx={{ width: "100vw", overflow: "hidden" }}>
            <Slider {...settings} style={{ width: "100%" }}>
                {offers.map((offer, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: "100vw",
                            height: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <Link
                            href={offer.url}
                            underline="none"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
                                {offer.title}
                            </Typography>
                        </Link>
                    </Card>
                ))}
            </Slider>
        </Grid>
    );
};

export default QuickOffersSlider;