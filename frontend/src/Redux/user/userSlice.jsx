import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: undefined,
  token: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.loggedUser = action.payload.data;
    },
    userLogout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
      state.loggedUser = undefined;
    },
  },
});

export const { userLoggedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
