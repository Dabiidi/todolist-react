import {
  Box,
  Button,
  CardMedia,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Image from "../assets/login.png";
import React, { useState } from "react";
import { login } from "../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const response = await login(email, password);
      if (response) {
        const { id: userId, name } = response;
        navigate("/home", { state: { userId, name } });
      } else {
        setError(true);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <Typography variant="h3">Welcome Back!</Typography>
          <Typography variant="body1" mt={3}>
            Monitor your task by having a todolist in your daily activity.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={3}>
            {error && (
              <Typography variant="body1" color={"red"} textAlign={"center"}>
                Invalid Email or Password.
              </Typography>
            )}
            <TextField
              label="Email"
              name="email"
              id="email"
              autoFocus
              fullWidth
              margin="normal"
              required
              error={error}
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
              error={error}
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
            <Link href="/register" sx={{ mt: 2 }}>
              Don't have an account?
            </Link>
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
            objectFit: "fill",
          }}
        />
      </Grid>
    </Grid>
  );
}
export default Login;
