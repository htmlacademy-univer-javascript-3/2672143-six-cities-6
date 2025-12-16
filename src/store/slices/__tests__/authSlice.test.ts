import { AuthorizationStatus } from '../../../enums/AuthorizationStatus';
import { AuthInfo } from '../../../types/AuthInfo';
import { AuthState } from '../../../types/AuthState';
import { authReducer, login, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
    isLoading: false,
    error: null,
  };

  const mockUser: AuthInfo = {
    email: 'test@test.com',
    avatarUrl: 'avatar.jpg',
    name: 'Test',
    token: 'token123',
    isPro: true,
  };

  describe('login', () => {
    it('should set isLoading to true on pending', () => {
      const state = authReducer(
        initialState,
        login.pending('', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set user and auth status on fulfilled', () => {
      const action = login.fulfilled(mockUser, '', { email: '', password: '' });
      const state = authReducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
    });

    it('should reset user on rejected', () => {
      const action = login.rejected(new Error('Login failed'), '', {
        email: '',
        password: '',
      });
      const state = authReducer(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Login failed');
    });
  });

  describe('logout', () => {
    const authenticatedState: AuthState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        email: 'test@test.com',
        avatarUrl: 'avatar.jpg',
        name: 'Test',
        token: 'token123',
        isPro: true,
      },
    };

    it('should set isLoading to true on pending', () => {
      const action = logout.pending('', undefined);
      const state = authReducer(authenticatedState, action);

      expect(state.isLoading).toBe(true);
    });

    it('should reset auth state on fulfilled', () => {
      const action = logout.fulfilled(undefined, '', undefined);
      const state = authReducer(authenticatedState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
    });

    it('should set error on rejected', () => {
      const action = logout.rejected(new Error('Logout failed'), '', undefined);
      const state = authReducer(authenticatedState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Logout failed');
    });
  });
});
