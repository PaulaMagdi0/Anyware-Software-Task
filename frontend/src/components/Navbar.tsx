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
  useMediaQuery,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
import SchoolIcon from "@mui/icons-material/School";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
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
  sidebarToggle?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  sidebarOpen?: boolean;
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

const Navbar = ({
  mode,
  setMode,
  sidebarToggle,
  setSidebarOpen,
  sidebarOpen,
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const token = useSelector((state: RootState) => state.auth.token);
  const isGuest = useSelector(selectIsGuest);
  const loading = useSelector(selectAuthLoading);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          backdropFilter: "blur(10px)",
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
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        animation: `${fadeInDown} 0.5s ease-out`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: { xs: 0.5, sm: 1 },
            px: { xs: 0, sm: 2 },
          }}
        >
          {/* Combined Menu Toggle and Logo Section */}
          <Box display="flex" alignItems="center">
            {/* Mobile Sidebar Toggle */}
            {sidebarToggle && isMobile && (
              <IconButton
                onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
                sx={{
                  color: theme.palette.text.primary,
                  mr: 1,
                }}
              >
                {sidebarOpen ? <Close /> : <MenuIcon />}
              </IconButton>
            )}

            {/* Logo Section */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              component={Link}
              to="/"
              sx={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <SchoolIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: 24, sm: 28 },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  display: { xs: "none", sm: "block" },
                }}
              >
                {t("home")}
              </Typography>
            </Box>
          </Box>

          {/* Right Side Controls */}
          <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1 }}>
            {/* Theme Toggle */}
            <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
              <IconButton
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                sx={{
                  color: theme.palette.text.primary,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "rotate(20deg)",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            {/* Language Dropdown */}
            <Tooltip title={t("language") || "Language"}>
              <IconButton
                onClick={handleLangClick}
                sx={{
                  color: theme.palette.text.primary,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
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
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleLangClose("en")}>English</MenuItem>
              <MenuItem onClick={() => handleLangClose("ar")}>العربية</MenuItem>
            </Menu>

            {/* Auth Buttons */}
            {!token ? (
              // Sign In Button
              isMobile ? (
                <Tooltip title={t("signIn")}>
                  <IconButton
                    onClick={() => navigate("/signin")}
                    color="primary"
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      color: "white",
                      "&:hover": {
                        boxShadow: `0 4px 8px ${alpha(
                          theme.palette.primary.main,
                          0.25
                        )}`,
                      },
                    }}
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => navigate("/signin")}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 1, sm: 2 },
                    py: { xs: 0.5, sm: 1 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 8px ${alpha(
                        theme.palette.primary.main,
                        0.25
                      )}`,
                    },
                  }}
                >
                  {t("signIn")}
                </Button>
              )
            ) : (
              <>
                {/* Dashboard Button */}
                {!isGuest &&
                  (isMobile ? (
                    <Tooltip title={t("dashboard")}>
                      <IconButton
                        onClick={() => navigate("/dashboard")}
                        color="primary"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.05
                            ),
                          },
                        }}
                      >
                        <DashboardIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/dashboard")}
                      sx={{
                        borderRadius: 2,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        transition: "all 0.3s ease",
                        px: { xs: 1, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.05
                          ),
                        },
                      }}
                    >
                      {isTablet ? t("dashboardShort") : t("dashboard")}
                    </Button>
                  ))}

                {/* Logout Button */}
                {isMobile ? (
                  <Tooltip title={t("logout")}>
                    <IconButton
                      onClick={handleLogout}
                      color="error"
                      sx={{
                        border: `1px solid ${theme.palette.error.main}`,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.error.main,
                            0.05
                          ),
                        },
                      }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 2,
                      borderColor: theme.palette.error.main,
                      color: theme.palette.error.main,
                      transition: "all 0.3s ease",
                      px: { xs: 1, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: theme.palette.error.main,
                        backgroundColor: alpha(theme.palette.error.main, 0.05),
                      },
                    }}
                  >
                    {isTablet ? t("logoutShort") : t("logout")}
                  </Button>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
