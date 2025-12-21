import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../store/slices/auth-slice';
import type { AppDispatch } from '../store';

export const useInitializeAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
};
