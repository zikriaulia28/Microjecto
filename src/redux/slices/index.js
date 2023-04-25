const { combineReducers } = require("@reduxjs/toolkit");

import userSlice from "./auth";
import toggleSlice from "./action"

const reducers = combineReducers({
  user: userSlice,
  toggle: toggleSlice,
});

export default reducers;
