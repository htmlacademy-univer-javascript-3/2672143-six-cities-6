import { Offer } from './Offer';

export type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
};
