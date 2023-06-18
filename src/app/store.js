import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./auth/authSlicer";

const store = configureStore({
  reducer: {
    auth: authSlicer,
  },
});

export default store;
