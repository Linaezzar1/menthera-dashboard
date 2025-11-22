import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HomePage from "./HomePage";
import StatistiquesPage from "./StatistiquesPage";
import HistoriquePage from "./HistoriquePage";
import UsersPage from "./UsersPage";

export default function Dashboard() {
  const [page, setPage] = useState("accueil");

  const handleProfile = () => { /* show profile modal/page */ };
  const handleLogout = () => { /* déconnecte user */ };

  const renderPage = () => {
    if (page === "accueil") return <HomePage />;
    if (page === "statistiques") return <StatistiquesPage />;
    if (page === "historique") return <HistoriquePage />;
    if (page === "users") return <UsersPage />;
    return <HomePage />;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar onChangePage={setPage} currentPage={page} />
      <Box flexGrow={1} sx={{
        background: "linear-gradient(135deg, #1A0E3E 0%, #2D1B69 50%, #1A0E3E 100%)",
        minHeight: "100vh"
      }}>
        <Header onProfile={handleProfile} onLogout={handleLogout} />
        {renderPage()}
      </Box>
    </Box>
  );
}
