// src/hooks/useInitializeAuth.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../store/slices/authSlice';
import type { AppDispatch } from '../store';

export const useInitializeAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
};
