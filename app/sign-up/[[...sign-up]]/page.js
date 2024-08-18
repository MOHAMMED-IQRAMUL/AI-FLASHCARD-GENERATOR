import { SignUp } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
              Flashcard SaaS
            </Link>
            
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
              Sign In
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          // height: "80vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
