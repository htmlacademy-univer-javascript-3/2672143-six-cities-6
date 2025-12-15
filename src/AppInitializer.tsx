import React, { useEffect } from 'react';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { OfferPage } from './pages/Offer';
import { LoginPage } from './pages/Login';
import { FavoritesPage } from './pages/Favorite';
import NotFoundPage from './pages/NotFound';
import groupedMockFavorites from './mocs/Favorites';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './store/slices/authSlice';
import type { AppDispatch } from './store';

export const AppInitializer: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />

        <Route element={<PrivateRoute />}>
          <Route
            path="/favorites"
            element={<FavoritesPage favorites={groupedMockFavorites} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
