import React from 'react';
import { Offer } from './types/Offer';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { OfferPage } from './pages/Offer';
import { LoginPage } from './pages/Login';
import { FavoritesPage } from './pages/Favorite';
import NotFoundPage from './pages/NotFound';
import groupedMockFavorites from './mocs/Favorites';

interface MainProps {
  offers: Offer[];
}

export const App: React.FC<MainProps> = (props: MainProps) => {
  const { offers } = props;
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage offers={offers} />} />

        <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
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

export default App;
