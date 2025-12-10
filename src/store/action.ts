import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/Offer';

export const setCity = createAction<string>('cities/setCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');
