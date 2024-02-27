import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registred: 0,
  for_type: 0,
  starting: 0,
  lead_academy: 0,
  lead_friday: 0,
  learn_own: 0,
  digital_lit: 0,
  finance_lit: 0,
};

const checkboxSlice = createSlice({
  name: "checkboxes",
  initialState,
  reducers: {
    initialRender: (state, action) => {
      state[action.payload] = 1;
    },
    toggleCheckbox: (state, action) => {
      state[action.payload] = state[action.payload] === 1 ? 0 : 1;
    },
    resetCheckboxes: (state) => {
      return initialState;
    },
  },
});

export const { toggleCheckbox, resetCheckboxes, initialRender } =
  checkboxSlice.actions;
export const selectCheckboxes = (state) => state.checkboxes;
export default checkboxSlice.reducer;
