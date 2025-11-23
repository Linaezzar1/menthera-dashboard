import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Avatar, Button, Alert, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider, TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../services/authService";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    // Edition nom
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [saving, setSaving] = useState(false);

    // Changer MDP
    const [openPwdDialog, setOpenPwdDialog] = useState(false);
    const [pwdForm, setPwdForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [pwdError, setPwdError] = useState("");
    const [pwdSuccess, setPwdSuccess] = useState("");

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setLoading(true);
            const userData = await AuthService.getCurrentUser();
            setUser(userData);
            setEditName(userData.name);
        } catch (err) {
            setError('Erreur lors du chargement du profil');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveName = async () => {
        setSaving(true);
        setError('');
        try {
            await AuthService.updateProfile({ name: editName });
            setIsEditing(false);
            await loadUserProfile();
        } catch (err) {
            setError('Erreur lors de la modification du nom');
        } finally {
            setSaving(false);
        }
    };

    const handleOpenPwdDialog = () => {
        setOpenPwdDialog(true);
        setPwdForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setPwdError("");
        setPwdSuccess("");
    };

    const handlePwdChange = (field, value) => {
        setPwdForm(f => ({ ...f, [field]: value }));
        setPwdError("");
        setPwdSuccess("");
    };

    const handlePwdSubmit = async () => {
        setPwdError("");
        setPwdSuccess("");
        if (pwdForm.newPassword.length < 6) {
            setPwdError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
            return;
        }
        if (pwdForm.newPassword !== pwdForm.confirmPassword) {
            setPwdError("La confirmation ne correspond pas au nouveau mot de passe.");
            return;
        }
        setPwdLoading(true);
        try {
            await AuthService.changePassword(pwdForm.oldPassword, pwdForm.newPassword);
            setPwdSuccess("Mot de passe changé avec succès !");
            setPwdForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setPwdError("Erreur lors du changement de mot de passe.");
        } finally {
            setPwdLoading(false);
        }
    };

    if (loading) {
        return (
            <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography variant="h5" sx={{ color: "white" }}>Chargement...</Typography>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box p={4}>
                <Alert severity="error">Impossible de charger le profil</Alert>
            </Box>
        );
    }

    return (
        <Box
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
        >
            {/* Bouton retour */}
            <Box display="flex" alignItems="center" mb={4} width="100%" maxWidth={500}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        color: "#C084FC",
                        '&:hover': { bgcolor: "rgba(192,132,252,0.1)" }
                    }}
                >
                    Retour au dashboard
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, width: "100%", maxWidth: 500 }} onClose={() => setError('')}>{error}</Alert>}

            {/* Carte de profil principale */}
            <Paper sx={{
                width: "100%",
                maxWidth: 500,
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(139,92,246,0.3)",
                position: "relative"
            }}>
                {/* Bouton éditer le nom */}
                <Box sx={{ position: "absolute", top: 20, right: 30, zIndex: 10 }}>
                    {!isEditing &&
                        <IconButton
                            onClick={() => setIsEditing(true)}
                            sx={{
                                bgcolor: "rgba(255,255,255,0.9)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                '&:hover': { bgcolor: "white" }
                            }}
                        >
                            <EditIcon sx={{ color: "#8B5CF6" }} />
                        </IconButton>
                    }
                </Box>

                {/* Header */}
                <Box sx={{
                    background: "linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)",
                    height: 180,
                    position: "relative"
                }}>
                    <Avatar
                        sx={{
                            width: 150,
                            height: 150,
                            position: "absolute",
                            bottom: -75,
                            left: "50%",
                            transform: "translateX(-50%)",
                            border: "6px solid white",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            bgcolor: "#8B5CF6",
                            fontSize: 60,
                            fontWeight: 700
                        }}
                    >
                        {user.name?.[0]?.toUpperCase() || "A"}
                    </Avatar>
                </Box>

                {/* Contenu de la carte */}
                <Box sx={{ pt: 10, pb: 4, px: 4, textAlign: "center" }}>
                    {isEditing ? (
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                            <TextField
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                size="small"
                                variant="standard"
                                InputProps={{
                                    style: {
                                        fontSize: 26,
                                        fontWeight: 700,
                                        color: "#8B5CF6",
                                        textAlign: "center"
                                    }
                                }}
                                sx={{
                                    input: { textAlign: "center" }
                                }}
                            />
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ bgcolor: "#8B5CF6", color: "#fff", borderRadius: 2, minWidth: 36, px: 2 }}
                                onClick={handleSaveName}
                                disabled={saving || !editName.trim()}
                            >
                                {saving ? <CircularProgress size={18} color="inherit" /> : "OK"}
                            </Button>
                            <Button
                                size="small"
                                sx={{ ml: 1 }}
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditName(user.name);
                                }}
                            >Annuler</Button>
                        </Box>
                    ) : (
                        <Typography variant="h4" sx={{
                            color: "#1F2937",
                            fontWeight: 700,
                            mb: 0.5,
                            fontFamily: "Poppins, sans-serif"
                        }}>
                            {user.name}
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
                        {user.email}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mb={1}>
                        <WorkIcon sx={{ fontSize: 16, color: "#8B5CF6" }} />
                        <Typography variant="body2" sx={{ color: "#374151", fontWeight: 500 }}>
                            {user.role?.toLowerCase() === 'admin' ? 'Administrateur' : 'Utilisateur'}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
                        Menthera Platform
                    </Typography>
                    <Box display="flex" justifyContent="space-around" mb={4}>
                        <Box>
                            <Typography variant="h5" sx={{ color: "#1F2937", fontWeight: 700 }}>
                                {user.isActive ? '✓' : '✗'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                Statut
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ color: "#1F2937", fontWeight: 700 }}>
                                {user.isEmailVerified ? '✓' : '✗'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                Vérifié
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ color: "#1F2937", fontWeight: 700 }}>
                                {user.isPremium ? '⭐' : '-'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                Premium
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            background: "linear-gradient(90deg, #FF5C8D 0%, #FFA247 100%)",
                            color: "white",
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 16,
                            textTransform: "none",
                            boxShadow: "0 4px 16px rgba(255,92,141,0.3)",
                            '&:hover': {
                                background: "linear-gradient(90deg, #FF5C8D 20%, #FFA247 100%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 20px rgba(255,92,141,0.4)",
                            },
                            transition: "all 0.3s ease"
                        }}
                        onClick={() => setOpenDialog(true)}
                    >
                        Voir plus
                    </Button>
                </Box>
            </Paper>

            {/* Dialog popup pour les détails */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,1) 100%)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
                    }
                }}
            >
                <DialogTitle sx={{
                    background: "linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)",
                    color: "white",
                    position: "relative",
                    pb: 3
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>
                        Informations détaillées
                    </Typography>
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "white"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Box
                    sx={{
                        width: "100%",
                        background: "linear-gradient(90deg,#b37cf6 25%, #c084fc 100%)",
                        height: 12,
                        filter: "blur(0.5px)",
                        opacity: 0.48,
                        mb: 0,
                    }}
                />

                <DialogContent sx={{ px: 4, pt: 4, pb: 2 }}>

                    {/* Email */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <EmailIcon sx={{ color: "#8B5CF6", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Adresse email
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: "#1F2937", fontWeight: 600, ml: 4 }}>
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Rôle */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <AdminPanelSettingsIcon sx={{ color: "#8B5CF6", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Rôle
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: "#1F2937", fontWeight: 600, ml: 4 }}>
                            {user.role?.toLowerCase() === 'admin' ? 'Administrateur' : 'Utilisateur'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Méthode d'auth */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <VerifiedIcon sx={{ color: "#8B5CF6", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Méthode de connexion
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: "#1F2937", fontWeight: 600, ml: 4 }}>
                            {user.authProvider === 'local' ? 'Email/Mot de passe' :
                                user.authProvider === 'google' ? 'Google OAuth' :
                                    user.authProvider === 'facebook' ? 'Facebook OAuth' : 'Inconnu'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Membre depuis */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <CalendarTodayIcon sx={{ color: "#8B5CF6", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Membre depuis
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: "#1F2937", fontWeight: 600, ml: 4 }}>
                            {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Dernière connexion */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <CalendarTodayIcon sx={{ color: "#8B5CF6", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Dernière connexion
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: "#1F2937", fontWeight: 600, ml: 4 }}>
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString('fr-FR') : 'Jamais'}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* Premium */}
                    <Box mb={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <WorkspacePremiumIcon sx={{ color: "#ffbe14", fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600 }}>
                                Statut premium
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ ml: 4, fontWeight: 600, color: user.isPremium ? "#ffbe14" : "#999" }}>
                            {user.isPremium ? `Jusqu'au ${user.premiumExpiresAt ? new Date(user.premiumExpiresAt).toLocaleDateString('fr-FR') : '(pas de date)'}` : "Non"}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    {/* Bouton changer mot de passe */}
                    <Box textAlign="center" mt={2}>
                        <Button
                            variant="outlined"
                            onClick={handleOpenPwdDialog}
                            sx={{
                                color: "#8B5CF6",
                                borderColor: "#8B5CF6",
                                fontWeight: 700,
                                '&:hover': { background: "#F3E8FF", borderColor: "#8B5CF6" }
                            }}
                        >
                            Changer le mot de passe
                        </Button>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(90deg, #8B5CF6 0%, #C084FC 100%)",
                            color: "white",
                            px: 4,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                background: "linear-gradient(90deg, #7B68C8 0%, #8B5CF6 100%)",
                            }
                        }}
                    >
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog changement mot de passe */}
            <Dialog
                open={openPwdDialog}
                onClose={() => setOpenPwdDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        background: "linear-gradient(135deg,#f9f7fa 0%, #ece2fa 100%)",
                        boxShadow: "0 10px 32px rgba(139,92,246,0.15)"
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, color: "#8B5CF6" }}>Changer le mot de passe</DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    {pwdSuccess && (
                        <Alert severity="success" sx={{ mb: 2 }}>{pwdSuccess}</Alert>
                    )}
                    {pwdError && (
                        <Alert severity="error" sx={{ mb: 2 }}>{pwdError}</Alert>
                    )}
                    <TextField
                        label="Ancien mot de passe"
                        type="password"
                        fullWidth
                        value={pwdForm.oldPassword}
                        onChange={e => handlePwdChange("oldPassword", e.target.value)}
                        sx={{ mb: 2, mt: 2 }}
                        InputLabelProps={{
                            sx: {
                                color: "#817d89ff",
                                fontWeight: 300,
                                '&.Mui-focused': { color: "#231943" },
                                '&.MuiInputLabel-shrink': { color: "#231943" }
                            }
                        }}
                        InputProps={{
                            sx: {
                                color: "#1a1a29", // Couleur du texte saisi
                                '& input': {
                                    color: "#1a1a29", // Pour les TextField standards (filled/outlined)
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        InputLabelProps={{
                            sx: { color: "#817d89ff", fontWeight: 300, fontSize: 16 }
                        }}
                        InputProps={{
                            sx: {
                                color: "#1a1a29", // Couleur du texte saisi
                                '& input': {
                                    color: "#1a1a29", // Pour les TextField standards (filled/outlined)
                                }
                            }
                        }}
                        value={pwdForm.newPassword}
                        onChange={e => handlePwdChange("newPassword", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        fullWidth
                        InputLabelProps={{
                            sx: { color: "#817d89ff", fontWeight: 300, fontSize: 16 }
                        }}
                        InputProps={{
                            sx: {
                                color: "#1a1a29", // Couleur du texte saisi
                                '& input': {
                                    color: "#1a1a29", // Pour les TextField standards (filled/outlined)
                                }
                            }
                        }}
                        value={pwdForm.confirmPassword}
                        onChange={e => handlePwdChange("confirmPassword", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={() => setOpenPwdDialog(false)}
                        sx={{ color: "#8B5CF6", fontWeight: 700 }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handlePwdSubmit}
                        variant="contained"
                        disabled={pwdLoading}
                        sx={{
                            background: "linear-gradient(90deg,#8B5CF6 0%,#FF6EC7 100%)",
                            color: "#fff",
                            fontWeight: 700
                        }}
                    >
                        {pwdLoading ? <CircularProgress size={20} color="inherit" /> : "Valider"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
