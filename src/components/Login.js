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

  // Palette harmonisée Menthera (mobile style)
  const gradientMain = "linear-gradient(180deg, #3D2C5C 0%, #7B68C8 60%, #B2A1FF 100%)";
  const cardBg = "rgba(61,44,92,0.7)";
  const inputBg = "rgba(255,255,255,0.10)";
  const accentGradient = "linear-gradient(90deg, #FF6EC7 0%, #6B5FF8 100%)";
  const accentLink = "#00D4FF";
  const placeholderColor = "#E6DFFF"; // clair pastel

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: gradientMain,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{
        display: "flex",
        width: { xs: "96vw", md: "800px" },
        minHeight: { xs: 380, md: "460px" },
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 10,
        background: cardBg,
        backdropFilter: "blur(6px)"
      }}>
        {/* Bloc gauche : logo et sous-titre */}
        <Box sx={{
          flex: 1,
          bgcolor: "rgba(123,104,200,0.13)", // violet pastel transparent
          py: { xs: 3, md: 8 },
          px: { xs: 2, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <img src={Logo} alt="logo" style={{ height: 250, width: 250, marginBottom: 18 }} />
          <Typography sx={{
            color: placeholderColor,
            fontWeight: 600,
            fontSize: 15,
            fontFamily: "Cinzel, serif",
            letterSpacing: 1,
            textAlign: "center",
            mt: 1
          }}>
            Votre espace de connexion sécurisé
          </Typography>
        </Box>

        {/* Bloc droit : formulaire */}
        <Box sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(61,44,92,0.40)", // Fond sombre pastel
        }}>
          <Box
            sx={{
              width: { xs: "96%", md: 340 },
              px: 4, py: 4
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 900,
                color: "#D0C8FF", // Typo lilas pastel
                fontFamily: "Cinzel, serif",
                mb: 2.2,
                fontSize: { xs: 23, md: 26 },
                letterSpacing: 2
              }}>
              Menthera
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
                    <EmailIcon sx={{ color: "#B2A1FF" }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                mb: 2.3,
                input: { color: "#fff", fontSize: 16 },
                borderRadius: 3,
                background: inputBg,
                px: 2,
                py: 1.2,
                '::placeholder': { color: placeholderColor },
                boxShadow: "0 2px 12px rgba(123,104,200,0.12)"
              }}
            />

            <TextField
              placeholder="Mot de passe"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#B2A1FF" }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                mb: 3,
                input: { color: "#fff", fontSize: 16 },
                borderRadius: 3,
                background: inputBg,
                px: 2,
                py: 1.2,
                '::placeholder': { color: placeholderColor },
                boxShadow: "0 2px 12px rgba(123,104,200,0.12)"
              }}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                background: accentGradient,
                color: "#fff",
                borderRadius: 3,
                fontWeight: 700,
                fontSize: 17,
                py: 1.3,
                mt: 1,
                boxShadow: "0 3px 14px rgba(107,95,248,0.17)",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                '&:hover': {
                  background: "linear-gradient(90deg, #FF6EC7 0%, #7B68C8 100%)",
                }
              }}
              onClick={handleLogin}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
