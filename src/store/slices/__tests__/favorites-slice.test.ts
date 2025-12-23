import { FavoritesState } from '../../../types/favorites-state';
import { Offer } from '../../../types/Offers';
import {
  favoritesReducer,
  fetchFavorites,
  toggleFavorite,
} from '../favorite-slice';

describe('favoritesSlice', () => {
  const initialState: FavoritesState = {
    favorites: [],
    isLoading: false,
    error: null,
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 13 } },
    location: { latitude: 0, longitude: 0, zoom: 13 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'image.jpg',
  };

  describe('fetchFavorites', () => {
    it('should set isLoading to true on pending', () => {
      const state = favoritesReducer(
        initialState,
        fetchFavorites.pending('', undefined)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set favorites on fulfilled', () => {
      const mockFavorites = [mockOffer];
      const action = fetchFavorites.fulfilled(mockFavorites, '', undefined);
      const state = favoritesReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.favorites).toEqual(mockFavorites);
      expect(state.error).toBeNull();
    });

    it('should set error on rejected', () => {
      const action = fetchFavorites.rejected(
        new Error('Failed to load favorites'),
        '',
        undefined
      );
      const state = favoritesReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to load favorites');
      expect(state.favorites).toEqual([]);
    });
  });

  describe('toggleFavorite', () => {
    it('should set isLoading to true on pending', () => {
      const state = favoritesReducer(
        initialState,
        toggleFavorite.pending('', { offerId: '1', status: 1 })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should add offer to favorites on fulfilled', () => {
      const action = toggleFavorite.fulfilled(mockOffer, '', {
        offerId: '1',
        status: 1,
      });
      const state = favoritesReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.favorites).toContainEqual(mockOffer);
      expect(state.error).toBeNull();
    });

    it('should remove offer from favorites on fulfilled', () => {
      const stateWithFavorite: FavoritesState = {
        ...initialState,
        favorites: [mockOffer],
      };
      const offerToRemove = { ...mockOffer, isFavorite: false };

      const action = toggleFavorite.fulfilled(offerToRemove, '', {
        offerId: '1',
        status: 0,
      });
      const state = favoritesReducer(stateWithFavorite, action);

      expect(state.favorites).not.toContainEqual(mockOffer);
    });

    it('should set error on rejected', () => {
      const action = toggleFavorite.rejected(
        new Error('Failed to toggle favorite'),
        '',
        { offerId: '1', status: 1 }
      );
      const state = favoritesReducer(initialState, action);

      expect(state.error).toBe('Failed to toggle favorite');
    });
  });
});
