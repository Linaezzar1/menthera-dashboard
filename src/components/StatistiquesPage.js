import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, CircularProgress, Alert, Container } from "@mui/material";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import AdminService from "../services/adminService";
import { Chart, ArcElement, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function StatistiquesPage() {
  const [stats, setStats] = useState(null);
  const [emotions, setEmotions] = useState(null);
  const [messages, setMessages] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const dash = await AdminService.getDashboardStats();
        const em = await AdminService.getCommunityEmotionTrends('week');
        const msg = await AdminService.getMessagesOverTime('week');
        const rat = await AdminService.getGeneralRatingStats();
        setStats(dash);
        setEmotions(em);
        setMessages(msg);
        setRatings(rat);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <Box p={4} minHeight="60vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress sx={{ color: "#C084FC" }} />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const userPieData = {
    labels: ["Actifs", "Premium", "Inactifs"],
    datasets: [{
      data: [
        stats?.activeUsers ?? 0,
        stats?.premiumUsers ?? 0,
        stats?.inactiveUsers ?? 0
      ],
      backgroundColor: ["#1ccf83", "#ffd638", "#e0e7ef"]
    }]
  };

  const emotionLabels = Object.keys(emotions?.emotions ?? {});
  const emotionValues = Object.values(emotions?.emotions ?? {});
  const emotionChartData = {
    labels: emotionLabels,
    datasets: [{
      label: "Emotions (semaine)",
      data: emotionValues,
      fill: true,
      tension: 0.4,
      borderColor: "#9333ea",
      backgroundColor: "rgba(147,51,234,0.1)",
      pointBackgroundColor: "#9333ea"
    }]
  };

  const msgLabels = messages ? Object.keys(messages.messagesByDate) : [];
  const msgTotals = msgLabels.map(date => messages?.messagesByDate[date]?.total ?? 0);
  const msgAudio = msgLabels.map(date => messages?.messagesByDate[date]?.audio ?? 0);
  const msgText = msgLabels.map(date => messages?.messagesByDate[date]?.text ?? 0);
  const messagesBarData = {
    labels: msgLabels,
    datasets: [
      {
        type: "bar",
        label: "Textes",
        data: msgText,
        backgroundColor: "#8B5CF6"
      },
      {
        type: "bar",
        label: "Vocaux",
        data: msgAudio,
        backgroundColor: "#19b96c"
      },
      {
        type: "line",
        label: "Total messages",
        data: msgTotals,
        borderColor: "#FFA247",
        backgroundColor: "rgba(255,162,71,0.14)",
        tension: 0.3,
        order: 0
      }
    ]
  };

  const ratingData = {
    labels: Object.keys(ratings?.ratingDistribution ?? {}),
    datasets: [{
      type: "bar",
      label: "Nombre de notes",
      data: Object.values(ratings?.ratingDistribution ?? {}),
      backgroundColor: "#FF5C8D"
    }]
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      py: 4
    }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: 800,
            color: "#fff",
            mb: 4,
            letterSpacing: 2,
            fontSize: { xs: 28, md: 38 }
          }}
        >
            Statistiques et Analyses
        </Typography>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#fff",
                height: 340,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#7c3aed" }}>
                Répartition Utilisateurs
              </Typography>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Doughnut
                  data={userPieData}
                  options={{
                    plugins: {
                      legend: {
                        position: "left",
                        labels: { color: "#374151", font: { size: 13 } }
                      }
                    },
                    maintainAspectRatio: false
                  }}
                  height={180}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#fff",
                height: 340,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#ea4558" }}>
                Statistiques principales
              </Typography>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Line
                  data={emotionChartData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { color: "#374151" } },
                      y: { beginAtZero: true, ticks: { color: "#374151" } }
                    },
                    maintainAspectRatio: false
                  }}
                  height={180}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#fff",
                height: 340,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#7c3aed" }}>
                Volume de messages (7 jours)
              </Typography>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bar
                  data={messagesBarData}
                  options={{
                    plugins: {
                      legend: {
                        labels: { color: "#374151" }
                      }
                    },
                    scales: {
                      x: { ticks: { color: "#374151" } },
                      y: { beginAtZero: true, ticks: { color: "#374151" } }
                    },
                    maintainAspectRatio: false
                  }}
                  height={180}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#fff",
                height: 340,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#ea4558" }}>
                Notes des conseils utilisateurs
              </Typography>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bar
                  data={ratingData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { color: "#374151" } },
                      y: { beginAtZero: true, ticks: { color: "#374151" } }
                    },
                    maintainAspectRatio: false
                  }}
                  height={120}
                />
              </Box>
              <Typography sx={{ mt: 2, color: "#FF5C8D", fontWeight: 600, textAlign: "center" }}>
                Moyenne {ratings?.averageRating ?? "--"} sur {ratings?.totalRatings ?? 0} avis
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
