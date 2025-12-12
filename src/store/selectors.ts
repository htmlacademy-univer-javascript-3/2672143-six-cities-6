import { RootState } from './index';
export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;

export const selectOffers = (state: RootState) => state.offers.offers;

export const selectIsLoadingOffers = (state: RootState) =>
  state.offers.isLoading;

export const selectOffersError = (state: RootState) => state.offers.error;

export const selectSortType = (state: RootState) => state.sorting.sortType;

export const selectOffersByCity = (state: RootState) => {
  const offers = state.offers.offers;
  const selectedCityName = state.store.selectedCity.name;
  return offers.filter((offer) => offer.city.name === selectedCityName);
};

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
