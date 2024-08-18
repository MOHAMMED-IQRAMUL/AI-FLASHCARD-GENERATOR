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
            <Link href="/sign-in" passHref>
              Sign In
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
        <SignUp />
      </Box>
    </Container>
  );
}
