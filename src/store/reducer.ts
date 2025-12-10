import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/City';
import { Offer } from '../types/Offer';
import { offers } from '../mocs/offer';

interface StoreState {
  selectedCity: City;
  offers: Offer[];
}

const initialState: StoreState = {
  selectedCity: {
    id: 0,
    name: 'Paris',
    href: '#',
  },
  offers: offers,
};

const store = createSlice({
  name: 'store',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
    fillOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { changeCity, fillOffers } = store.actions;
export default store.reducer;
