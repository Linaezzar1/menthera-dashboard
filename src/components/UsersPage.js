import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminService from "../services/adminService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getUsersList({ page: 1, limit: 50, q: search });
      
      console.log('Données reçues:', data);
      
      // ✅ RÉCUPÉRER L'UTILISATEUR CONNECTÉ
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const currentUserId = currentUser?.id || currentUser?._id;
      
      let usersList = [];
      
      // Gérer le format de réponse
      if (data.items && Array.isArray(data.items)) {
        usersList = data.items;
      } else if (Array.isArray(data)) {
        usersList = data;
      } else if (data.users && Array.isArray(data.users)) {
        usersList = data.users;
      } else {
        console.error('Format de réponse inattendu:', data);
        setUsers([]);
        return;
      }
      
      // ✅ FILTRER POUR EXCLURE L'ADMIN CONNECTÉ
      const filteredUsers = usersList.filter(user => {
        const userId = user.id || user._id;
        return userId !== currentUserId;
      });
      
      setUsers(filteredUsers);
      
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error('Erreur complète:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const user = await AdminService.getUserById(userId);
      setSelectedUser(user);
      setOpenDialog(true);
    } catch (err) {
      setError('Erreur lors du chargement des détails');
    }
  };

  const handleToggleBan = async (userId, currentStatus, userName) => {
    const action = currentStatus ? 'bannir' : 'débannir';
    const confirmMessage = `Êtes-vous sûr de vouloir ${action} ${userName} ?`;
    
    if (!window.confirm(confirmMessage)) return;

    try {
      await AdminService.toggleUserBan(userId, !currentStatus);
      setError('');
      loadUsers();
    } catch (err) {
      setError(`Erreur lors du ${action}issement`);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>Gestion des utilisateurs</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

      <TextField
        placeholder="Rechercher un utilisateur..."
        variant="standard"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#C084FC" }} />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        sx={{
          mb: 3,
          input: { color: "#fff", fontSize: 15 },
          borderRadius: 2,
          background: "rgba(139,92,246,0.12)",
          px: 2,
          py: 1.2,
          maxWidth: 400
        }}
      />

      <TableContainer component={Paper} sx={{
        background: "rgba(139,92,246,0.12)",
        backdropFilter: "blur(10px)",
        color: "white",
        border: "1px solid rgba(192,132,252,0.2)"
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#C084FC", fontWeight: 700 }}>Nom</TableCell>
              <TableCell sx={{ color: "#C084FC", fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: "#C084FC", fontWeight: 700 }}>Rôle</TableCell>
              <TableCell sx={{ color: "#C084FC", fontWeight: 700 }}>Statut</TableCell>
              <TableCell sx={{ color: "#C084FC", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ color: "#fff", textAlign: "center" }}>Chargement...</TableCell>
              </TableRow>
            ) : !Array.isArray(users) || users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ color: "#fff", textAlign: "center" }}>Aucun utilisateur trouvé</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id || user._id}>
                  <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 'admin' ? 'Admin' : 'User'}
                      size="small"
                      sx={{
                        bgcolor: user.role === 'admin' ? "#8B5CF6" : "#6B7280",
                        color: "#fff"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? 'Actif' : 'Banni'}
                      size="small"
                      sx={{
                        bgcolor: user.isActive ? "#10B981" : "#EF4444",
                        color: "#fff"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleViewUser(user.id || user._id)} 
                      size="small"
                      title="Voir les détails"
                    >
                      <VisibilityIcon sx={{ color: "#C084FC" }} />
                    </IconButton>
                    
                    {user.role !== 'admin' && (
                      <IconButton 
                        onClick={() => handleToggleBan(user.id || user._id, user.isActive, user.name)} 
                        size="small"
                        title={user.isActive ? 'Bannir' : 'Débannir'}
                      >
                        {user.isActive ? (
                          <BlockIcon sx={{ color: "#EF4444" }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: "#10B981" }} />
                        )}
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1F0B3D", color: "#C084FC" }}>Détails de l'utilisateur</DialogTitle>
        <DialogContent sx={{ bgcolor: "#1F0B3D", color: "#fff", pt: 2 }}>
          {selectedUser && (
            <Box>
              <Typography><strong>Nom:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Rôle:</strong> {selectedUser.role}</Typography>
              <Typography><strong>Provider:</strong> {selectedUser.authProvider}</Typography>
              <Typography><strong>Premium:</strong> {selectedUser.isPremium ? 'Oui' : 'Non'}</Typography>
              <Typography><strong>Email vérifié:</strong> {selectedUser.isEmailVerified ? 'Oui' : 'Non'}</Typography>
              <Typography><strong>Dernière connexion:</strong> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Jamais'}</Typography>
              <Typography><strong>Créé le:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#1F0B3D" }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#C084FC" }}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
