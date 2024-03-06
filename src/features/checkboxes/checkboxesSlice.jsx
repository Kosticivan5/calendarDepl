import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registred: 0,
  for_type: 0,
  starting: 0,
  lead_academy: 0,
  fri_leaders: 0,
  expert_learning: 0,
  cifrovaya_gramotmotnost: 0,
  financial_literacy: 0,
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
