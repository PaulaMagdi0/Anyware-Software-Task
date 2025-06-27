import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
}

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
const isGuestFromStorage = JSON.parse(
  localStorage.getItem("isGuest") || "false"
);

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isGuest: isGuestFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; token: string; isGuest?: boolean }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isGuest = action.payload.isGuest || false;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isGuest", JSON.stringify(state.isGuest));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isGuest = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isGuest");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectIsGuest = (state: { auth: AuthState }) => state.auth.isGuest;

export default authSlice.reducer;
