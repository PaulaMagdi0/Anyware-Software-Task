import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  Container,
  Stack,
  IconButton,
  keyframes,
  alpha,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../store/slices/authSlice";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Footer = () => {
  const loading = useSelector(selectAuthLoading);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (loading) return <CircularProgress />;

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        mt: "auto",
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backgroundColor: isDark
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 0.7),
        backdropFilter: "blur(10px)",
        animation: `${fadeInUp} 0.8s ease-out`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: { xs: 2, sm: 0 },
            }}
          >
            <SchoolIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: 24,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Student Dashboard
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color={theme.palette.text.secondary}
            sx={{
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            &copy; {new Date().getFullYear()} Student Dashboard | Anyware
            Software
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              size="small"
              aria-label="github"
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.3s ease",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="linkedin"
              sx={{
                color: theme.palette.text.secondary,
                transition: "all 0.3s ease",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
