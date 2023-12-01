import { combineReducers, configureStore } from '@reduxjs/toolkit';

import countriesSlice from './countriesSlice';
import formsSlice from './formsSlice';

export const rootReducer = combineReducers({
  forms: formsSlice,
  countries: countriesSlice,
});

export const store = configureStore({ reducer: rootReducer });
