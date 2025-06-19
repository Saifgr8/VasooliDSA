import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    token: null,
    isAuthenticated: false,
    apiError: false,
  },
  reducers: {
    loginSucess: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.apiError = false;
      localStorage.setItem("JWTtoken", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout: (state) => {
      (state.userId = null),
        (state.token = null),
        (state.isAuthenticated = false),
        (state.apiError = false);
      localStorage.removeItem("JWTtoken");
      localStorage.removeItem("userId");
    },
    setApiError: (state) => {
      state.apiError = true;
      state.isAuthenticated = false;
    },
    clearApiError: (state) => {
      state.apiError = false;
      state.isAuthenticated = true;
    },
    initializeAuth: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      if (state.token) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  },
});

export const {
  loginSucess,
  logout,
  initializeAuth,
  setApiError,
  clearApiError,
} = authSlice.actions;
export default authSlice.reducer;
