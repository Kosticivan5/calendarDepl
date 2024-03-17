import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // submitted: false,
  isHidden: false,
  buttonDisabled: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // isSubmitted: (state, action) => {
    //   state.submitted = action.payload;
    // },
    hideEvents: (state, action) => {
      state.isHidden = action.payload;
    },
    toggleDisabledButton: (state, action) => {
      state.buttonDisabled = action.payload;
    },
  },
});

export const { hideEvents, toggleDisabledButton } = sidebarSlice.actions;
export default sidebarSlice.reducer;
