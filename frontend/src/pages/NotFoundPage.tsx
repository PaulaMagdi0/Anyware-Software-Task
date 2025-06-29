import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Props {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const NotFoundPage = ({ mode, setMode }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar mode={mode} setMode={setMode} />
      <Box
        textAlign="center"
        py={10}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h2" color="primary">
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" mb={3}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default NotFoundPage;
