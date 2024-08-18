"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Toolbar,
  Snackbar,
  Alert
} from "@mui/material";
import Link from "next/link.js";

export default function Generante() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSubmit = async () => {
    setIsFetching(true);

    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlashcards(data);
        setIsFetching(false);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name ");
      return;
    }
    setSaving(true);
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.includes(name)) {
        alert("Collection with this name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    setSaving(false);
    handleClose();
    setOpenAlert(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);   
  };
  
  return (
    <Box width="100vw" height="100vh" fontFamily="monospace">
      <div className="static top-0 w-full min-h-[80px] text-black ">
        <Toolbar>
          <Typography
            fontWeight="bold"
            sx={{ color: "#0A695E" }}
            variant="h6"
            style={{ flexGrow: 1 }}
          >
            <Link href="/dashboard" passHref>
              FlashLearn
            </Link>
          </Typography>
          <div className="c flex gap-10">
            <UserButton />
          </div>
        </Toolbar>
      </div>

      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Box
          sx={{
            mt: 4,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontFamily="monospace" variant="h4">
            Generate Flashcards
          </Typography>

          <Paper sx={{ p: 4, width: "100%" }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter Text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              fontFamily="monospace"
              sx={{
                mt: 2,
                "&:hover": {
                  border: "1px solid rgb(234, 106, 116)",
                  bgcolor: "#fff5d7",
                  color: "#e3460e",
                },
              }}
              className="bg-Coral_Pink font-mono"
              onClick={handleSubmit}
              disabled={isFetching}
            >
              <Typography sx={{ fontSize: "20px" }}>Submit</Typography>
            </Button>
            {isFetching && <LinearProgress color="success" />}
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography fontFamily="monospace" variant="h5">
              Flashcards Preview
            </Typography>

            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography
                              fontFamily="monospace"
                              variant="h5"
                              component="div"
                            >
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              fontFamily="monospace"
                              variant="h5"
                              component="div"
                            >
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter a name for your flashcards collection
              <TextField
                autoFocus
                margin="dense"
                label="Collection Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={saving} onClick={saveFlashcards}>Save</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
      open={openAlert}
      autoHideDuration={2000}
      onClose={() => setOpenAlert(false)}
    >
      <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
      Flashcards saved successfully, Redirecting to Dashboard
      </Alert>
    </Snackbar>
      </Container>
    </Box>
  );
}
