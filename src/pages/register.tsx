import {
  Alert,
  Box,
  Button,
  CardMedia,
  CssBaseline,
  Fade,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Image from "../assets/register.png";
import { register } from "../services/auth/auth.service";
import React from "react";
function Register() {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    try {
      const response = await register(username, email, password);

      if (response === false) {
        setAlertMessage("Account Already Exist");
        setAlertOpen(true);
      } else {
        setAlertMessage("Registration Successful");
        setAlertOpen(true);
      }
      console.log(response);
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("An error occurred. Please try again.");
      setAlertOpen(true);
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          p={5}
        >
          <Typography variant="h3">Create your account</Typography>
          <Typography variant="body1" mt={3}>
            Monitor your task by having a todolist in your daily activity.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <TextField
              label="Username"
              name="username"
              id="username"
              autoFocus
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ required: false }}
              InputProps={{ sx: { borderRadius: 6 } }}
            />
            <TextField
              label="Email"
              name="email"
              id="email"
              autoFocus
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ required: false }}
              InputProps={{ sx: { borderRadius: 6 } }}
            />
            <TextField
              label="Password"
              name="password"
              id="password"
              type="password"
              margin="normal"
              InputProps={{ sx: { borderRadius: 6 } }}
              autoFocus
              InputLabelProps={{ required: false }}
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 6, backgroundColor: "#000" }}
            >
              Login
            </Button>
            <Typography>
              Already have an account? {""}
              <Link href="/" sx={{ mt: 2 }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={7}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <CardMedia
          component="img"
          image={Image}
          draggable={false}
          onLoad={() => console.log("this is loading")}
          onError={() => console.log("this is error")}
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "100vh",
            objectFit: "contain",
          }}
        />
      </Grid>
      <Fade in={alertOpen}>
        <Alert
          severity="error"
          variant="filled"
          sx={{
            position: "fixed",
            top: "5%",
            right: "5%",
            zIndex: 9999,
          }}
          onClose={() => setAlertOpen(false)}
        >
          {alertMessage}
        </Alert>
      </Fade>
    </Grid>
  );
}
export default Register;
