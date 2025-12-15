import { Offer, OfferDetail } from '../types/Offer';
import { Review } from '../types/Review';
import { RootState } from './index';
import { AuthorizationStatus } from './slices/authSlice';

export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;

export const selectOffers = (state: RootState): Offer[] => state.offers.offers;

export const selectIsLoadingOffers = (state: RootState): boolean =>
  state.offers.isLoading;

export const selectOffersError = (state: RootState): string | null =>
  state.offers.error;

export const selectOffersByCity = (state: RootState): Offer[] => {
  const offers: Offer[] = state.offers.offers;
  const selectedCityName: string = state.store.selectedCity.name;
  return offers.filter((offer: Offer) => offer.city.name === selectedCityName);
};

export const selectSortType = (state: RootState) => state.sorting.sortType;

export const selectSortedOffers = (state: RootState): Offer[] => {
  const offers: Offer[] = selectOffersByCity(state);
  const sortType = selectSortType(state);

  const sortedOffers: Offer[] = [...offers];

  switch (sortType) {
    case 'priceLow':
      return sortedOffers.sort((a: Offer, b: Offer) => a.price - b.price);
    case 'priceHigh':
      return sortedOffers.sort((a: Offer, b: Offer) => b.price - a.price);
    case 'rating':
      return sortedOffers.sort((a: Offer, b: Offer) => b.rating - a.rating);
    case 'popular':
    default:
      return sortedOffers;
  }
};

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus;

export const selectIsAuthorized = (state: RootState): boolean =>
  state.auth.authorizationStatus === AuthorizationStatus.Auth;

export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;

export const selectOffer = (state: RootState): OfferDetail | null =>
  state.offerDetail.offer;

export const selectNearbyOffers = (state: RootState): Offer[] =>
  state.offerDetail.nearbyOffers;

export const selectReviews = (state: RootState): Review[] =>
  state.offerDetail.reviews;

export const selectOfferIsLoading = (state: RootState): boolean =>
  state.offerDetail.isLoading;

export const selectOfferIsSubmittingReview = (state: RootState): boolean =>
  state.offerDetail.isSubmittingReview;

export const selectOfferError = (state: RootState): string | null =>
  state.offerDetail.error;
