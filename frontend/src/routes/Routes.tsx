import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import RequireAuth from "../components/RequireAuth";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const AppRoutes = ({ mode, setMode }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
      <Route
        path="/signin"
        element={<SignInPage mode={mode} setMode={setMode} />}
      />
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
