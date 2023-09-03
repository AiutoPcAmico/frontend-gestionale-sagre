import { createSlice } from "@reduxjs/toolkit";

export const sessionInfo = createSlice({
  name: "sessionInfo",
  initialState: {
    pages: null,
    user: {
      username: null,
      role: null,
    },
    sessionStarted: null,
    sessionExpire: null,
    sessionToken: null,
  },
  reducers: {
    setSessionDetails: (state, actions) => {
      //check if i have already the item in the array
      state.sessionStarted = actions.payload.sessionStarted;
      state.sessionExpire = actions.payload.sessionExpire;
      state.sessionToken = actions.payload.sessionToken;
    },

    setSessionUser: (state, actions) => {
      state.user.username = actions.payload.username;
      state.user.role = actions.payload.role;
    },

    setUserPages: (state, actions) => {
      state.pages = actions.payload.pages;
    },

    destroySession: (state, actions) => {
      console.log("session destroyed");
      state.user.username = null;
      state.user.role = null;
      state.sessionToken = null;
      state.sessionExpire = null;
      state.sessionStarted = null;
      state.pages = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSessionDetails,
  setSessionUser,
  setUserPages,
  destroySession,
} = sessionInfo.actions;

export default sessionInfo.reducer;
