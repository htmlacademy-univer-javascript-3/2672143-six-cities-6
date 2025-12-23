import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/private-router/private-router';

import NotFoundPage from './pages/not-found';
import { useInitializeAuth } from './hooks/use-initialize-auth';
import Main from './pages/main';
import { LoginPage } from './pages/login';
import { OfferPage } from './pages/offer';
import { FavoritesPage } from './pages/favorite';

export const AppInitializer: React.FC = (): React.ReactElement => {
  useInitializeAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
