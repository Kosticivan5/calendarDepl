import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: "Формат",
  isOpen: false,
  formatValue: "",
};

const FormatDropdownSlice = createSlice({
  name: "formatDropdown",
  initialState,
  reducers: {
    initialFormatRender: (state, action) => {
      state.info = action.payload;
      const stateValue = (value) =>
        value === "Дистанционно" ? "webinar" : "training";
      state.formatValue = stateValue(action.payload);
    },
    toggleDropdown: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    selectFormat: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      const stateValue = (value) =>
        value === "Дистанционно" ? "webinar" : "training";
      state.formatValue = stateValue(action.payload);
    },
    resetFormat: (state) => initialState,
  },
});

export const {
  toggleDropdown,
  selectFormat,
  resetFormat,
  initialFormatRender,
} = FormatDropdownSlice.actions;

export default FormatDropdownSlice.reducer;
