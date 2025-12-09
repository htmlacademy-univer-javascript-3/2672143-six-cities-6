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
  images?: string[];
  latitude?: number;
  longitude?: number;
  description?: string;
  bedrooms?: number;
  maxAdults?: number;
  inside?: string[];
  host?: {
    name: string;
    avatar: string;
    isPro: boolean;
    description: string;
  };
  reviews?: Array<{
    id: string;
    user: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
  }>;
};

export type OffersListProps = {
  offers: Offer[];
};
