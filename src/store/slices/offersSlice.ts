import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, OfferDetail } from '../../types/Offer';
import { Review } from '../../types/Review';
import { toggleFavorite } from './favoriteSlice';
import { OfferDetailState, OffersState } from '../../types/OfferState';

const offersInitialState: OffersState = {
  offers: [],
  isLoadingOffers: false,
  error: null,
};

const offerDetailInitialState: OfferDetailState = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isLoadingOffer: false,
  isLoadingNearby: false,
  isLoadingReviews: false,
  isSubmittingReview: false,
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

export const fetchOfferById = createAsyncThunk<
  OfferDetail,
  string,
  {
    extra: AxiosInstance;
  }
>('offers/fetchOfferById', async (offerId: string, { extra: api }) => {
  const response = await api.get<OfferDetail>(`/offers/${offerId}`);
  return response.data;
});

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {
    extra: AxiosInstance;
  }
>('offers/fetchNearbyOffers', async (offerId: string, { extra: api }) => {
  const response = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  return response.data;
});

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {
    extra: AxiosInstance;
  }
>('offers/fetchReviews', async (offerId: string, { extra: api }) => {
  const response = await api.get<Review[]>(`/comments/${offerId}`);
  return response.data;
});

export const submitReview = createAsyncThunk<
  Review,
  { offerId: string; rating: number; comment: string },
  {
    extra: AxiosInstance;
  }
>(
  'offers/submitReview',
  async ({ offerId, rating, comment }, { extra: api }) => {
    const response = await api.post<Review>(`/comments/${offerId}`, {
      rating,
      comment,
    });
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState: offersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state: OffersState) => {
        state.isLoadingOffers = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state: OffersState, action) => {
        state.isLoadingOffers = false;
        state.offers = action.payload;
        state.error = null;
      })
      .addCase(fetchOffers.rejected, (state: OffersState, action) => {
        state.isLoadingOffers = false;
        state.error = action.error.message || 'Failed to load offers';
      });

    builder.addCase(toggleFavorite.fulfilled, (state: OffersState, action) => {
      const offer = state.offers.find((o) => o.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
    });
  },
});

const offerDetailSlice = createSlice({
  name: 'offerDetail',
  initialState: offerDetailInitialState,
  reducers: {
    clearOffer: (state: OfferDetailState) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state: OfferDetailState) => {
        state.isLoadingOffer = true;
        state.error = null;
      })
      .addCase(fetchOfferById.fulfilled, (state: OfferDetailState, action) => {
        state.offer = action.payload;
        state.isLoadingOffer = false;
        state.error = null;
      })
      .addCase(fetchOfferById.rejected, (state: OfferDetailState, action) => {
        state.offer = null;
        state.isLoadingOffer = false;
        state.error = action.error.message || 'Failed to load offer';
      });
    builder.addCase(
      toggleFavorite.fulfilled,
      (state: OfferDetailState, action) => {
        if (state.offer?.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      }
    );

    builder
      .addCase(fetchNearbyOffers.pending, (state: OfferDetailState) => {
        state.isLoadingNearby = true;
      })
      .addCase(
        fetchNearbyOffers.fulfilled,
        (state: OfferDetailState, action) => {
          state.nearbyOffers = action.payload;
          state.isLoadingNearby = false;
        }
      )
      .addCase(
        fetchNearbyOffers.rejected,
        (state: OfferDetailState, action) => {
          state.nearbyOffers = [];
          state.isLoadingNearby = false;
          state.error = action.error.message || 'Failed to load nearby offers';
        }
      );

    builder
      .addCase(fetchReviews.pending, (state: OfferDetailState) => {
        state.isLoadingReviews = true;
      })
      .addCase(fetchReviews.fulfilled, (state: OfferDetailState, action) => {
        state.reviews = action.payload;
        state.isLoadingReviews = false;
      })
      .addCase(fetchReviews.rejected, (state: OfferDetailState, action) => {
        state.reviews = [];
        state.isLoadingReviews = false;
        state.error = action.error.message || 'Failed to load reviews';
      });

    builder
      .addCase(submitReview.pending, (state: OfferDetailState) => {
        state.isSubmittingReview = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state: OfferDetailState, action) => {
        state.reviews = [action.payload, ...state.reviews];
        state.isSubmittingReview = false;
        state.error = null;
      })
      .addCase(submitReview.rejected, (state: OfferDetailState, action) => {
        state.isSubmittingReview = false;
        state.error = action.error.message || 'Failed to submit review';
      });
  },
});
export const { clearOffer } = offerDetailSlice.actions;
export const offersReducer = offersSlice.reducer;
export const offerDetailReducer = offerDetailSlice.reducer;
