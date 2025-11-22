import { Box, Paper, Typography } from "@mui/material";

export default function StatistiquesPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>Statistiques</Typography>
      <Paper elevation={4} sx={{
        p: 3,
        borderRadius: 3,
        background: "rgba(139,92,246,0.12)",
        backdropFilter: "blur(10px)",
        color: "white",
        border: "1px solid rgba(192,132,252,0.2)"
      }}>
        <Typography>Graphiques et chiffres clés à venir…</Typography>
      </Paper>
    </Box>
  );
}
