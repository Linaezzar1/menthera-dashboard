import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Doughnut, Bar } from 'react-chartjs-2';
import BlockIcon from '@mui/icons-material/Block';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import AdminService from "../services/adminService"; // ✅ Import correct

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function HomePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const data = await AdminService.getDashboardStats(); // ✅ Utilise AdminService
                setStats(data);
                setError(null);
            } catch (err) {
                console.error('Erreur chargement stats:', err);
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

    return (
        <>
            <Typography variant="h3" sx={{ fontFamily: "Cinzel, serif", fontWeight: 800, color: "#fff", mb: 2, letterSpacing: 1 }}>
                Bienvenue sur Menthera
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
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

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, background: "#fff", minHeight: 320, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#6b21a8" }}>Répartition Utilisateurs</Typography>
                        <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "left", labels: { color: "#555" } } } }} height={200} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, background: "#fff", minHeight: 320, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#ea4558" }}>Statistiques principales</Typography>
                        <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#343434" } }, y: { beginAtZero: true, ticks: { color: "#343434" } } } }} height={200} />
                    </Paper>
                </Grid>
            </Grid>
        </>
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
