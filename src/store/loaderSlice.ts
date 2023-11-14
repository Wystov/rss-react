import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    mainIsLoading: false,
    detailsIsLoading: false,
  },
  reducers: {
    setMainIsLoading: (state, action) => {
      state.mainIsLoading = action.payload;
    },
    setDetailsIsLoading: (state, action) => {
      state.detailsIsLoading = action.payload;
    },
  },
});

export default loaderSlice.reducer;
