import { Header } from '../components/header';
import { OfferItems } from '../components/offers-list/ui/offer-items';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoritesGroupedByCity,
  selectIsAuthorized,
} from '../store/selectors';
import { useNavigate } from 'react-router-dom';
import { useInitializeFavorites } from '../hooks/use-initialize-favorites';
import { useCallback } from 'react';
import type { AppDispatch } from '../store';
import { toggleFavorite } from '../store/slices/favorite-slice';

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useInitializeFavorites();

  const isAuthorized = useSelector(selectIsAuthorized);
  const favorites = useSelector(selectFavoritesGroupedByCity);

  const handleFavoriteClick = useCallback(
    (offerId: string, newStatus: boolean) => {
      void dispatch(
        toggleFavorite({
          offerId,
          status: newStatus ? 1 : 0,
        })
      );
    },
    [dispatch]
  );
  if (!isAuthorized) {
    navigate('/login');
    return null;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            {Object.keys(favorites).length === 0 ? (
              <div className="favorites__empty">
                <p>No favorites yet</p>
              </div>
            ) : (
              <ul className="favorites__list">
                {Object.entries(favorites).map(([city, cityOffers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <OfferItems
                          key={offer.id}
                          offer={offer}
                          onFavoriteClick={handleFavoriteClick}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};
