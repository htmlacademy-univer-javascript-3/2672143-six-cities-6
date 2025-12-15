import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/Offer';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
};

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
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load favorites';
      });

    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
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
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to toggle favorite';
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
