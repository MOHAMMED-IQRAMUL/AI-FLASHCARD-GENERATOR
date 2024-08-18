"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BackButton() {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);
  return (
    <div className="w-full h-auto font-mono " >
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
            <p><Link href='#About US'>About US</Link></p>
            <p><Link href='#Contact US'>Contact US</Link></p>
            <UserButton />
          </div>
        </Toolbar>
      </div>
      <div  className="main w-full min-[800px] ">
 
        <Typography variant="h4" sx={{fontFamily:'cursive', color: "#00a1d9"}} textAlign='center' >WELCOME</Typography>

        <div className="btns w-[80%] mx-auto ">
        <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* {GENERATE} */}
            <Grid
              className="min-h-[300px] flex justify-center   align-middle"
              item
              xs={12}
              sm={4}
            >
              <Box
                sx={{
                  minheight: "300px",
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="font-mono"
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontFamily='monospace'
                >
                  GENERATE NEW FLASHCARD COLLECTION
                </Typography>

                 

                <Button
                
                  variant="contained"
                  className="bg-Coral_Pink font-mono"
                  sx={{
                    mt: 2,
                    "&:hover": {
                      border: "1px solid rgb(234, 106, 116)",
                      bgcolor: "#fff5d7",
                      color: "#e3460e",
                    },
                    fontSize: "1.2rem",
                  }}
                  href="/generate"
                >
                  GENERATE
                </Button>
              </Box>
            </Grid>

            {/* {Collection- Flashcards} */}
            <Grid
               className="min-h-[300px] flex justify-center   align-middle"
              item
              xs={12}
              sm={4}
              
            >
              <Box
                sx={{
                  minheight: "300px",
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  className="font-mono"
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  See Your Saved Collections
                </Typography>
                 
                <Button
                  variant="contained"
                  className="bg-Coral_Pink font-mono"
                  sx={{
                    mt: 2,
                    "&:hover": {
                      border: "1px solid rgb(234, 106, 116)",
                      bgcolor: "#fff5d7",
                      color: "#e3460e",
                    },
                    fontSize: "1.2rem",
                  }}
                  
                  href='/flashcards'
                >
                  COLLECTION
                </Button>
              </Box>
            </Grid>

            
          </Grid>
        </div>
      </div>
    </div>
  );
}
