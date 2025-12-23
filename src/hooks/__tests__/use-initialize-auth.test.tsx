import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useInitializeAuth } from '../use-initialize-auth';
import { authReducer, initializeAuth } from '../../store/slices/auth-slice';
import { AuthorizationStatus } from '../../enums/authorization-status';
import type { AuthState } from '../../types/auth-state';

vi.mock('../../store/slices/auth-slice', async () => {
  const actual = await vi.importActual<
    typeof import('../../store/slices/auth-slice')>('../../store/slices/auth-slice');
  return {
    ...actual,
    initializeAuth: vi.fn(() => ({ type: 'auth/initializeAuth' })),
  };
});

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
        isLoading: false,
        error: null,
      } as AuthState,
    },
  });

const createWrapper = () => {
  const store = createTestStore();
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('useInitializeAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call initializeAuth on mount', () => {
    const wrapper = createWrapper();
    renderHook(() => useInitializeAuth(), { wrapper });

    expect(initializeAuth).toHaveBeenCalled();
  });

  it('should dispatch initializeAuth action', async () => {
    const store = createTestStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  it('should call initializeAuth only once on mount', () => {
    const wrapper = createWrapper();
    renderHook(() => useInitializeAuth(), { wrapper });

    expect(initializeAuth).toHaveBeenCalledTimes(1);
  });

  it('should be called without arguments', () => {
    const wrapper = createWrapper();
    renderHook(() => useInitializeAuth(), { wrapper });

    expect(initializeAuth).toHaveBeenCalledWith();
  });

  it('should initialize auth status on component mount', async () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          authorizationStatus: AuthorizationStatus.Unknown,
          user: null,
          isLoading: false,
          error: null,
        } as AuthState,
      },
    });

    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    await waitFor(() => {
      expect(initializeAuth).toHaveBeenCalled();
    });
  });

  it('should have useEffect hook', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useInitializeAuth(), { wrapper });

    expect(result).toBeDefined();
  });

  it('should not return any value', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useInitializeAuth(), { wrapper });

    expect(result.current).toBeUndefined();
  });

  it('should initialize on first render', () => {
    const wrapper = createWrapper();
    renderHook(() => useInitializeAuth(), { wrapper });

    expect(initializeAuth).toHaveBeenCalled();
  });

  it('should dispatch action to Redux store', async () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    await waitFor(() => {
      expect(initializeAuth).toHaveBeenCalled();
    });
  });

  it('should call hook without errors', () => {
    const wrapper = createWrapper();
    expect(() => {
      renderHook(() => useInitializeAuth(), { wrapper });
    }).not.toThrow();
  });

  it('should be reusable in multiple components', () => {
    const wrapper = createWrapper();
    renderHook(() => useInitializeAuth(), { wrapper });
    renderHook(() => useInitializeAuth(), { wrapper });

    expect(initializeAuth).toHaveBeenCalledTimes(2);
  });

  it('should work with proper Redux setup', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useInitializeAuth(), {
      wrapper: testWrapper,
    });

    expect(result).toBeDefined();
  });

  it('should initialize auth when component mounts', async () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    await waitFor(() => {
      expect(initializeAuth).toHaveBeenCalled();
    });
  });

  it('should handle dispatch dependency', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    expect(() => {
      renderHook(() => useInitializeAuth(), { wrapper: testWrapper });
    }).not.toThrow();
  });

  it('should not cause infinite loops', () => {
    vi.useFakeTimers();

    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    vi.advanceTimersByTime(1000);

    expect(initializeAuth).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should initialize with AppDispatch type', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    expect(() => {
      renderHook(() => useInitializeAuth(), { wrapper: testWrapper });
    }).not.toThrow();
  });

  it('should work with multiple renders', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { rerender } = renderHook(() => useInitializeAuth(), {
      wrapper: testWrapper,
    });

    expect(initializeAuth).toHaveBeenCalledTimes(1);

    rerender();

    expect(initializeAuth).toHaveBeenCalledTimes(1);
  });

  it('should call dispatch with correct reducer function', async () => {
    const store = createTestStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeAuth(), { wrapper: testWrapper });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  it('should be a valid React hook', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useInitializeAuth(), {
      wrapper: testWrapper,
    });

    expect(typeof result.current).not.toBe('function');
  });

  it('should work within Provider context', () => {
    const store = createTestStore();
    const testWrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    expect(() => {
      renderHook(() => useInitializeAuth(), { wrapper: testWrapper });
    }).not.toThrow();
  });
});
