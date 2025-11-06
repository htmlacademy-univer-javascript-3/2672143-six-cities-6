import type { Meta, StoryObj } from '@storybook/react';
import type { OffersListProps } from '../../types/Offer';
import { OffersList } from '.';

const meta = {
  title: 'Components/OffersList',
  component: OffersList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OffersList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOffers = [
  {
    id: '1',
    title: 'Beautiful apartment in the center',
    type: 'apartment',
    price: 250,
    rating: 4.5,
    previewImage: 'img/offer-1.jpg',
    description: 'A wonderful apartment in the city center',
    images: [],
    goods: [],
    host: { name: 'John Doe', avatarUrl: 'img/avatar.jpg', isPro: true },
    bedrooms: 2,
    maxAdults: 4,
    reviews: 5,
    isPremium: true,
    isFavorite: false,
    location: { latitude: 50.1, longitude: 10.2, zoom: 13 },
  },
  {
    id: '2',
    title: 'Cozy room for two',
    type: 'room',
    price: 120,
    rating: 4.0,
    previewImage: 'img/offer-2.jpg',
    description: 'A cozy room perfect for a couple',
    images: [],
    goods: [],
    host: { name: 'Jane Smith', avatarUrl: 'img/avatar-2.jpg', isPro: false },
    bedrooms: 1,
    maxAdults: 2,
    reviews: 3,
    isPremium: false,
    isFavorite: true,
    location: { latitude: 50.2, longitude: 10.3, zoom: 13 },
  },
  {
    id: '3',
    title: 'Luxury villa with pool',
    type: 'house',
    price: 500,
    rating: 5,
    previewImage: 'img/offer-3.jpg',
    description: 'A stunning luxury villa with swimming pool',
    images: [],
    goods: [],
    host: { name: 'Bob Wilson', avatarUrl: 'img/avatar-3.jpg', isPro: true },
    bedrooms: 4,
    maxAdults: 8,
    reviews: 10,
    isPremium: true,
    isFavorite: false,
    location: { latitude: 50.3, longitude: 10.4, zoom: 13 },
  },
];

export const Default: Story = {
  args: {
    offers: mockOffers,
  } as unknown as OffersListProps,
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]],
  } as unknown as OffersListProps,
};

export const Empty: Story = {
  args: {
    offers: [],
  } as OffersListProps,
};

export const WithManyOffers: Story = {
  args: {
    offers: [...mockOffers, ...mockOffers, ...mockOffers],
  } as unknown as OffersListProps,
};
