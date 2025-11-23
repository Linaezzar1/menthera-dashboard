import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

// DashboardLayout.js
export default function DashboardLayout({ children, currentPage, onChangePage }) {
  return (
    <>
      {/* Sidebar fixe, hors flux */}
      <Sidebar currentPage={currentPage} onChangePage={onChangePage} />

      {/* Contenu central décale à droite, AUCUN display:flex autour */}
      <Box
        sx={{
          minHeight: "100vh",
          marginLeft: "220px", // Doit être exactement la width du sidebar
          background: "linear-gradient(135deg, #201242 0%, #3b2274 100%)",
          p: { xs: 2, md: 4 },
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
}
