import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEvents: [],
  searchValue: "",
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    handleSearchBarChange: (state, action) => {
      state.searchValue = action.payload;
    },
    resetSearchBarValue: (state, action) => {
      state.searchValue = action.payload;
    },
    // handleSearchBarEvents: (state, action) => {
    //   state.filteredEvents = action.payload;
    // },
  },
});

export const {
  handleSearchBarChange,
  resetSearchBarValue,
  // handleSearchBarEvents,
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
