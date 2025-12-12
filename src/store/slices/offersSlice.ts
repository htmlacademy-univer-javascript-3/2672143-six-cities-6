import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/Offer';

export interface OffersState {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_, { extra: api }) => {
  const response = await api.get<Offer[]>('/offers');
  return response.data;
});

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.error = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
});

export const offersReducer = offersSlice.reducer;
