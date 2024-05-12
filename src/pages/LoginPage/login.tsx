import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1">Sign In</Typography>

        <Box component="form">
          <Typography sx={{ alignSelf: "flex-start", mt: 2 }}>Email</Typography>
          <TextField
            placeholder="Email"
            name="email"
            id="email"
            autoFocus
            fullWidth
            required
          />
          <Typography sx={{ alignSelf: "flex-start", mt: 2 }}>
            Password
          </Typography>
          <TextField
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            autoFocus
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Link href="/register" sx={{ alignSelf: "flex-start", mt: 2 }}>
            Don't have an account?
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
