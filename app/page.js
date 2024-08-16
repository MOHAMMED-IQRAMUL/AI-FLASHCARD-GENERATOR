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
import Head from "next/head";
import Link from "next/link.js";

export default function Home() {
  return (
    <Container maxWidth="100vw">
      {/* <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create Flashcard From Your Text" />
      </Head> */}

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/" passHref>
              Flashcard SaaS
            </Link>
          </Typography>

          <SignedOut>
            <Button color="inherit" href="/sign-in">Sign In</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <Typography variant="h2">Welcome To Flashcard SaaS</Typography>
        <Typography variant="h5">
          Create Flashcard From Your Text Easily
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>
      <Box width="100%" sx={{display:'flex', justifyContent:'center' , alignItems:'center'}}>
        <Button textAlign="center" variant="contained" href="/generate">Go Directly To Dashboard</Button>
        </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h2" components="h2">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography variant="body1">
                Simply input your text, and our system will generate flashcards
                automatically.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6">Customizable Cards</Typography>
              <Typography variant="body1">
                Customize the appearance of your flashcards with our easy-to-use
                interface.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6">Customizable Cards</Typography>
              <Typography variant="body1">
                Customize the appearance of your flashcards with our easy-to-use
                interface.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4">Pricing</Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          Simple and Affordable Pricing
        </Typography>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          Choose a plan that fits your needs.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* {Free Plan} */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                minheight: "200px",
                p: 3,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Basic
              </Typography>

              <Typography variant="h6" color="primary" gutterBottom>
                Free
              </Typography>

              <Typography variant="body1">
                Perfect for students and casual learners.
              </Typography>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                Basic Features and Limited Storage
              </Typography>
              
              <Button  variant="contained" color="primary" sx={{ mt: 2 }} href='/generate'>
                Dashboard
              </Button>


              <Button color="inherit" href='/generate'>
                PROCEED TO DASHBOARD
              </Button>
              <Typography>Currently No Login Required, But Logins are working Fine</Typography>
            </Box>
          </Grid>

          {/* {Pro} */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                minheight: "200p",
                p: 3,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                $10/month
              </Typography>
              <Typography variant="body1">
                For professionals and power users.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
              More accurate and Unlimited Storage
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Get Started
              </Button>
            </Box>
          </Grid>

          {/* {Group} */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                minheight: "200px",
                p: 3,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Enterprise
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1">
                Custom solutions for large organizations.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Multiple Users and Unlimited Storage
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Contact Sales
              </Button>
            </Box>
          </Grid>
        
        
        
        </Grid>
      </Box>
    </Container>
  );
}
