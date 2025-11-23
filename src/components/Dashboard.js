import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HomePage from "./HomePage";
import StatistiquesPage from "./StatistiquesPage";
import UsersPage from "./UsersPage";
import ChallengesPage from "./ChallengesPage"; // <-- Ajoute cette importation

export default function Dashboard() {
  const [page, setPage] = useState("accueil");

  const renderPage = () => {
    if (page === "accueil") return <HomePage />;
    if (page === "statistiques") return <StatistiquesPage />;
    if (page === "users") return <UsersPage />;
    if (page === "challenges") return <ChallengesPage />; // <-- Ajoute ce bloc
    return <HomePage />;
  };

  return (
    <>
      {/* Sidebar fixe */}
      <Sidebar onChangePage={setPage} currentPage={page} />

      {/* Contenu principal décalé */}
      <Box
        sx={{
          marginLeft: "220px", // ✅ Décale exactement de la largeur du sidebar
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1F0B3D 0%, #3D1F6B 50%, #1F0B3D 100%)",
          overflowY: "auto",
          px: { xs: 3, md: 5 }
        }}
      >
        <Header userName="Lina" />
        {renderPage()}
      </Box>
    </>
  );
}
