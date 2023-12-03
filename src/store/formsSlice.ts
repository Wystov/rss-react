import { createSlice } from '@reduxjs/toolkit';

import { SubmittedFormFields } from '@/types';

const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    uncontrolledForm: [] as SubmittedFormFields[],
    controlledForm: [] as SubmittedFormFields[],
  },
  reducers: {
    setUncontrolledFormData: (state, action) => {
      state.uncontrolledForm = [...state.uncontrolledForm, action.payload].sort(
        (a, b) => b.timestamp - a.timestamp
      );
    },
    setControlledFormData: (state, action) => {
      state.controlledForm = [...state.controlledForm, action.payload].sort(
        (a, b) => b.timestamp - a.timestamp
      );
    },
  },
});

export const { setUncontrolledFormData, setControlledFormData } =
  formsSlice.actions;

export default formsSlice.reducer;
