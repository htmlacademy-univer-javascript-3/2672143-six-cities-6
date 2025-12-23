import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/Offer';
import { FavoritesState } from '../../types/FavoritesState';

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('favorites/fetchFavorites', async (_, { extra: api }) => {
  const response = await api.get<Offer[]>('/favorite');
  return response.data;
});

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: 0 | 1 },
  {
    extra: AxiosInstance;
  }
>('favorites/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const response = await api.post<Offer>(`/favorite/${offerId}/${status}`);
  return response.data;
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state: FavoritesState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state: FavoritesState, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state: FavoritesState, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load favorites';
      });

    builder
      .addCase(toggleFavorite.pending, (state: FavoritesState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state: FavoritesState, action) => {
        state.isLoading = false;
        const index = state.favorites.findIndex(
          (fav) => fav.id === action.payload.id
        );

        if (action.payload.isFavorite) {
          if (index === -1) {
            state.favorites.push(action.payload);
          } else {
            state.favorites[index] = action.payload;
          }
        } else {
          if (index !== -1) {
            state.favorites.splice(index, 1);
          }
        }
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state: FavoritesState, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to toggle favorite';
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
