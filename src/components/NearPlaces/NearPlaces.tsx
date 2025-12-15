import React from 'react';
import { Offer } from '../../types/Offer';
import { OfferItems } from '../OffersList/ui/OfferItems';

interface NearPlacesProps {
  offers: Offer[];
}

export const NearPlaces: React.FC<NearPlacesProps> = (
  props: NearPlacesProps
) => {
  const { offers } = props;
  return (
    <div className="container place-container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighborhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (
            <article key={offer.id} className="near-places__card place-card">
              <OfferItems offer={offer} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
