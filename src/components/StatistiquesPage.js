import { Box, Paper, Typography } from "@mui/material";

export default function StatistiquesPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>Statistiques</Typography>
      <Paper elevation={4} sx={{
        p: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <Typography>Graphiques et chiffres clés à venir…</Typography>
      </Paper>
    </Box>
  );
}
