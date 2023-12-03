import { createSlice } from '@reduxjs/toolkit';

import countries from '@/utils/countries.json';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries,
  },
  reducers: {},
});

export default countriesSlice.reducer;
