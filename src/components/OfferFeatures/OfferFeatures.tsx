import React from 'react';

interface OfferFeaturesProps {
  type: string;
  bedrooms?: number;
  maxAdults?: number;
}

export const OfferFeatures: React.FC<OfferFeaturesProps> = (
  props: OfferFeaturesProps
) => {
  const { type, bedrooms, maxAdults } = props;
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{type}</li>
      {bedrooms && (
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
      )}
      {maxAdults && (
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} adults
        </li>
      )}
    </ul>
  );
};
