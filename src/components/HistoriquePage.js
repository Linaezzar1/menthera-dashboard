// src/components/HistoriquePage.js
import { Box, Paper, Typography } from "@mui/material";

export default function HistoriquePage() {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>Historique</Typography>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, background: "rgba(255,255,255,0.13)", color: "white" }}>
        <Typography>Aucun événement pour l'instant...</Typography>
      </Paper>
    </Box>
  );
}
