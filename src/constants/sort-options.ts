import { SortType } from '../store/slices/sortingSlice';

export const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: low to high', value: 'priceLow' },
  { label: 'Price: high to low', value: 'priceHigh' },
  { label: 'Top rated first', value: 'rating' },
];
