import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducer';
import { sortingReducer } from './slices/sortingSlice';
import { offersReducer } from './slices/offersSlice';
import { apiClient } from '../api/api';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    sorting: sortingReducer,
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiClient,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
