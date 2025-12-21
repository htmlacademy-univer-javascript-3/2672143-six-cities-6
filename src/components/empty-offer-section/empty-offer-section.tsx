import { EmptyOffers } from './ui/empty-offers';

type EmptyOffersProps = {
  cityName: string;
};
export const EmptyOffersSection: React.FC<EmptyOffersProps> = (
  props: EmptyOffersProps
) => {
  const { cityName } = props;
  return (
    <>
      <EmptyOffers cityName={cityName} />
      <div className="cities__right-section"></div>
    </>
  );
};
