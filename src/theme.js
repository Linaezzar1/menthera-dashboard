import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: "#5B4FB3" },
    secondary: { main: "#9B8FDB" },
    background: { default: "linear-gradient(135deg, #5B4FB3 0%, #7B68C8 50%, #9B8FDB 100%)" }
  },
  typography: {
    fontFamily: '"Poppins", "Cinzel", serif, sans-serif',
    h1: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
      fontSize: 32,
    },
    h2: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 600,
      fontSize: 26,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
