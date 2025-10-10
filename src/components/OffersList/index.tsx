import { OffersListProps } from '../../types/Offer';
import { OfferItems } from './ui/OfferItems';

export const OffersList: React.FC<OffersListProps> = (
  props: OffersListProps
) => {
  const { offers } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferItems key={offer.id} offer={offer} />
      ))}
    </div>
  );
};
