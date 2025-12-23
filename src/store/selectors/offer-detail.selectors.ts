import { createSelector } from '@reduxjs/toolkit';
import { OfferDetail } from '../../types/offer';
import { Review } from '../../types/reviewsssss';
import { RootState } from '../index';
import { selectIsAuthorized } from './auth.selectors';

export const selectOffer = (state: RootState): OfferDetail | null =>
  state.offerDetail.offer;

export const selectNearbyOffers = (state: RootState) =>
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
