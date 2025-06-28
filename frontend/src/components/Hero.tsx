import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../store/slices/authSlice";

const Hero = () => {
  const loading = useSelector(selectAuthLoading);

  if (loading) return <CircularProgress />;
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('https://source.unsplash.com/1600x900/?education,student')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{ backgroundColor: "rgba(0,0,0,0.5)", p: 2, borderRadius: 2 }}
      >
        Welcome to Student Dashboard
      </Typography>
    </Box>
  );
};

export default Hero;
