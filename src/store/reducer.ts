import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/City';

interface StoreState {
  selectedCity: City;
}

const initialState: StoreState = {
  selectedCity: {
    name: 'Paris',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { changeCity } = storeSlice.actions;
export default storeSlice.reducer;
