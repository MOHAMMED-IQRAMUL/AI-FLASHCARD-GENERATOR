"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { setFlashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <Box width="100vw" height="100vh" sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>Loading...</Box>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard/?id=${id}`);
  };

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
