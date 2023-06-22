import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = state.listings.push(action.payload);
    },
  },
});
export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;
export const selectListings = (state) => state.listing.listings;
