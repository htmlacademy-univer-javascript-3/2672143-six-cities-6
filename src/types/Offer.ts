export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type OffersListProps = {
  offers: Offer[];
};
