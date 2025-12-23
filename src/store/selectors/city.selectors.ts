import { RootState } from '../index';

export const selectSelectedCity = (state: RootState) =>
  state.store.selectedCity;
