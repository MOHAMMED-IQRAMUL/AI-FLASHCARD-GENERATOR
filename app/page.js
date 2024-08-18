"use client";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import getstripe from "../utils/get-stripe.js";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link.js";

export default function Home() {
  const handleSubmit = async (planType) => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({ planType }),
    });

    const checkoutSessionJson = await response.json();

    if (response.statusCode === 500) {
      console.error(checkoutSessionJson.error.message);

      return;
    }
    const stripe = await getstripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  return (
    <div className="font-mono">
      <div
        position="static"
        sx={{ width: "100%", backgroundColor: "White", color: "black" }}
      >
        <Toolbar>
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
          <div className="flex gap-5">
            <SignedOut>
              <Button
                variant="outlined"
                color="inherit"
                href="/sign-in"
                sx={{
                  "&:hover": {
                    border: "1px solid rgb(234, 106, 116)",
                    bgcolor: "#fff5d7",
                    color: "#e3460e",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                href="/sign-up"
                sx={{
                  "&:hover": {
                    border: "1px solid rgb(234, 106, 116)",
                    bgcolor: "#fff5d7",
                    color: "#e3460e",
                  },
                }}
              >
                Sign Up
              </Button>
            </SignedOut>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </div>
      <Container
        maxWidth="100vw"
        sx={{ color: "#573d1c", fontFamily: "monospace" }}
        className="font-mono"
      >
        <Box
          sx={{
            textAlign: "center",
            my: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "#99e1d9", fontFamily: "cursive" }}
          >
            Welcome To FlashLearn
          </Typography>
          <Typography variant="h5" className="font-mono">
            Here You Can Create Flashcard From Your Text Easily
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              "&:hover": {
                border: "1px solid rgb(234, 106, 116)",
                bgcolor: "#fff5d7",
                color: "#e3460e",
              },
            }}
            className="bg-Coral_Pink font-mono"
            href="/dashboard"
          >
            Get Started
          </Button>
        </Box>
        <Box
        // sx={{ my: 6 }}
        >
          <Typography variant="h2" components="h2" className="font-mono">
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid
              className="min-h-[200px] flex justify-center   align-middle"
              item
              xs={12}
              md={4}
            >
              <Box
                className="font-mono"
                sx={{
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                }}
              >
                <Typography className="font-mono" variant="h6">
                  Easy Text Input
                </Typography>
                <Typography className="font-mono" variant="body1">
                  Simply input your text, and our system will generate
                  flashcards automatically.
                </Typography>
              </Box>
            </Grid>

            <Grid
              className="min-h-[200px] flex justify-center   align-middle"
              item
              xs={12}
              md={4}
            >
              <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
                <Typography variant="h6" className="font-mono">
                  Customizable Cards
                </Typography>
                <Typography variant="body1" className="font-mono">
                  Customize the appearance of your flashcards with our
                  easy-to-use interface.
                </Typography>
              </Box>
            </Grid>

            <Grid
              className="min-h-[200px] flex justify-center   align-middle"
              item
              xs={12}
              md={4}
            >
              <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
                <Typography variant="h6" className="font-mono">
                  Customizable Cards
                </Typography>
                <Typography variant="body1" className="font-mono">
                  Customize the appearance of your flashcards with our
                  easy-to-use interface.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography className="font-mono" variant="h4">
            Pricing
          </Typography>

          <Typography
            className="font-mono"
            variant="h4"
            component="h2"
            gutterBottom
          >
            Simple and Affordable Pricing
          </Typography>

          <Typography
            className="font-mono"
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            Choose a plan that fits your needs.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* {Free Plan} */}
            <Grid
              className="min-h-[300px] flex justify-center   align-middle"
              item
              xs={12}
              sm={4}
            >
              <Box
                sx={{
                  minheight: "200px",
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                }}
                className="font-mono"
              >
                <Typography
                  className="font-mono"
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  Basic
                </Typography>

                <Typography
                  className="font-mono"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Free
                </Typography>

                <Typography className="font-mono" variant="body1">
                  Perfect for students and casual learners.
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  Basic Features and Limited Storage
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
                  }}
                  href="/dashboard"
                >
                  Get Started
                </Button>
              </Box>
            </Grid>

            {/* {Pro} */}
            <Grid
              className="min-h-[300px] flex justify-center   align-middle"
              item
              xs={12}
              sm={4}
            >
              <Box
                sx={{
                  minheight: "200p",
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  className="font-mono"
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  Pro
                </Typography>
                <Typography
                  className="font-mono"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  $5/month
                </Typography>
                <Typography className="font-mono" variant="body1">
                  For professionals and power users.
                </Typography>
                <Typography
                  className="font-mono"
                  variant="body1"
                  sx={{ mt: 2 }}
                >
                  More accurate and Unlimited Storage
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
                  }}
                  onClick={() => handleSubmit("pro")}
                >
                  Choose Pro
                </Button>
              </Box>
            </Grid>

            {/* {Group} */}
            <Grid
              className="min-h-[300px] flex justify-center   align-middle"
              item
              xs={12}
              sm={4}
            >
              <Box
                sx={{
                  minheight: "200px",
                  p: 3,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  className="font-mono"
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  Enterprise
                </Typography>
                <Typography
                  className="font-mono"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Contact Us
                </Typography>
                <Typography className="font-mono" variant="body1">
                  Custom solutions for large organizations.
                </Typography>
                <Typography
                  className="font-mono"
                  variant="body1"
                  sx={{ mt: 2 }}
                >
                  Multiple Users and Unlimited Storage
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    "&:hover": {
                      border: "1px solid rgb(234, 106, 116)",
                      bgcolor: "#fff5d7",
                      color: "#e3460e",
                    },
                  }}
                  className="text-Coral_Pink border-Coral_Pink font-mono"
                >
                  Contact Sales
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Typography className="font-mono">
            Here The Payment Gateway is Working very Fine But We Are Unable To
            Map With User Account
          </Typography>
          <Typography className="font-mono">
            Since the project is in Test Mode, So for Sucessfull Payment Use
          </Typography>
          <Typography className="font-mono">
            Card Number: 4242 4242 4242 4242 Expiration Date: Any valid future
            date (e.g., 12/34) CVC: Any 3 digits (e.g., 123)
          </Typography>
        </Box>
      </Container>
      <Box
        component="footer"
        sx={{
          bgcolor: "#f5f5f5",
          py: 4,
          mt: "auto",
          borderTop: "1px solid #ddd",
        }}
        className="bg-gray-100"
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} className="text-center md:text-left">
            <Grid item xs={12} md={4}>
              <Typography className="font-mono" variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography
                className="font-mono"
                variant="body2"
                color="textSecondary"
              >
                We are a team dedicated to providing the best flashcard
                solutions.
              </Typography>
            </Grid>
            <Grid className="font-mono" item xs={12} md={4}>
              <Typography className="font-mono" variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  onClick={() => router.push("/")}
                  className="block mb-2"
                >
                  Home
                </Link>
                <Link href="/features" color="inherit" className="block mb-2">
                  Features
                </Link>
                <Link href="/pricing" color="inherit" className="block mb-2">
                  Pricing
                </Link>
                <Link href="/contact" color="inherit" className="block mb-2">
                  Contact
                </Link>
              </Box>
            </Grid>
            <Grid className="font-mono" item xs={12} md={4}>
              <Typography className="font-mono" variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography
                className="font-mono"
                variant="body2"
                color="textSecondary"
              >
                Email:{" "}
                <Link href="mailto:support@example.com">
                  support@example.com
                </Link>
              </Typography>
              <Typography
                className="font-mono"
                variant="body2"
                color="textSecondary"
              >
                Phone: <Link href="tel:+1234567890">+1 (234) 567-890</Link>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography
              className="font-mono"
              variant="body2"
              color="textSecondary"
            >
              © {new Date().getFullYear()} AI Flashcard Generator. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
