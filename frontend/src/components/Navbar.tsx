import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import type { RootState } from "../store/index";
import { selectAuthLoading } from "../store/slices/authSlice";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const Navbar = ({ mode, setMode }: Props) => {
  const loading = useSelector(selectAuthLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  if (loading) return <CircularProgress />;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          Home
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            color="inherit"
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {!token ? (
            <Button color="inherit" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
