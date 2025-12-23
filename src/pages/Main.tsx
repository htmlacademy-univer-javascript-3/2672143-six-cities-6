import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tabs } from '../components/Tabs';
import { Header } from '../components/Header';

import { cities } from '../mocs/cities';

import {
  selectSelectedCity,
  selectSortedOffers,
  selectIsLoadingOffers,
  selectIsAuthorized,
} from '../store/selectors';
import { Spinner } from '../components/Spinner/Spinner';
import { useInitializeOffers } from '../hooks/useInitializeOffers';
import type { AppDispatch } from '../store';
import { toggleFavorite } from '../store/slices/favoriteSlice';
import { EmptyOffersSection } from '../components/EmptyOfferSection/EmptyOfferSection';
import { OffersContent } from '../components/OffersContent/OffersContent';

const Main: React.FC = () => {
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useInitializeOffers();

  const selectedCity = useSelector(selectSelectedCity);
  const sortedOffers = useSelector(selectSortedOffers);
  const isLoading = useSelector(selectIsLoadingOffers);
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleFavoriteClick = useCallback(
    (offerId: string, newStatus: boolean) => {
      if (!isAuthorized) {
        navigate('/login');
        return;
      }
      void dispatch(
        toggleFavorite({
          offerId,
          status: newStatus ? 1 : 0,
        })
      );
    },
    [isAuthorized, dispatch, navigate]
  );

  const handleOfferHover = useCallback((id: string | null) => {
    setHoveredOfferId(id);
  }, []);

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} />
        <div className="cities">
          <div className="cities__places-container container">
            {isLoading && <Spinner />}
            {!isLoading && sortedOffers.length === 0 && (
              <EmptyOffersSection cityName={selectedCity.name} />
            )}
            {!isLoading && sortedOffers.length > 0 && (
              <OffersContent
                hoveredOfferId={hoveredOfferId}
                selectedCity={selectedCity.name}
                sortedOffers={sortedOffers}
                onOfferHover={handleOfferHover}
                onFavoriteClick={handleFavoriteClick}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
