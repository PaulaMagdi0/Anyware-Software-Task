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
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
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

const Navbar = ({ mode, setMode }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "center" }}>
          <CircularProgress color="inherit" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}
        >
          {t("home")}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          {/* 🌗 Theme toggle */}
          <IconButton
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            color="inherit"
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {/* 🌍 Language Dropdown */}
          <Tooltip title={t("language") || "Language"}>
            <IconButton
              onClick={handleLangClick}
              color="inherit"
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
          >
            <MenuItem onClick={() => handleLangClose("en")}>English</MenuItem>
            <MenuItem onClick={() => handleLangClose("ar")}>العربية</MenuItem>
          </Menu>

          {/* 🔐 Auth Buttons */}
          {!token ? (
            <Button color="inherit" onClick={() => navigate("/signin")}>
              {t("signIn")}
            </Button>
          ) : (
            <>
              {!isGuest && (
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  {t("dashboard")}
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
