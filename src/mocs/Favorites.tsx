import { FavoriteOfferType } from '../types/Favorite';

const mockFavoriteOffers: FavoriteOfferType[] = [
  {
    id: '1',
    title: 'Beautiful apartment in Amsterdam',
    type: 'apartment',
    price: 120,
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg',
    city: 'Amsterdam',
  },
  {
    id: '2',
    title: 'Cozy room in Amsterdam center',
    type: 'room',
    price: 80,
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img/room-01.jpg',
    city: 'Amsterdam',
  },
  {
    id: '3',
    title: 'Modern house near Amsterdam',
    type: 'house',
    price: 180,
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    previewImage: 'img/house-01.jpg',
    city: 'Amsterdam',
  },
  {
    id: '4',
    title: 'Luxury apartment in Paris',
    type: 'apartment',
    price: 200,
    isFavorite: true,
    isPremium: true,
    rating: 4.7,
    previewImage: 'img/apartment-02.jpg',
    city: 'Paris',
  },
  {
    id: '5',
    title: 'Studio in Paris with balcony',
    type: 'room',
    price: 90,
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    previewImage: 'img/studio-01.jpg',
    city: 'Paris',
  },
  {
    id: '6',
    title: 'Spacious flat in Berlin',
    type: 'apartment',
    price: 110,
    isFavorite: true,
    isPremium: false,
    rating: 4.6,
    previewImage: 'img/apartment-03.jpg',
    city: 'Berlin',
  },
];

export const groupedMockFavorites = mockFavoriteOffers.reduce((acc, offer) => {
  if (!acc[offer.city]) {
    acc[offer.city] = [];
  }
  acc[offer.city].push(offer);
  return acc;
}, {} as Record<string, FavoriteOfferType[]>);

export default groupedMockFavorites;
