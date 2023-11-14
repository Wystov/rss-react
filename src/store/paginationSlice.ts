import { createSlice } from '@reduxjs/toolkit';
import { initialCurrentPage, initialItemsPerPage } from '../config';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: +(initialCurrentPage ?? 1),
    itemsPerPage: +(initialItemsPerPage ?? 10),
  },
  reducers: {
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setItemsPerPage, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
