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
      bgcolor: "rgba(31,11,61,0.7)",
      backdropFilter: "blur(10px)",
      height: "100vh",
      boxShadow: "4px 0 16px rgba(0,0,0,0.3)",
      display: 'flex',
      position: "fixed",
       left: 0,
      top: 0,
      zIndex: 1000,
      pt: 3,
      flexDirection: 'column',
    }}>
      <List>
        <ListItemButton
          selected={currentPage === "accueil"}
          onClick={() => onChangePage("accueil")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(139,92,246,0.2)",
              borderLeft: "3px solid #8B5CF6"
            }
          }}
        >
          <ListItemIcon><DashboardIcon sx={{ color: "#C084FC" }} /></ListItemIcon>
          <ListItemText primary="Accueil" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton
          selected={currentPage === "statistiques"}
          onClick={() => onChangePage("statistiques")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(139,92,246,0.2)",
              borderLeft: "3px solid #8B5CF6"
            }
          }}
        >
          <ListItemIcon><TimelineIcon sx={{ color: "#C084FC" }} /></ListItemIcon>
          <ListItemText primary="Statistiques" sx={{ color: "#fff" }} />
        </ListItemButton>
        <ListItemButton
          selected={currentPage === "users"}
          onClick={() => onChangePage("users")}
          sx={{
            '&.Mui-selected': {
              bgcolor: "rgba(139,92,246,0.2)",
              borderLeft: "3px solid #8B5CF6"
            }
          }}
        >
          <ListItemIcon><PeopleAltIcon sx={{ color: "#C084FC" }} /></ListItemIcon>
          <ListItemText primary="Utilisateurs" sx={{ color: "#fff" }} />
        </ListItemButton>
      </List>
    </Box>
  );
}
