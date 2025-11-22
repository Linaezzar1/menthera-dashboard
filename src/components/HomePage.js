// src/components/HomePage.js
import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="70vh">
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Cinzel, serif",
          fontWeight: 800,
          color: "white",
          mb: 2,
          letterSpacing: 3,
          fontSize: { xs: 32, md: 56 },
          textAlign: "center"
        }}
      >
        Bienvenue sur Menthera
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontFamily: "Poppins, sans-serif",
          mb: 4,
          textAlign: "center",
          fontWeight: 400
        }}
      >
        Dashboard Administrateur
      </Typography>
    </Box>
  );
}
