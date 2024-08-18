'use client'
import { SignIn } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
 
export default function SignInPage() {
  const router = useRouter()

  
  return ( 
    <Container maxWidth="sm">
        <div className="static top-0 w-full min-h-[100px] text-black flex justify-between items-center">
        <div>
          <Typography
            fontWeight="bold"
            sx={{ color: "#0A695E" }}
            variant="h6"
            style={{ flexGrow: 1 }}
          >
            <Link href="/" passHref>
              FlashLearn
            </Link>
          </Typography>
          </div>
          <div>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
          </div>
          
        
      </div>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          // height: "80vh",
        }}
      >
        <Typography textAlign='center' fontFamily='monospace' variant="h4" gutterBottom>
          Please Sign In To Continue To Dashboard
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
