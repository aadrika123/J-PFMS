import { createSlice } from "@reduxjs/toolkit";

type InitialType = {
    isOpen: boolean;
}

// Define initial state
const initialState: InitialType = {
    isOpen: false
};

// Create slice
const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions and reducer
export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;