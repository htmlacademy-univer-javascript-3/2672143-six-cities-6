import React from 'react';

type EmptyOffersProps = {
  cityName: string;
};

export const EmptyOffers: React.FC<EmptyOffersProps> = (
  props: EmptyOffersProps
) => {
  const { cityName } = props;
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in {cityName}
        </p>
      </div>
    </section>
  );
};
