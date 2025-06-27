import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../store/index";
import { Box, CircularProgress } from "@mui/material";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return token ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default RequireAuth;
