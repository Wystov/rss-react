import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import paginationSlice from './paginationSlice';
import loaderSlice from './loaderSlice';
import detailsSlice from './detailsSlice';
import { swapi } from '../api/getData';

const rootReducer = combineReducers({
  search: searchSlice,
  pagination: paginationSlice,
  loader: loaderSlice,
  details: detailsSlice,
  [swapi.reducerPath]: swapi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapi.middleware),
});

export default store;
