import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regions: "",
  registration: false,
  cancelation: false,
  isModalOpened: false,
};

const EventInfoSlice = createSlice({
  name: "eventInfo",
  initialState,
  reducers: {
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
    openModal: (state, action) => {
      state[action.payload] = true;
      state.isModalOpened = true;
    },
    closeModal: (state, action) => {
      state.registration = false;
      state.cancelation = false;
      state.isModalOpened = false;
    },
  },
});

export const { displayedCities, openModal, closeModal } =
  EventInfoSlice.actions;

export default EventInfoSlice.reducer;
