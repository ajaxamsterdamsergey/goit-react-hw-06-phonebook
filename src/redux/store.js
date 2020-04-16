import { configureStore } from "@reduxjs/toolkit";
import { phoneBookReducer } from "./phoneBookReducer";

const store = configureStore({
  reducer: phoneBookReducer,
});

export default store;
