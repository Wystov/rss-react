import { createSlice } from '@reduxjs/toolkit';
import { initialDetailsId } from '../config';

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    id: initialDetailsId ? +initialDetailsId : null,
  },
  reducers: {
    setDetailsId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setDetailsId } = detailsSlice.actions;
export default detailsSlice.reducer;
