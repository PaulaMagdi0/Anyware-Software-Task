import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectIsGuest,
} from "../store/slices/authSlice";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isGuest = useSelector(selectIsGuest);

  // ✅ Only redirect real users (not guests)
  if (isAuthenticated && !isGuest) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
