import React from "react";
import { Box, Paper, Typography, TextField, Button, InputAdornment } from "@mui/material";
import Logo from "../assets/mentheraLogo1.png";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Login({ onLogin }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #5B4FB3 0%, #7B68C8 50%, #9B8FDB 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Container principal */}
      <Box sx={{
        display: "flex",
        width: { xs: "95vw", md: "850px" },
        height: { xs: "auto", md: "480px" },
        borderRadius: 7,
        overflow: "hidden",
        boxShadow: 8,
        background: "rgba(55,31,89,0.06)"
      }}>
        {/* Bloc gauche - branding / bienvenue */}
        <Box sx={{
          flex: 1,
          bgcolor: "rgba(99,72,185, 0.15)",
          py: { xs: 4, md: 8 },
          px: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <img src={Logo} alt="logo" style={{ height: 350, width: 350 }} />
        </Box>

        {/* Bloc droit - Formulaire login glassmorphisme */}
        <Box sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
        }}>
          <Paper elevation={0}
            sx={{
              width: { xs: "95%", md: 340 },
              px: 4, py: 5,
              borderRadius: 5,
              background: "rgba(255,255,255,0.17)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 4px 36px rgba(65,44,130,0.16)"
            }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: "#fff",
                fontFamily: "Cinzel, serif",
                mb: 3,
                fontSize: { xs: 24, md: 28 },
                letterSpacing: 2
              }}>
              Welcome to Menthera
            </Typography>
            
            {/* Champ Email avec icône */}
            <TextField
              placeholder="Email"
              variant="standard"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#eee" }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                mb: 2.5,
                input: { color: "#fff", fontSize: 15 },
                borderRadius: 2,
                background: "rgba(255,255,255,0.14)",
                px: 2,
                py: 1.2,
              }}
            />
            
            {/* Champ Password avec icône */}
            <TextField
              placeholder="Password"
              type="password"
              variant="standard"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#eee" }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                mb: 3,
                input: { color: "#fff", fontSize: 15 },
                borderRadius: 2,
                background: "rgba(255,255,255,0.14)",
                px: 2,
                py: 1.2,
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #FF5C8D 0%, #FFA247 100%)",
                color: "#fff",
                borderRadius: 3,
                fontWeight: 700,
                fontSize: 17,
                py: 1.5,
                mt: 1,
                boxShadow: "0 3px 10px rgba(255,92,141,0.3)",
                textTransform: "uppercase",
                letterSpacing: 1.5
              }}
              onClick={onLogin}
            >
              Login
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
