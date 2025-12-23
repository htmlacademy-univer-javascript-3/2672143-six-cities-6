import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Offer } from '../../types/offer';

const selectOffersState = (state: RootState) => state.offers.offers;
const selectSelectedCityName = (state: RootState) =>
  state.store.selectedCity.name;

export const selectOffers = (state: RootState): Offer[] => state.offers.offers;

export const selectIsLoadingOffers = (state: RootState): boolean =>
  state.offers.isLoadingOffers;

export const selectOffersError = (state: RootState): string | null =>
  state.offers.error;

export const selectOffersByCity = createSelector(
  [selectOffersState, selectSelectedCityName],
  (offers, cityName) => offers.filter((offer) => offer.city.name === cityName)
);
