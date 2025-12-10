import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = 'popular' | 'priceLow' | 'priceHigh' | 'rating';

interface SortingState {
  sortType: SortType;
}

const initialState: SortingState = {
  sortType: 'popular',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = sortingSlice.actions;
export const sortingReducer = sortingSlice.reducer;
