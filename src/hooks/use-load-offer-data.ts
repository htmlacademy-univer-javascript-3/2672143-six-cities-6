import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchReviews,
} from '../store/slices/offers-slice';
import type { AppDispatch } from '../store';

type LoadOfferProps = {
  id?: string;
};

export const useLoadOfferData = (props: LoadOfferProps) => {
  const { id } = props;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadOfferData = async () => {
      const offerResult = await dispatch(fetchOfferById(id));

      if (fetchOfferById.fulfilled.match(offerResult)) {
        await Promise.all([
          dispatch(fetchNearbyOffers(id)),
          dispatch(fetchReviews(id)),
        ]);
      }
    };

    void loadOfferData();
  }, [id, dispatch]);
};
