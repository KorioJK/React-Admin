import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchApiData = createAsyncThunk(
  "api/fetchData",
  async (apiUrl, thunkAPI) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
