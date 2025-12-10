import { Offer } from '../types/Offer';
import { RootState } from './index';

export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;

export const selectAllOffers = (state: RootState) => state.store.offers;

export const selectOffersByCity = (state: RootState): Offer[] => {
  const { selectedCity, offers } = state.store;
  return offers.filter((offer) => offer.city === selectedCity.name);
};

export const selectSortType = (state: RootState) => state.sorting.sortType;

export const selectSortedOffers = (state: RootState) => {
  const offers = selectOffersByCity(state);
  const sortType = selectSortType(state);

  const sortedOffers = [...offers];

  switch (sortType) {
    case 'priceLow':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case 'popular':
    default:
      return sortedOffers;
  }
};
