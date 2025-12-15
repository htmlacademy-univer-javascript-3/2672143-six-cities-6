import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../store/slices/offersSlice';
import { selectOffers } from '../store/selectors';
import type { AppDispatch } from '../store';

export const useInitializeOffers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(selectOffers);

  useEffect(() => {
    if (offers.length === 0) {
      dispatch(fetchOffers());
    }
  }, [dispatch, offers.length]);
};
