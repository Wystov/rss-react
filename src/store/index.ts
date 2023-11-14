import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import paginationSlice from './paginationSlice';
import loaderSlice from './loaderSlice';
import detailsSlice from './detailsSlice';

const rootReducer = combineReducers({
  search: searchSlice,
  pagination: paginationSlice,
  loader: loaderSlice,
  details: detailsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
