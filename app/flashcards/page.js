"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link.js";

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
       <div className="static top-0 w-full min-h-[100px] text-black flex justify-between items-center">
        <div>
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
          </div>
          <div className="m flex gap-10">
            <p><Button href='/dashboard'>Dashboard</Button></p>
            <p><Button href='/generate'>Generate</Button></p>
          </div>
          <div >
            <UserButton />
          </div>
        
      </div>
      <Box className="w-full">
       
      <Typography fontFamily='monospace' variant="h4" sx={{ mt: 4, mb: 2 }}>
        Choose a flashcard set
      </Typography>
         
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography fontFamily='monospace' variant="h6">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Container>
  );
}
