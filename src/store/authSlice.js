import { createSlice } from "@reduxjs/toolkit";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  saveTokenToLocalStorage,
  getUserFromLocalStorage,
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";
import { toast } from "react-toastify";

const initialState = {
  token: getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      saveTokenToLocalStorage(action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      removeTokenFromLocalStorage();
    },
    setUser: (state, action) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload);
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      removeTokenFromLocalStorage();
      removeUserFromLocalStorage();
      toast.success("로그아웃 되셨습니다!");
    },
  },
});

export const { setToken, removeToken, setUser, clearAuth } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
