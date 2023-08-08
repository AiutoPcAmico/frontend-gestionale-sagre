import { createSlice } from "@reduxjs/toolkit";

export const sessionInfo = createSlice({
  name: "sessionInfo",
  initialState: {
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
      console.log(actions.payload.sessionStarted);
      state.sessionStarted = actions.payload.sessionStarted;
      state.sessionExpire = actions.payload.sessionExpire;
      state.sessionToken = actions.payload.sessionToken;
    },

    setSessionUser: (state, actions) => {
      var modifiedUser = JSON.parse(JSON.stringify(actions.payload.user));
      state.user.username = modifiedUser.username;
      state.user.role = modifiedUser.role;

      console.log({ actions });
    },

    destroySession: (state, actions) => {
      console.log("session destroyed");
      state.user.username = null;
      state.user.role = null;
      state.sessionToken = null;
      state.sessionExpire = null;
      state.sessionStarted = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSessionDetails, setSessionUser, destroySession } =
  sessionInfo.actions;

export default sessionInfo.reducer;
