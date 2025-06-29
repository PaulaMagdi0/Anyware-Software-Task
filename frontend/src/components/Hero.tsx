import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../store/slices/authSlice";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const loading = useSelector(selectAuthLoading);
  const theme = useTheme();
  const { t } = useTranslation();
  const darkMode = theme.palette.mode === "dark";

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683887034027-84a65d78176b?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        color: darkMode ? "#fff" : "#000",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: darkMode
            ? "rgba(0,0,0,0.6)"
            : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 1,
        },
        animation: "fadeIn 1.8s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          position: "relative",
          zIndex: 2,
          px: 4,
          py: 3,
          fontWeight: 700,
          borderRadius: 3,
          letterSpacing: 1.2,
          textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
          backgroundColor: darkMode
            ? "rgba(0,0,0,0.5)"
            : "rgba(255,255,255,0.7)",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {t("welcome")}
      </Typography>
    </Box>
  );
};

export default Hero;
