import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

// const URL = "https://jsonplaceholder.typicode.com/todos/";
const URL =
  "https://rsbt-astwebtut.trosbank.trus.tsocgen/custom_web_template.html?object_id=6675296127857605162&";

// cancel registration

export const cancelRegistration = createAsyncThunk(
  "eventInfo/cancelRegistration",
  async ({ id, userId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${URL}event_id=${id}&user_id=${userId}&method=unreg&_=${nanoid()}`,
        { registred: 0 },
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
  async ({ id, userId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${URL}event_id=${id}&user_id=${userId}&method=reg&is_out=0&_=${nanoid()}`,
        { registred: 1 },
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
