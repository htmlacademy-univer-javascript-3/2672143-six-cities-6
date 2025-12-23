import { City } from '../../../types/City';
import storeReducer, { changeCity } from '../../reducer';

describe('storeSlice (city reducer)', () => {
  const initialState = {
    selectedCity: {
      name: 'Paris',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
  };

  const testCity: City = {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  };

  it('should return initial state', () => {
    const state = storeReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should change selected city', () => {
    const state = storeReducer(initialState, changeCity(testCity));

    expect(state.selectedCity).toEqual(testCity);
    expect(state.selectedCity.name).toBe('Amsterdam');
  });

  it('should handle city with different coordinates', () => {
    const cityWithCoords: City = {
      name: 'Brussels',
      location: {
        latitude: 50.8466,
        longitude: 4.3522,
        zoom: 10,
      },
    };

    const state = storeReducer(initialState, changeCity(cityWithCoords));

    expect(state.selectedCity.name).toBe('Brussels');
    expect(state.selectedCity.location.latitude).toBe(50.8466);
    expect(state.selectedCity.location.zoom).toBe(10);
  });

  it('should replace previous city completely', () => {
    const state1 = storeReducer(initialState, changeCity(testCity));
    const state2 = storeReducer(
      state1,
      changeCity({
        name: 'Berlin',
        location: { latitude: 52.52, longitude: 13.405, zoom: 9 },
      })
    );

    expect(state2.selectedCity.name).toBe('Berlin');
    expect(state2.selectedCity.location.zoom).toBe(9);
  });
});
