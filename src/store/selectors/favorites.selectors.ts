import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectFavoritesState = (state: RootState) => state.favorites.favorites;

export const selectFavoritesGroupedByCity = createSelector(
  [selectFavoritesState],
  (favorites) =>
    favorites.reduce((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {} as Record<string, typeof favorites>)
);

export const selectFavoritesCount = (state: RootState): number =>
  state.favorites.favorites.length;

export const selectFavoritesIsLoading = (state: RootState): boolean =>
  state.favorites.isLoading;

export const selectFavoritesError = (state: RootState): string | null =>
  state.favorites.error;

export const selectIsOfferFavorite = (offerId: string) =>
  createSelector([selectFavoritesState], (favorites) =>
    favorites.some((fav) => fav.id === offerId)
  );
