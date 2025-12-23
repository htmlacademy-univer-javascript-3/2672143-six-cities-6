import { Offer } from '../../types/offer';
import { OffersList } from '../offers-list';
import { Sort } from '../sort/sort';
import { Map } from '../map/map';
type OffersContentProps = {
  hoveredOfferId: string | null;
  selectedCity: string;
  sortedOffers: Offer[];
  onOfferHover: (id: string | null) => void;
  onFavoriteClick: (offerId: string, isFavorite: boolean) => void;
};

export const OffersContent: React.FC<OffersContentProps> = (
  props: OffersContentProps
) => {
  const {
    hoveredOfferId,
    selectedCity,
    sortedOffers,
    onOfferHover,
    onFavoriteClick,
  } = props;
  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {sortedOffers.length} places to stay in {selectedCity}
        </b>
        <Sort />
        <OffersList
          offers={sortedOffers}
          hoveredOfferId={hoveredOfferId}
          onOfferHover={onOfferHover}
          onFavoriteClick={onFavoriteClick}
        />
      </section>
      <div className="cities__right-section">
        <Map offers={sortedOffers} hoveredOfferId={hoveredOfferId} />
      </div>
    </>
  );
};
