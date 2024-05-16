import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const loginData = Cookies.get("loginData");

const initialState = {
  user: loginData ? JSON.parse(loginData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      Cookies.set("loginData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("loginData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
