import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCredentials,
  setError,
  setLoading,
} from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoginMutation } from "../services/apiSlice";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const SignInPage = ({ mode, setMode }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in both fields.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: data.email, token: data.token }));
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err?.data?.message || "Login failed.";
      setErrorMsg(msg);
      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleQuickLogin = () => {
    dispatch(
      setCredentials({
        user: "guest",
        token: "guest-token",
        isGuest: true,
      })
    );
    navigate("/"); // redirect to hero/home
  };

  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <Container maxWidth="sm">
        <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h4" gutterBottom align="center">
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Tooltip title="Log in instantly using a demo student account">
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleQuickLogin}
              disabled={isLoading}
            >
              Quick Login (Guest)
            </Button>
          </Tooltip>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignInPage;
