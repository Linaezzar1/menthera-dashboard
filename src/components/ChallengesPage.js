import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Paper, CircularProgress, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton, List, ListItem, ListItemText, FormControlLabel, Radio, RadioGroup
} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ChallengeService from "../services/ChallengeService";

const isAdmin = true; // ou false selon ton contexte

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Création
  const [open, setOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    weekStart: "",
    weekEnd: "",
    questions: []
  });
  const [questionDraft, setQuestionDraft] = useState({
    text: "",
    choices: ["", ""],
    correctIndex: 0
  });
  const [creating, setCreating] = useState(false);

  // Suppression
  const [deleting, setDeleting] = useState({});

  // Détail challenge
  const [challengeDetails, setChallengeDetails] = useState(null);

  useEffect(() => { fetchChallenges(); }, []);
  async function fetchChallenges() {
    setLoading(true);
    setError(null);
    try {
      const list = await ChallengeService.listChallenges();
      setChallenges(list);
    } catch {
      setError("Erreur lors du chargement des challenges");
    } finally {
      setLoading(false);
    }
  }

  // Formulaire - Ajouter une question à la liste
  const handleValidateQuestion = () => {
    if (
      questionDraft.text.trim() &&
      questionDraft.choices.length >= 2 &&
      questionDraft.choices.every(c => c.trim())
    ) {
      setNewChallenge(n => ({
        ...n,
        questions: [...n.questions, { ...questionDraft }]
      }));
      setQuestionDraft({ text: "", choices: ["", ""], correctIndex: 0 });
    }
  };

  // Finaliser le challenge
  const handleCreate = async () => {
    setCreating(true);
    setError(null);
    try {
      await ChallengeService.createChallenge(newChallenge);
      setOpen(false);
      setNewChallenge({
        title: "",
        description: "",
        weekStart: "",
        weekEnd: "",
        questions: []
      });
      setQuestionDraft({ text: "", choices: ["", ""], correctIndex: 0 });
      fetchChallenges();
    } catch {
      setError("Erreur lors de la création du challenge");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (challengeId) => {
    setDeleting(d => ({ ...d, [challengeId]: true }));
    setError(null);
    try {
      await ChallengeService.deleteChallenge(challengeId);
      setChallenges(cs => cs.filter(c => c._id !== challengeId));
    } catch {
      setError("Erreur lors de la suppression du challenge");
    } finally {
      setDeleting(d => ({ ...d, [challengeId]: false }));
    }
  };

  // Ouvre/modale détails
  const openDetails = async (challenge) => {
    setChallengeDetails(challenge);
  };

  if (loading) {
    return (
      <Box sx={{ mt: 7, textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{
      width: "100%",
      maxWidth: "1200px",
      mx: "auto",
      mt: 4,
      px: { xs: 2, md: 0 },
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, px: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ color: "#FF6EC7", fontWeight: 800, letterSpacing: 1.15 }}>
            Challenges Menthera
          </Typography>
          <Typography sx={{ color: "#B2A1FF", fontSize: 18, mt: 1 }}>
            Relevez des défis bien-être pour booster votre mental
          </Typography>
        </Box>
        {isAdmin &&
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpen(true)}
            sx={{
              background: "linear-gradient(90deg,#FF6EC7 0%,#7B68C8 100%)",
              color: "#fff",
              fontWeight: 700,
              px: 3, py: 1,
              borderRadius: 3,
              fontSize: 17,
              '&:hover': { background: "linear-gradient(90deg,#7B68C8 10%,#FF6EC7 100%)" }
            }}
          >
            Nouveau Challenge
          </Button>
        }
      </Box>

      {error &&
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      }

      <Box sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: { xs: "center", md: "flex-start" }
      }}>
        {challenges.map((challenge) => (
          <Paper
            key={challenge._id}
            elevation={4}
            sx={{
              flex: "1 1 430px",
              maxWidth: 510,
              bgcolor: "rgba(28,19,58,0.88)",
              borderRadius: 2,
              px: 4, py: 3,
              mb: 3,
              minWidth: 340,
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => openDetails(challenge)}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmojiEventsIcon sx={{ color: "#00D4FF", mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{
                  color: "#EAEAFC", fontWeight: 700
                }}>
                  {challenge.title}
                </Typography>
              </Box>
              <Typography sx={{ color: "#B2A1FF", fontSize: 15, mt: 1, maxWidth: 360 }}>
                {challenge.description}
              </Typography>
            </Box>
            {isAdmin &&
              <IconButton
                size="large"
                sx={{
                  color: "#FF6EC7",
                  ml: 1,
                  '&:hover': { color: "#FF0000" }
                }}
                disabled={deleting[challenge._id]}
                onClick={e => { e.stopPropagation(); handleDelete(challenge._id); }}
              >
                {deleting[challenge._id]
                  ? <CircularProgress size={22} />
                  : <DeleteForeverIcon sx={{ fontSize: 30 }} />}
              </IconButton>
            }
          </Paper>
        ))}
        {challenges.length === 0 &&
          <Typography sx={{ color: "#fff", textAlign: "center", mt: 4 }}>
            Aucun challenge disponible pour l’instant.
          </Typography>
        }
      </Box>

      {/* Détail du challenge : COULEURS PREMIUM/LISIBLES */}
      {challengeDetails &&
        <Dialog
          open={Boolean(challengeDetails)}
          onClose={() => setChallengeDetails(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: "linear-gradient(110deg, #2B165A 0%, #493476 90%)",
              borderRadius: 2,
              boxShadow: "0 7px 32px 5px #120b2c88"
            }
          }}>
          <DialogTitle sx={{
            color: "#FF6EC7",
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 1
          }}>{challengeDetails.title}</DialogTitle>
          <DialogContent sx={{
            background: "transparent",
            px: 4,
            pb: 2
          }}>
            <Typography sx={{
              mb: 3,
              color: "#E6DFFF",
              fontSize: 17,
              fontWeight: 400
            }}>{challengeDetails.description}</Typography>
            <List>
              {challengeDetails.questions && challengeDetails.questions.map((q, idx) => (
                <ListItem key={idx} sx={{ flexDirection: "column", alignItems: "flex-start", mb: 2 }}>
                  <Typography sx={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: "#fff",
                    mb: 1,
                  }}>
                    {q.text}
                  </Typography>
                  <Box sx={{ ml: 1 }}>
                    {q.choices.map((ch, i) => (
                      <Typography
                        key={i}
                        sx={{
                          color: i === q.correctIndex ? "#00D4FF" : "#E6DFFF",
                          fontWeight: i === q.correctIndex ? 800 : 400,
                          fontSize: 15,
                          mb: 0.5,
                          letterSpacing: 0.2
                        }}
                      >
                        {i === q.correctIndex ? "✔ " : ""}
                        {ch}
                      </Typography>
                    ))}
                  </Box>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ background: "transparent" }}>
            <Button
              onClick={() => setChallengeDetails(null)}
              sx={{
                color: "#B2A1FF",
                fontWeight: 700,
                mr: 2,
                fontSize: 16,
                '&:hover': { color: "#00D4FF" }
              }}>
              FERMER
            </Button>
          </DialogActions>
        </Dialog>
      }

      {/* Modal création challenge : DESIGN PERSONNALISÉ */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "#573870a5 !important", // fond personnalisé
            boxShadow: 24
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Nouveau Challenge</DialogTitle>
        <DialogContent sx={{ background: "#4f326799" }}>
          <TextField
            label="Titre"
            fullWidth
            value={newChallenge.title}
            onChange={e => setNewChallenge(n => ({ ...n, title: e.target.value }))}
            sx={{ my: 1 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newChallenge.description}
            onChange={e => setNewChallenge(n => ({ ...n, description: e.target.value }))}
            sx={{ my: 1 }}
          />
          <TextField
            label="Début de la semaine"
            type="date"
            fullWidth
            value={newChallenge.weekStart}
            onChange={e => setNewChallenge(n => ({ ...n, weekStart: e.target.value }))}
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fin de la semaine"
            type="date"
            fullWidth
            value={newChallenge.weekEnd}
            onChange={e => setNewChallenge(n => ({ ...n, weekEnd: e.target.value }))}
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: true }}
          />

          {/* Question-draft logic */}
          <Box sx={{ p: 2, bgcolor: "rgba(120,104,196,0.08)", borderRadius: 2, my: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Ajoute une question :</Typography>
            <TextField
              label="Texte de la question"
              fullWidth
              value={questionDraft.text}
              onChange={e => setQuestionDraft(q => ({ ...q, text: e.target.value }))}
              sx={{ mb: 1 }}
            />
            {questionDraft.choices.map((choice, idx) => (
              <TextField
                key={idx}
                label={`Choix ${idx + 1}`}
                fullWidth
                value={choice}
                onChange={e => {
                  const updated = [...questionDraft.choices];
                  updated[idx] = e.target.value;
                  setQuestionDraft(q => ({ ...q, choices: updated }));
                }}
                sx={{ mb: 1 }}
              />
            ))}
            <Button
              size="small"
              onClick={() => setQuestionDraft(q => ({ ...q, choices: [...q.choices, ""] }))}
              sx={{ mr: 2, mb: 1 }}
            >
              Ajouter un choix
            </Button>
            {questionDraft.choices.length > 2 &&
              <Button
                size="small"
                color="secondary"
                onClick={() => setQuestionDraft(q => ({ ...q, choices: q.choices.slice(0, -1) }))}
                sx={{ mb: 1 }}
              >
                Supprimer un choix
              </Button>
            }
            <Typography variant="body2" sx={{ mt: 1 }}>Bonne réponse :</Typography>
            <RadioGroup
              row
              value={questionDraft.correctIndex}
              onChange={e => setQuestionDraft(q => ({ ...q, correctIndex: Number(e.target.value) }))}
            >
              {questionDraft.choices.map((_, idx) => (
                <FormControlLabel
                  key={idx}
                  value={idx}
                  control={<Radio />}
                  label={`${idx + 1}`}
                  sx={{ mr: 2 }}
                  disabled={!questionDraft.choices[idx].trim()}
                />
              ))}
            </RadioGroup>
            <Button
              sx={{ mt: 1 }}
              onClick={handleValidateQuestion}
              disabled={
                !questionDraft.text.trim() ||
                questionDraft.choices.length < 2 ||
                !questionDraft.choices.every(c => c.trim())
              }
              variant="contained"
            >
              Valider la question
            </Button>
          </Box>

          {/* Liste des questions dynamiquement */}
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Questions du challenge :</Typography>
            {newChallenge.questions.length === 0 &&
              <Typography>Aucune question validée.</Typography>
            }
            {newChallenge.questions.map((q, idx) => (
              <Box key={idx} sx={{ mb: 2, pl: 1, borderLeft: "4px solid #FF6EC7" }}>
                <Typography fontWeight={700}>{q.text}</Typography>
                <ul>
                  {q.choices.map((ch, cidx) => (
                    <li key={cidx}
                      style={{ color: q.correctIndex === cidx ? "#00D4FF" : undefined, fontWeight: q.correctIndex === cidx ? 700 : 400 }}>
                      {ch}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ background: "#57387099" }}>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button
            onClick={handleCreate}
            disabled={creating || newChallenge.questions.length === 0}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#8A2BE2 0%,#FF6EC7 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              px: 3,
              borderRadius: 4,
              '&:hover': {
                background: "linear-gradient(90deg,#FF6EC7 15%,#8A2BE2 100%)"
              }
            }}>
            {creating ? "Création..." : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
