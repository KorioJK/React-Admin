import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apislice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    // other reducers if any
  },
});

export default store;
