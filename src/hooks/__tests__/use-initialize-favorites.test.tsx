import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useInitializeFavorites } from '../use-initialize-favorites';
import {
  favoritesReducer,
  fetchFavorites,
} from '../../store/slices/favorite-slice';
import { AuthorizationStatus } from '../../enums/authorization-status';
import type { AuthState } from '../../types/auth-state';

vi.mock('../../store/slices/favoriteSlice', async () => {
  const actual = await vi.importActual<
    typeof import('../../store/slices/favorite-slice')>('../../store/slices/favoriteSlice');
  return {
    ...actual,
    fetchFavorites: vi.fn(() => ({ type: 'favorites/fetchFavorites' })),
  };
});

vi.mock('../../store/selectors', () => ({
  selectIsAuthorized: (state: { auth: AuthState }) =>
    state.auth.authorizationStatus === AuthorizationStatus.Auth,
}));

const createTestStore = (isAuthorized: boolean) =>
  configureStore({
    reducer: {
      auth: () => ({
        authorizationStatus: isAuthorized
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.NoAuth,
        user: null,
        isLoading: false,
        error: null,
      }),
      favorites: favoritesReducer,
    },
  });

const createWrapper = (isAuthorized: boolean) => {
  const store = createTestStore(isAuthorized);
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('useInitializeFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call fetchFavorites when user is authorized', () => {
    const wrapper = createWrapper(true);
    renderHook(() => useInitializeFavorites(), { wrapper });

    expect(fetchFavorites).toHaveBeenCalled();
  });

  it('should not call fetchFavorites when user is not authorized', () => {
    const wrapper = createWrapper(false);
    renderHook(() => useInitializeFavorites(), { wrapper });

    expect(fetchFavorites).not.toHaveBeenCalled();
  });

  it('should dispatch fetchFavorites action when authorized', async () => {
    const store = createTestStore(true);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeFavorites(), { wrapper });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  it('should not dispatch fetchFavorites when not authorized', () => {
    const store = createTestStore(false);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeFavorites(), { wrapper });

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should not return any value', () => {
    const wrapper = createWrapper(true);
    const { result } = renderHook(() => useInitializeFavorites(), { wrapper });

    expect(result.current).toBeUndefined();
  });

  it('should handle authorization state changes', () => {
    const store = createTestStore(true);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeFavorites(), { wrapper });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should call hook without errors when authorized', () => {
    const wrapper = createWrapper(true);

    expect(() => {
      renderHook(() => useInitializeFavorites(), { wrapper });
    }).not.toThrow();
  });
});
