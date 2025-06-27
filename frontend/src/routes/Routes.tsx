import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import RequireAuth from "../components/RequireAuth";
import RedirectIfAuthenticated from "../components/RedirectIfAuthenticated";
import RequireAnyAuth from "../components/RequireAnyAuth";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const AppRoutes = ({ mode, setMode }: Props) => {
  return (
    <Routes>
      {/* 🔐 Home page only for guest or real user */}
      <Route
        path="/"
        element={
          <RequireAnyAuth>
            <HomePage mode={mode} setMode={setMode} />
          </RequireAnyAuth>
        }
      />

      {/* 👤 Sign in available to all */}
      <Route
        path="/signin"
        element={
          <RedirectIfAuthenticated>
            <SignInPage mode={mode} setMode={setMode} />
          </RedirectIfAuthenticated>
        }
      />

      {/* 🔐 Dashboard only for real users */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage mode={mode} setMode={setMode} />
          </RequireAuth>
        }
      />

      <Route
        path="*"
        element={<NotFoundPage mode={mode} setMode={setMode} />}
      />
    </Routes>
  );
};

export default AppRoutes;
