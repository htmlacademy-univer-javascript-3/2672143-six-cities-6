import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from '../components/Tabs';
import { Header } from '../components/Header';
import { cities } from '../mocs/cities';
import { OffersList } from '../components/OffersList';
import { Map } from '../components/Map/Map';
import { selectSelectedCity, selectOffersByCity } from '../store/selectors';

const Main: React.FC = () => {
  const selectedCity = useSelector(selectSelectedCity);
  const filterredOffers = useSelector(selectOffersByCity);

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
                {filterredOffers.length} places to stay in {selectedCity.name}
              </b>
              <OffersList offers={filterredOffers} />
            </section>
            <div className="cities__right-section">
              <Map offers={filterredOffers} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
