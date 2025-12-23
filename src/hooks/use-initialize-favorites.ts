import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthorized } from '../store/selectors';
import type { AppDispatch } from '../store';
import { fetchFavorites } from '../store/slices/favorite-slice';

export const useInitializeFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [isAuthorized, dispatch]);
};
