import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import paginationSlice from './paginationSlice';
import loaderSlice from './loaderSlice';

const rootReducer = combineReducers({
  search: searchSlice,
  pagination: paginationSlice,
  loader: loaderSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
