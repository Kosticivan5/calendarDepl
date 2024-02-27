import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "axios";
import { getMonth, getNewData } from "../../utils";

const url = "http://localhost:3000/events";

export const getCalendarEvents = createAsyncThunk(
  "calendar/getCalendarEvents",
  async (_, thunkAPI) => {
    try {
      const response = await axios(url);
      if (response.data) {
        const data = getNewData(response.data);
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  calendarEvents: [],
  monthIndex: dayjs().month(),
  currentMonth: getMonth(),
  calendarDays: "",
  fullEvents: [],
  isLoading: true,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    prevMonth: (state, action) => {
      state.monthIndex = state.monthIndex - 1;
    },
    nextMonth: (state, action) => {
      state.monthIndex = state.monthIndex + 1;
    },
    handleCurrentMonth: (state, action) => {
      state.currentMonth = getMonth(state.monthIndex);
    },
    filterEvents: (state, action) => {
      state.calendarEvents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarEvents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCalendarEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calendarEvents = action.payload;
      })
      .addCase(getCalendarEvents.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  nextMonth,
  prevMonth,
  handleCurrentMonth,
  handleEvents,
  filterEvents,
} = calendarSlice.actions;

export default calendarSlice.reducer;
