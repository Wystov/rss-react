import { createSlice } from '@reduxjs/toolkit';

const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    uncontrolledForm: null,
    controlledForm: null,
  },
  reducers: {
    setUncontrolledFormData: (state, action) => {
      state.uncontrolledForm = action.payload;
    },
    setControlledFormData: (state, action) => {
      state.controlledForm = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setControlledFormData } =
  formsSlice.actions;

export default formsSlice.reducer;
