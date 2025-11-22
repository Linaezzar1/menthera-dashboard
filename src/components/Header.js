import React, { useState } from "react";
import {Box, AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import Logo from "../assets/mentheraLogo1.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({ userName = "Lina", onProfile, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar elevation={0} position="static" sx={{ bgcolor: "transparent", boxShadow: "none", pt: 1 }}>
      <Toolbar>
        <img src={Logo} alt="logo" style={{ height: 40, marginRight: 12 }} />
        <Typography
          variant="h5"
          sx={{
            flex: 1,
            fontFamily: "Cinzel, serif",
            color: "white",
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>
          Tableau de bord
        </Typography>
        <IconButton color="inherit" onClick={handleAvatarClick}>
          <Avatar sx={{ bgcolor: "#7B68C8", fontWeight: 600 }}>{userName[0] || "U"}</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 200,
              borderRadius: 3,
              py: 0.5,
              background: "#fff"
            }
          }}
        >
          {/* Welcome section */}
          <Box sx={{ px: 2, py: 1 }}>
            <Typography sx={{ fontWeight: 700, color: "#7B68C8", fontSize: 16 }}>
              Welcome {userName}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.8 }} />

          {/* My Profile */}
          <MenuItem onClick={() => { handleClose(); onProfile && onProfile(); }}
            sx={{ py: 1.2 }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="medium" sx={{ color: "#7B68C8" }} />
            </ListItemIcon>
            My Profile
          </MenuItem>

          {/* Logout */}
          <MenuItem onClick={() => { handleClose(); onLogout && onLogout(); }}
            sx={{ py: 1.2 }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" sx={{ color: "#e53935" }} />
            </ListItemIcon>
            <Typography sx={{ color: "#e53935", fontWeight: 500 }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
