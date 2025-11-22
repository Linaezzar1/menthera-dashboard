import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function Sidebar({ onChangePage, currentPage }) {
  return (
    <Box sx={{
      width: 220,
      bgcolor: "rgba(26,14,62,0.7)",
      backdropFilter: "blur(10px)",
      height: "100vh",
      boxShadow: "4px 0 16px rgba(0,0,0,0.3)",
      pt: 3,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <List>
        <ListItemButton
          selected={currentPage === "accueil"}
          onClick={() => onChangePage("accueil")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(107,95,232,0.2)",
              borderLeft: "3px solid #6B5FE8"
            }
          }}
        >
          <ListItemIcon><DashboardIcon sx={{ color: "#5DD9F5" }} /></ListItemIcon>
          <ListItemText primary="Accueil" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton
          selected={currentPage === "statistiques"}
          onClick={() => onChangePage("statistiques")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(107,95,232,0.2)",
              borderLeft: "3px solid #6B5FE8"
            }
          }}
        >
          <ListItemIcon><TimelineIcon sx={{ color: "#5DD9F5" }} /></ListItemIcon>
          <ListItemText primary="Statistiques" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton
          selected={currentPage === "historique"}
          onClick={() => onChangePage("historique")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(107,95,232,0.2)",
              borderLeft: "3px solid #6B5FE8"
            }
          }}
        >
          <ListItemIcon><HistoryIcon sx={{ color: "#5DD9F5" }} /></ListItemIcon>
          <ListItemText primary="Historique" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton
          selected={currentPage === "users"}
          onClick={() => onChangePage("users")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(107,95,232,0.2)",
              borderLeft: "3px solid #6B5FE8"
            }
          }}
        >
          <ListItemIcon><PeopleAltIcon sx={{ color: "#5DD9F5" }} /></ListItemIcon>
          <ListItemText primary="Utilisateurs" sx={{ color: "#fff" }} />
        </ListItemButton>
      </List>
    </Box>
  );
}
