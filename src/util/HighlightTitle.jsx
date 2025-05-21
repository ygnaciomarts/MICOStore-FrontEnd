import { Box, Typography } from "@mui/material";

const UnderlineSVG = () => {
    return (
        <svg
            width="200"
            height="10"
            viewBox="0 0 200 10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="var(--marker-color, #f0652b)" // Usa negro (#000) como color por defecto
            strokeWidth="6"
            strokeLinecap="round"
        >
            <path d="M 2.99996 5 C 12.8399 2 30.9393 1 36.8901 1 C 42.8408 1 41.6481 3 38.7739 4 C 38.0439 5 40.2101 6 54.715 3 L 65.0248 2 C 66.2099 2 68.7141 2 69.2498 3 C 69.9193 4 74.1326 5 86.875 5 C 99.6174 5 118.079 3 130.833 2 C 143.587 1 154.465 1 180.617 3" />
        </svg>
    );
};

const HighlightTitle = () => {
    return (
        <Box sx={{ position: "relative", textAlign: "left", mb: 4 }}>
            <Box sx={{ display: "inline-block", position: "relative" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        zIndex: 2,
                        position: "relative",
                    }}
                >
                    Productos destacados
                </Typography>
                <Box
                    sx={{
                        position: "absolute",
                        left: 0, // Alinea el SVG al inicio del contenedor
                        bottom: "-15px", // Ajusta la distancia entre el texto y el SVG
                        width: "100%", // Asegura que el SVG ocupe el 100% del ancho del título
                    }}
                >
                    <UnderlineSVG />
                </Box>
            </Box>

            <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontSize: "1rem" }}
            >
                Descubre nuestros productos más populares
            </Typography>
        </Box>
    );
};

export default HighlightTitle;