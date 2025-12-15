import React from 'react';
import { Offer } from '../../types/Offer';
import { OfferItems } from './ui/OfferItems';

interface OffersListProps {
  offers: Offer[];
  hoveredOfferId?: string | null;
  onOfferHover?: (offerId: string | null) => void;
}

export const OffersList: React.FC<OffersListProps> = (
  props: OffersListProps
) => {
  const { offers, hoveredOfferId, onOfferHover } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferItems
          key={offer.id}
          offer={offer}
          isHovered={hoveredOfferId === offer.id}
          onHover={onOfferHover}
        />
      ))}
    </div>
  );
};
