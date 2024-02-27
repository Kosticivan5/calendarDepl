import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  regions: "",
};

const EventInfoSlice = createSlice({
  name: "eventInfo",
  initialState,
  reducers: {
    openEvent: (state, action) => {
      state.isOpen = true;
    },
    displayedCities: (state, action) => {
      if (action.payload) {
        const cities = action.payload
          .split(";")
          .map((item) => {
            let city = item.split("][");
            return city[1];
          })
          .join(", ");
        state.regions = cities;
      }
    },
  },
});

export const { openEvent, displayedCities } = EventInfoSlice.actions;

export default EventInfoSlice.reducer;
