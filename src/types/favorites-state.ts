import { Offer } from './Offers';

export type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
};
