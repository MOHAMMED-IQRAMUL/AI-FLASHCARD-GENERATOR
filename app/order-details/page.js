'use client'
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function OrderDetails() {
  const router = useRouter();

  return (
    <Box width="100vw" sx={{textAlign:'center', pt:5}}>
        <Typography variant="h4" gutterBottom sx={{mt:5}}>
        Order Details
      </Typography>
      <Divider />
      
    </Box>
  );
}
