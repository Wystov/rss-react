import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import paginationSlice from './paginationSlice';
import loaderSlice from './loaderSlice';
import detailsSlice from './detailsSlice';
import { swapi } from '../api/getData';

export const rootReducer = combineReducers({
  search: searchSlice,
  pagination: paginationSlice,
  loader: loaderSlice,
  details: detailsSlice,
  [swapi.reducerPath]: swapi.reducer,
});

export const setupStore = (preloadedState?: Partial<typeof rootReducer>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swapi.middleware),
  });
};

const store = setupStore();

export default store;
