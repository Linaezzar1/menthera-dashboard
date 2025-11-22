import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: "#8B5CF6" }, // violet/mauve principal
    secondary: { main: "#C084FC" }, // mauve clair (accents)
    background: { 
      default: "#1F0B3D", // violet très foncé (presque noir)
      paper: "rgba(255,255,255,0.08)" // cards semi-transparentes
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255,255,255,0.7)"
    }
  },
  typography: {
    fontFamily: '"Poppins", "Cinzel", serif, sans-serif',
    h1: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
      fontSize: 32,
      color: "#FFFFFF"
    },
    h2: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 600,
      fontSize: 26,
      color: "#FFFFFF"
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
