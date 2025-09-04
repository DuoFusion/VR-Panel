import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants";
import { getStorage, stringify } from "../../utils";

const storage = getStorage();
const storedUser = storage.getItem(STORAGE_KEYS.USER);

const initialState = {
  token: storage.getItem(STORAGE_KEYS.TOKEN) || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storage.getItem(STORAGE_KEYS.TOKEN),
  forgotPasswordEmail: storage.getItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      storage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
      storage.setItem(STORAGE_KEYS.USER, stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      storage.clear();
    },
    setForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload;
      storage.setItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL, action.payload);
    },
    clearForgotPasswordEmail: () => {
      storage.removeItem(STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
    },
  },
});

export const { loginSuccess, logout, clearForgotPasswordEmail, setForgotPasswordEmail } = authSlice.actions;

export default authSlice.reducer;
