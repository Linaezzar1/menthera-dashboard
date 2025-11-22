import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import Logo from "../assets/mentheraLogo1.png"; // copie ton logo ici !

export default function Dashboard() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <img src={Logo} alt="logo" style={{height: 94, marginBottom: 16}} />
      <Typography variant="h1" align="center" gutterBottom>
        Menthera
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        sx={{ color: "white", mb: 3, fontWeight: 400, letterSpacing: 0.5 }}
      >
        Votre espace personnel sécurisé
      </Typography>
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          background: "rgba(255,255,255,0.13)",
          backdropFilter: "blur(8px)",
          p: 3,
          borderRadius: 3
        }}
      >
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              borderRadius: 14,
              background: "rgba(255,255,255,0.18)"
            }
          }}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="filled"
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              borderRadius: 14,
              background: "rgba(255,255,255,0.18)"
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 14, py: 1.2 }}
        >
          Se connecter
        </Button>
      </Paper>
    </Box>
  );
}
