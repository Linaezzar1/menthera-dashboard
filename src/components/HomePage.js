import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BlockIcon from '@mui/icons-material/Block';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import AdminService from "../services/adminService";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function HomePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const data = await AdminService.getDashboardStats();
                setStats(data);
                setError(null);
            } catch (err) {
                setError('Impossible de charger les statistiques');
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: "#fff" }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    const doughnutData = {
        labels: ["Actifs", "Premium", "Abonnements", "Non-actifs"],
        datasets: [{
            data: [
                stats?.activeUsers ?? 0,
                stats?.premiumUsers ?? 0,
                stats?.totalSubscriptions ?? 0,
                (stats?.totalUsers ?? 0) - (stats?.activeUsers ?? 0)
            ],
            backgroundColor: ["#1696f7", "#ffbe14", "#19b96c", "#e0e7ef"]
        }]
    };

    const barData = {
        labels: ["Total", "Actifs", "Premium", "Abonnements"],
        datasets: [{
            label: "Utilisateurs",
            data: [
                stats?.totalUsers ?? 0,
                stats?.activeUsers ?? 0,
                stats?.premiumUsers ?? 0,
                stats?.totalSubscriptions ?? 0
            ],
            backgroundColor: ["#1696f7", "#19b96c", "#ffbe14", "#ea4558"],
            borderRadius: 10
        }]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "left", labels: { color: "#555" } } }
    };
    const barOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: "#343434" } },
            y: { beginAtZero: true, ticks: { color: "#343434" } }
        }
    };


    return (

        <Box minHeight="100vh" sx={{
            pt: { xs: 1, md: 2 },   // padding top réduit (ex: 8px sur mobile, 16px sur desktop)
            pb: { xs: 2, md: 4 },   // padding bottom (optionnel, tu peux l'ajuster comme tu veux)
            px: { xs: 1, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 800,
                    color: "#fff",
                    mb: 3,
                    letterSpacing: 1,
                    textAlign: "center"
                }}
            >
                Bienvenue sur Menthera
            </Typography>
            <Box sx={{
                width: "100%",
                maxWidth: 1200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard label="Total utilisateurs" value={stats?.totalUsers ?? "—"} icon={<GroupIcon sx={{ fontSize: 30 }} />} bgcolor="#1696f7" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard label="Utilisateurs actifs" value={stats?.activeUsers ?? "—"} icon={<VerifiedUserIcon sx={{ fontSize: 30 }} />} bgcolor="#19b96c" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard label="Utilisateurs premium" value={stats?.premiumUsers ?? "—"} icon={<WorkspacePremiumIcon sx={{ fontSize: 30 }} />} bgcolor="#ffbe14" colorText="#444" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            label="Utilisateurs bannis"
                            value={stats?.inactiveUsers ?? "—"}
                            icon={<BlockIcon sx={{ fontSize: 30 }} />}
                            bgcolor="#6B7280"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Paper sx={{
                            p: 3,
                            borderRadius: 2,
                            background: "#fff",
                            height: 330,
                            minHeight: 330,
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#6b21a8" }}>Répartition Utilisateurs</Typography>
                            <Box sx={{ flex: 1, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Doughnut
                                    data={doughnutData}
                                    options={chartOptions}
                                    height={220}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{
                            p: 3,
                            borderRadius: 2,
                            background: "#fff",
                            height: 330,
                            minHeight: 330,
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#ea4558" }}>Statistiques principales</Typography>
                            <Box sx={{ flex: 1, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Bar
                                    data={barData}
                                    options={barOptions}
                                    height={220}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

function StatCard({ label, value, icon, bgcolor, colorText = "#fff" }) {
    return (
        <Paper sx={{ p: 3, borderRadius: 2, background: bgcolor, color: colorText, boxShadow: 2, minHeight: 110 }}>
            <Box display="flex" alignItems="center" gap={1} sx={{ mb: 0.7 }}>
                {icon}
                <Typography fontWeight={600} fontSize={15}>{label}</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{value}</Typography>
        </Paper>
    );
}
