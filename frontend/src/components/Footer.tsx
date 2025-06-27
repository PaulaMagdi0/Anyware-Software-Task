import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../store/slices/authSlice";

const Footer = () => {
  const loading = useSelector(selectAuthLoading);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{
        py: 2,
        textAlign: "center",
        backgroundColor: isDark ? "#1e1e1e" : "#f1f1f1",
      }}
    >
      <Typography variant="body2" color={isDark ? "grey.400" : "textSecondary"}>
        &copy; {new Date().getFullYear()} Student Dashboard | Anyware Software
      </Typography>
    </Box>
  );
};

export default Footer;
