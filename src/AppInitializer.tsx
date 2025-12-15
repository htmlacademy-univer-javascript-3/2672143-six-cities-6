import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { OfferPage } from './pages/Offer';
import { LoginPage } from './pages/Login';
import { FavoritesPage } from './pages/Favorite';
import NotFoundPage from './pages/NotFound';
import groupedMockFavorites from './mocs/Favorites';
import { useInitializeAuth } from './hooks/useInitializeAuth';

export const AppInitializer: React.FC = (): React.ReactElement => {
  useInitializeAuth();

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
