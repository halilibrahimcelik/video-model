import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./auth/authSlicer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import listingSlice from "./listing/listingSlice";

const store = configureStore({
  reducer: {
    auth: authSlicer,
    listing: listingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
