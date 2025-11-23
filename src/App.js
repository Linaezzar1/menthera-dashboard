import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthService from "./services/authService";
import ProfilePage from "./components/ProfilePage";

// PublicRoute : accès uniquement pour les non-connectés (par ex : Login, Register)
function PublicRoute({ children }) {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

// PrivateRoute : accès uniquement pour les connectés
function PrivateRoute({ children }) {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Login accessible seulement pour non-logged in */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />

          {/* Dashboard et Profile protégés, accessibles seulement pour logged in */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Toute autre route (redirection) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


export default App;
