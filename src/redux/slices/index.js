const { combineReducers } = require("@reduxjs/toolkit");

import userSlice from "./auth";

const reducers = combineReducers({
  user: userSlice,
});

export default reducers;
