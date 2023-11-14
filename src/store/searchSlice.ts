import { createSlice } from '@reduxjs/toolkit';
import { initialSearchValue } from '../config';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: initialSearchValue ?? '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
