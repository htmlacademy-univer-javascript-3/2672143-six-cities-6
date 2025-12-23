import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useInitializeOffers } from '../use-initialize-offers';
import { fetchOffers } from '../../store/slices/offers-slice';
import type { Offer } from '../../types/offer';

vi.mock('../../store/slices/offers-slice', async () => {
  const actual = await vi.importActual<
    typeof import('../../store/slices/offers-slice')
  >('../../store/slices/offers-slice');
  return {
    ...actual,
    fetchOffers: vi.fn(() => ({ type: 'offers/fetchOffers' })),
  };
});

vi.mock('../../store/selectors', () => ({
  selectOffers: (state: { offers: { offers: Offer[] } }) => state.offers.offers,
}));

const createTestStore = (offersCount: number = 0) => {
  const mockOffers: Offer[] = Array.from(
    { length: offersCount },
    (_, i) =>
      ({
        id: `offer-${i}`,
        title: `Offer ${i}`,
        type: 'apartment',
        price: 100 + i * 10,
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        previewImage: `https://example.com/image${i}.jpg`,
        location: { latitude: 48.8566 + i * 0.1, longitude: 2.3522 + i * 0.1 },
      } as Offer)
  );

  return configureStore({
    reducer: {
      offers: () => ({
        offers: mockOffers,
        isLoading: false,
        error: null,
      }),
    },
  });
};

const createWrapper = (offersCount: number = 0) => {
  const store = createTestStore(offersCount);
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('useInitializeOffers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call fetchOffers when offers list is empty', () => {
    const wrapper = createWrapper(0);
    renderHook(() => useInitializeOffers(), { wrapper });

    expect(fetchOffers).toHaveBeenCalled();
  });

  it('should not call fetchOffers when offers already exist', () => {
    const wrapper = createWrapper(3);
    renderHook(() => useInitializeOffers(), { wrapper });

    expect(fetchOffers).not.toHaveBeenCalled();
  });

  it('should dispatch fetchOffers action when offers are empty', async () => {
    const store = createTestStore(0);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeOffers(), { wrapper });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  it('should not dispatch fetchOffers when offers exist', () => {
    const store = createTestStore(5);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useInitializeOffers(), { wrapper });

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should not return any value', () => {
    const wrapper = createWrapper(0);
    const { result } = renderHook(() => useInitializeOffers(), { wrapper });

    expect(result.current).toBeUndefined();
  });

  it('should call hook without errors', () => {
    const wrapper = createWrapper(0);

    expect(() => {
      renderHook(() => useInitializeOffers(), { wrapper });
    }).not.toThrow();
  });

  it('should check offers length dependency correctly', () => {
    const wrapper = createWrapper(1);
    renderHook(() => useInitializeOffers(), { wrapper });

    expect(fetchOffers).not.toHaveBeenCalled();
  });
});
