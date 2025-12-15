import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { selectOffersByCity } from './offers.selectors';

const selectSortTypeState = (state: RootState) => state.sorting.sortType;

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
