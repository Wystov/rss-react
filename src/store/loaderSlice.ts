import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isMainLoading: false,
    isDetailsLoading: false,
  },
  reducers: {
    setMainIsLoading: (state, action) => {
      state.isMainLoading = action.payload;
    },
    setDetailsIsLoading: (state, action) => {
      state.isDetailsLoading = action.payload;
    },
  },
});

export const { setMainIsLoading, setDetailsIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
