import { SortingState } from '../../../types/sorting-state';
import { sortingReducer, setSortType } from '../sorting-slice';

describe('sortingSlice', () => {
  const initialState: SortingState = {
    sortType: 'popular',
  };

  it('should return initial state', () => {
    const state = sortingReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should set sortType to priceLow', () => {
    const state = sortingReducer(initialState, setSortType('priceLow'));
    expect(state.sortType).toBe('priceLow');
  });

  it('should set sortType to priceHigh', () => {
    const state = sortingReducer(initialState, setSortType('priceHigh'));
    expect(state.sortType).toBe('priceHigh');
  });

  it('should set sortType to rating', () => {
    const state = sortingReducer(initialState, setSortType('rating'));
    expect(state.sortType).toBe('rating');
  });

  it('should set sortType to popular', () => {
    const state = sortingReducer(
      { ...initialState, sortType: 'rating' },
      setSortType('popular')
    );
    expect(state.sortType).toBe('popular');
  });
});
