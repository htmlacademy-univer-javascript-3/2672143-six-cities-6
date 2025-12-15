import { createSelector } from '@reduxjs/toolkit';
import { Offer, OfferDetail } from '../types/Offer';
import { Review } from '../types/Review';
import { RootState } from './index';
import { AuthorizationStatus } from './slices/authSlice';

const selectOffersState = (state: RootState) => state.offers.offers;
const selectSelectedCityName = (state: RootState) =>
  state.store.selectedCity.name;
const selectSortTypeState = (state: RootState) => state.sorting.sortType;

export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;

export const selectOffers = (state: RootState): Offer[] => state.offers.offers;

export const selectIsLoadingOffers = (state: RootState): boolean =>
  state.offers.isLoadingOffers;

export const selectOffersError = (state: RootState): string | null =>
  state.offers.error;

export const selectOffersByCity = createSelector(
  [selectOffersState, selectSelectedCityName],
  (offers, cityName) => offers.filter((offer) => offer.city.name === cityName)
);

export const selectSortType = (state: RootState) => state.sorting.sortType;

export const selectSortedOffers = createSelector(
  [selectOffersByCity, selectSortTypeState],
  (offers, sortType) => {
    const sorted = [...offers];

    switch (sortType) {
      case 'priceLow':
        sorted.sort((a, b) => a.price - b.price);
        return sorted;
      case 'priceHigh':
        sorted.sort((a, b) => b.price - a.price);
        return sorted;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        return sorted;
      case 'popular':
      default:
        return sorted;
    }
  }
);

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
  state.offerDetail.isLoadingOffer;

export const selectOfferIsSubmittingReview = (state: RootState): boolean =>
  state.offerDetail.isSubmittingReview;

export const selectOfferError = (state: RootState): string | null =>
  state.offerDetail.error;

export const selectOfferPageData = createSelector(
  [
    selectOffer,
    selectNearbyOffers,
    selectReviews,
    selectOfferIsLoading,
    selectOfferIsSubmittingReview,
    selectOfferError,
    selectIsAuthorized,
  ],
  (
    offer,
    nearbyOffers,
    reviews,
    isLoading,
    isSubmittingReview,
    error,
    isAuthorized
  ) => ({
    offer,
    nearbyOffers,
    reviews,
    isLoading,
    isSubmittingReview,
    error,
    isAuthorized,
  })
);
