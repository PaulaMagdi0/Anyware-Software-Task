import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Tooltip,
  Paper,
  useTheme,
  useMediaQuery,
  keyframes,
  alpha,
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
import SchoolIcon from '@mui/icons-material/School';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${alpha('#1976d2', 0.7)};
  }
  70% {
    box-shadow: 0 0 0 10px ${alpha('#1976d2', 0)};
  }
  100% {
    box-shadow: 0 0 0 0 ${alpha('#1976d2', 0)};
  }
`;

const SignInPage = ({ mode, setMode }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    } catch (err: unknown) {
      const errorData = err as { data?: { message?: string } };
      const msg = errorData?.data?.message || "Login failed.";
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
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: theme.palette.background.default,
      background: mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    }}>
      <Navbar mode={mode} setMode={setMode} />
      
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        animation: `${fadeIn} 0.8s ease-out`
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Paper 
            elevation={16}
            sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              minHeight: isMobile ? 'auto' : '550px',
              boxShadow: mode === 'dark' 
                ? '0 10px 40px rgba(0,0,0,0.5)' 
                : '0 10px 40px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: mode === 'dark' 
                  ? '0 15px 50px rgba(0,0,0,0.6)' 
                  : '0 15px 50px rgba(0,0,0,0.15)',
              }
            }}
          >
            {/* Hero Section */}
            <Box
              sx={{
                flex: isMobile ? '0 0 250px' : '0 0 50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'url("https://source.unsplash.com/1600x900/?education,campus")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  zIndex: 1
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.7)} 0%, ${alpha(theme.palette.primary.main, 0.4)} 100%)`,
                  zIndex: 2
                }
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                zIndex: 3,
                animation: `${slideIn} 0.8s ease-out`,
              }}>
                <Box sx={{ 
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  mb: 3,
                  animation: `${pulse} 2s infinite`,
                }}>
                  <SchoolIcon sx={{ fontSize: 70 }} />
                </Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    animation: `${fadeIn} 0.8s ease-out 0.2s both`,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    opacity: 0.9,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    animation: `${fadeIn} 0.8s ease-out 0.4s both`,
                  }}
                >
                  Access your student dashboard and stay connected
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    maxWidth: '80%', 
                    mx: 'auto', 
                    opacity: 0.8,
                    animation: `${fadeIn} 0.8s ease-out 0.6s both`,
                  }}
                >
                  Track your progress, access learning materials, and connect with your peers
                </Typography>
              </Box>
            </Box>
            
            {/* Login Form */}
            <Box
              sx={{
                flex: isMobile ? '1' : '0 0 50%',
                p: { xs: 3, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                animation: `${fadeIn} 0.8s ease-out 0.3s both`,
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ 
                  display: 'inline-flex',
                  p: 1.5,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  mb: 2,
                  animation: `${pulse} 2s infinite`,
                }}>
                  <LockOutlinedIcon />
                </Box>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 500,
                    animation: `${fadeIn} 0.8s ease-out 0.4s both`,
                  }}
                >
                  Sign In
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3,
                    animation: `${fadeIn} 0.8s ease-out 0.5s both`,
                  }}
                >
                  Enter your credentials to access your account
                </Typography>
              </Box>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    animation: `${fadeIn} 0.5s ease-out`,
                  }}
                >
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
                  variant="outlined"
                  sx={{
                    mb: 2,
                    animation: `${fadeIn} 0.8s ease-out 0.6s both`,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      }
                    }
                  }}
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  sx={{
                    mb: 3,
                    animation: `${fadeIn} 0.8s ease-out 0.7s both`,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ 
                    mt: 1, 
                    py: 1.5, 
                    borderRadius: 2,
                    animation: `${fadeIn} 0.8s ease-out 0.8s both`,
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
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
                  sx={{ 
                    mt: 2, 
                    borderRadius: 2,
                    animation: `${fadeIn} 0.8s ease-out 0.9s both`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={handleQuickLogin}
                  disabled={isLoading}
                >
                  Quick Login (Guest)
                </Button>
              </Tooltip>
            </Box>
          </Paper>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default SignInPage;
