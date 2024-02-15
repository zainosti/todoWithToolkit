import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  counter: 1,
  todo: [],
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  'counter/fetchTodos',
  async (page, { dispatch, getState }) => {
    const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/todos?_page=${page}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increaseCounter(state) {
      state.counter += 1;
    },
    decreaseCounter(state) {
      state.counter -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todo = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => initialState);
  },
});

export const { increaseCounter, decreaseCounter } = counterSlice.actions;

export default counterSlice.reducer;
