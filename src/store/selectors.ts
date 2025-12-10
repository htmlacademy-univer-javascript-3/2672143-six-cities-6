import { Offer } from '../types/Offer';
import { RootState } from './index';

export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;

export const selectAllOffers = (state: RootState) => state.store.offers;

export const selectOffersByCity = (state: RootState): Offer[] => {
  const { selectedCity, offers } = state.store;
  return offers.filter((offer) => offer.city === selectedCity.name);
};
