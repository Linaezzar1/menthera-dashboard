import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/mentheraLogo1.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../services/authService";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Charger les infos utilisateur depuis localStorage ou API
    const loadUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Erreur chargement utilisateur:', error);
        const localUser = AuthService.getUser();
        setUser(localUser);
      }
    };
    loadUser();
  }, []);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      localStorage.clear();
      navigate('/login');
    }
  };

  const userName = user?.name || "Admin";
  const userInitial = userName[0]?.toUpperCase() || "A";

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
          <Avatar sx={{ bgcolor: "#8B5CF6", fontWeight: 600, fontSize: 18 }}>
            {userInitial}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            elevation: 6,
            sx: {
              minWidth: 220,
              borderRadius: 0,
              py: 1,
              background: "rgba(139,92,246,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(192,132,252,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }
          }}
        >
          <Box sx={{ px: 2.5, py: 1.5 }}>
            <Typography sx={{
              fontWeight: 700,
              color: "#C084FC",
              fontSize: 17,
              fontFamily: "Poppins, sans-serif"
            }}>
              Welcome {userName}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.8, borderColor: "rgba(192,132,252,0.3)" }} />

          <MenuItem onClick={handleProfile}
            sx={{
              py: 1.3,
              px: 2.5,
              '&:hover': { bgcolor: "rgba(139,92,246,0.2)" }
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="medium" sx={{ color: "#C084FC" }} />
            </ListItemIcon>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: 15 }}>
              My Profile
            </Typography>
          </MenuItem>

          <MenuItem onClick={handleLogout}
            sx={{
              py: 1.3,
              px: 2.5,
              '&:hover': { bgcolor: "rgba(220,38,38,0.15)" }
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" sx={{ color: "#EF4444" }} />
            </ListItemIcon>
            <Typography sx={{ color: "#EF4444", fontWeight: 600, fontSize: 15 }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
