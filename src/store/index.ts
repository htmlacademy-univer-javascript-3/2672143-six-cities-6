import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducer';
import { sortingReducer } from './slices/sortingSlice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    sorting: sortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
