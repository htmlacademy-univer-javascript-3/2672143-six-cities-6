import { Offer, OfferDetail } from './offer';
import { Review } from './review';

export type OffersState = {
  offers: Offer[];
  isLoadingOffers: boolean;
  error: string | null;
};

export type OfferDetailState = {
  offer: OfferDetail | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoadingOffer: boolean;
  isLoadingNearby: boolean;
  isLoadingReviews: boolean;
  isSubmittingReview: boolean;
  error: string | null;
};
