import {
  offersReducer,
  offerDetailReducer,
  fetchOffers,
  clearOffer,
} from '../offers-slice';
import { Offer, OfferDetail } from '../../../types/offer';
import { Review } from '../../../types/reviewsssss';
import { OfferDetailState, OffersState } from '../../../types/offer-state';

describe('offersSlice', () => {
  const initialOffersState: OffersState = {
    offers: [],
    isLoadingOffers: false,
    error: null,
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 13 } },
    location: { latitude: 0, longitude: 0, zoom: 13 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'image.jpg',
  };

  describe('fetchOffers', () => {
    it('should set isLoadingOffers to true on pending', () => {
      const state = offersReducer(
        initialOffersState,
        fetchOffers.pending('', undefined)
      );
      expect(state.isLoadingOffers).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set offers on fulfilled', () => {
      const mockOffers = [mockOffer];
      const action = fetchOffers.fulfilled(mockOffers, '', undefined);
      const state = offersReducer(initialOffersState, action);

      expect(state.isLoadingOffers).toBe(false);
      expect(state.offers).toEqual(mockOffers);
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = fetchOffers.rejected(
        new Error('Failed to load offers'),
        '',
        undefined
      );
      const state = offersReducer(initialOffersState, action);

      expect(state.isLoadingOffers).toBe(false);
      expect(state.error).toBe('Failed to load offers');
      expect(state.offers).toEqual([]);
    });
  });
});

describe('offerDetailSlice', () => {
  const initialState: OfferDetailState = {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isLoadingOffer: false,
    isLoadingNearby: false,
    isLoadingReviews: false,
    isSubmittingReview: false,
    error: null,
  };

  const mockOfferDetail: OfferDetail = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 13 } },
    location: { latitude: 0, longitude: 0, zoom: 13 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    description: 'A nice apartment',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen'],
    host: { name: 'John', avatarUrl: 'avatar.jpg', isPro: true },
    images: ['image1.jpg', 'image2.jpg'],
    maxAdults: 4,
  };

  const mockReview: Review = {
    id: '1',
    rating: 5,
    user: { name: 'User', avatarUrl: 'avatar.jpg', isPro: false },
    date: new Date().toISOString(),
    comment: '',
  };

  it('should return initial state', () => {
    const state = offerDetailReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle clearOffer', () => {
    const stateWithData: OfferDetailState = {
      ...initialState,
      offer: mockOfferDetail,
      nearbyOffers: [],
      reviews: [mockReview],
      error: 'Some error',
    };

    const state = offerDetailReducer(stateWithData, clearOffer());

    expect(state.offer).toBeNull();
    expect(state.nearbyOffers).toEqual([]);
    expect(state.reviews).toEqual([]);
    expect(state.error).toBeNull();
  });
});
