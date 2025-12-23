import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducer';
import { sortingReducer } from './slices/sorting-slice';
import { offerDetailReducer, offersReducer } from './slices/offers-slice';
import { apiClient } from '../api/api';
import { authReducer } from './slices/auth-slice';
import { favoritesReducer } from './slices/favorite-slice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    sorting: sortingReducer,
    offers: offersReducer,
    offerDetail: offerDetailReducer,
    favorites: favoritesReducer,
    auth: authReducer,
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
