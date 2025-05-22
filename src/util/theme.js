import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: { letterSpacing: "-0.03em" },
      h2: { letterSpacing: "-0.025em" },
      h3: { letterSpacing: "-0.02em" },
      h4: { letterSpacing: "-0.015em" },
      h5: { letterSpacing: "-0.01em" },
      h6: { letterSpacing: "-0.01em" },
      body1: { letterSpacing: "-0.02em" },
      body2: { letterSpacing: "-0.015em" },
      button: { letterSpacing: "-0.01em" },
    },
  });

export default theme;