import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  alpha,
  keyframes,
  Container,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectAuthLoading,
  selectIsGuest,
} from "../store/slices/authSlice";
import type { RootState } from "../store";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Navbar = ({ mode, setMode }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const token = useSelector((state: RootState) => state.auth.token);
  const isGuest = useSelector(selectIsGuest);
  const loading = useSelector(selectAuthLoading);

  // Language dropdown state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Persist selected language on load
  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(storedLang);
    document.body.dir = storedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleLangClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <CircularProgress color="primary" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        animation: `${fadeInDown} 0.5s ease-out`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          sx={{ 
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Box 
            display="flex" 
            alignItems="center" 
            gap={1}
            component={Link}
            to="/"
            sx={{ 
              color: theme.palette.text.primary,
              textDecoration: "none",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <SchoolIcon 
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: 28,
              }} 
            />
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t("Student Dashboard")}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {/* 🌗 Theme toggle */}
            <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
              <IconButton
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                sx={{ 
                  color: theme.palette.text.primary,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'rotate(20deg)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            {/* 🌍 Language Dropdown */}
            <Tooltip title={t("language") || "Language"}>
              <IconButton
                onClick={handleLangClick}
                sx={{ 
                  color: theme.palette.text.primary,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                aria-controls={open ? "lang-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="lang-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: 2,
                  mt: 1.5,
                  minWidth: 120,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => handleLangClose("en")}>English</MenuItem>
              <MenuItem onClick={() => handleLangClose("ar")}>العربية</MenuItem>
            </Menu>

            {/* 🔐 Auth Buttons */}
            {!token ? (
              <Button 
                variant="contained"
                disableElevation
                onClick={() => navigate("/signin")}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
                  }
                }}
              >
                {t("signIn")}
              </Button>
            ) : (
              <>
                {!isGuest && (
                  <Button 
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      borderRadius: 2,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    {t("dashboard")}
                  </Button>
                )}
                <Button 
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    borderColor: theme.palette.error.main,
                    color: theme.palette.error.main,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: theme.palette.error.main,
                      backgroundColor: alpha(theme.palette.error.main, 0.05),
                    }
                  }}
                >
                  {t("logout")}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
