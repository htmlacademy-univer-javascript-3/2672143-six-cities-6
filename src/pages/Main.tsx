import React from 'react';
import { Tabs } from '../components/Tabs';
import { Header } from '../components/Header';
import { cities } from '../mocs/cities';
import { OffersList } from '../components/OffersList';
import { Offer } from '../types/Offer';

interface MainProps {
  offers: Offer[];
}

const Main: React.FC<MainProps> = ({ offers }) => (
  <>
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs cities={cities} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <OffersList offers={offers} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default Main;
