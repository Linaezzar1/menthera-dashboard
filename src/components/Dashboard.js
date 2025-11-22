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
        background: "linear-gradient(135deg, #1F0B3D 0%, #3D1F6B 50%, #1F0B3D 100%)",
        minHeight: "100vh"
      }}>
        <Header userName="Lina" />
        {renderPage()}
      </Box>
    </Box>
  );
}
