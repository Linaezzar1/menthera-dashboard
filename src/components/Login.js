import React, { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/mentheraLogo1.png";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AuthService from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await AuthService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Email ou mot de passe incorrect';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

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
      <Box sx={{
        display: "flex",
        width: { xs: "95vw", md: "850px" },
        height: { xs: "auto", md: "480px" },
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 8,
        background: "rgba(55,31,89,0.06)"
      }}>
        {/* Bloc gauche */}
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

        {/* Bloc droit - Formulaire SANS Paper */}
        <Box sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
        }}>
          <Box
            sx={{
              width: { xs: "95%", md: 340 },
              px: 4, py: 5
            }}
          >
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

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              placeholder="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
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

            <TextField
              placeholder="Password"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
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
              disabled={loading}
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
                letterSpacing: 1.5,
                '&:hover': {
                  background: "linear-gradient(90deg, #FF5C8D 20%, #FFA247 100%)",
                }
              }}
              onClick={handleLogin}
            >
              {loading ? 'Connexion...' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
