import { createSlice } from '@reduxjs/toolkit';

const searchParams = new URLSearchParams(window.location.search);
const initialSearchValue =
  searchParams.get('search') ?? localStorage.getItem('sw-search-query');

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
