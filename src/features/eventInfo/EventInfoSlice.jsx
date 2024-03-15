import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/todos/";

// cancel registration

export const cancelRegistration = createAsyncThunk(
  "eventInfo/cancelRegistration",
  async (id, thunkAPI) => {
    try {
      // Fetching current data first
      const currentDataResponse = await axios.get(`${URL}${id}`);

      // Extracting the current value of 'completed'
      const completed = currentDataResponse.data.completed;

      const response = await axios.patch(
        `${URL}${id}`,
        { completed: !completed },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      thunkAPI.dispatch(openModal("cancelation"));
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.response);
    }
  }
);

// add registration
export const addRegistration = createAsyncThunk(
  "eventInfo/addRegistration",
  async (id, thunkAPI) => {
    try {
      // Fetching current data first
      const currentDataResponse = await axios.get(`${URL}${id}`);

      // Extracting the current value of 'completed'
      const completed = currentDataResponse.data.completed;

      const response = await axios.patch(
        `${URL}${id}`,
        { completed: !completed },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      thunkAPI.dispatch(openModal("registration"));
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  regions: "",
  registration: false,
  cancelation: false,
  isModalOpened: false,
  isRegistrationLoading: false,
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
    },
    closeModal: (state, action) => {
      state.registration = false;
      state.cancelation = false;
      state.isModalOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelRegistration.pending, (state, action) => {
        state.isRegistrationLoading = true;
      })
      .addCase(cancelRegistration.fulfilled, (state, action) => {
        state.isRegistrationLoading = false;
        state.isModalOpened = true;
      })
      .addCase(cancelRegistration.rejected, (state, action) => {
        state.isRegistrationLoading = false;
      })
      .addCase(addRegistration.pending, (state, action) => {
        state.isRegistrationLoading = true;
      })
      .addCase(addRegistration.fulfilled, (state, action) => {
        state.isRegistrationLoading = false;
        state.isModalOpened = true;
      })
      .addCase(addRegistration.rejected, (state, action) => {
        state.isRegistrationLoading = false;
      });
  },
});

export const { displayedCities, openModal, closeModal } =
  EventInfoSlice.actions;

export default EventInfoSlice.reducer;
