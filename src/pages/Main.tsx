import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from '../components/Tabs';
import { Header } from '../components/Header';
import { Sort } from '../components/Sort/Sort';
import { cities } from '../mocs/cities';
import { OffersList } from '../components/OffersList';
import { Map } from '../components/Map/Map';

import {
  selectSelectedCity,
  selectSortedOffers,
  selectIsLoadingOffers,
} from '../store/selectors';

import { Spinner } from '../components/Spinner/Spinner';
import { useInitializeOffers } from '../hooks/useInitializeOffers';

const Main: React.FC = () => {
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  useInitializeOffers();

  const selectedCity = useSelector(selectSelectedCity);
  const sortedOffers = useSelector(selectSortedOffers);
  const isLoading = useSelector(selectIsLoadingOffers);

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {selectedCity.name}
              </b>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <Sort />
                  <OffersList
                    offers={sortedOffers}
                    hoveredOfferId={hoveredOfferId}
                    onOfferHover={setHoveredOfferId}
                  />
                </>
              )}
            </section>
            <div className="cities__right-section">
              <Map offers={sortedOffers} hoveredOfferId={hoveredOfferId} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
