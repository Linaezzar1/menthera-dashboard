// src/components/UsersPage.js
import { Box, Paper, Typography } from "@mui/material";

export default function UsersPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>Utilisateurs</Typography>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, background: "rgba(255,255,255,0.13)", color: "white" }}>
        {/* Table, liste, gestion users */}
        <Typography>Liste des utilisateurs à venir...</Typography>
      </Paper>
    </Box>
  );
}
