import { Offer } from './offer';

export type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
};
