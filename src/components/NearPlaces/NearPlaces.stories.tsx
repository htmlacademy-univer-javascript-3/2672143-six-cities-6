import type { Meta, StoryObj } from '@storybook/react';
import type { Offer } from '../../types/Offer';
import { NearPlaces } from './NearPlaces';
import { City } from '../../types/City';

const meta = {
  title: 'Components/NearPlaces',
  component: NearPlaces,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NearPlaces>;

export default meta;
type Story = StoryObj<typeof meta>;

const amsterdamCity: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: 12,
  },
};

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4.8,
    isPremium: false,
    isFavorite: false,
    city: amsterdamCity,
    previewImage: 'img/room.jpg',
    location: {
      latitude: 52.3609,
      longitude: 4.8852,
      zoom: 12,
    },
  },
  {
    id: '2',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.8,
    isPremium: false,
    isFavorite: true,
    city: amsterdamCity,
    previewImage: 'img/apartment-02.jpg',
    location: {
      latitude: 52.3727,
      longitude: 4.8885,
      zoom: 12,
    },
  },
  {
    id: '3',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5.0,
    isPremium: true,
    isFavorite: false,
    city: amsterdamCity,
    previewImage: 'img/apartment-03.jpg',
    location: {
      latitude: 52.395,
      longitude: 4.9331,
      zoom: 12,
    },
  },
];

export const Default: Story = {
  args: {
    offers: mockOffers,
  },
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]],
  },
};

export const TwoOffers: Story = {
  args: {
    offers: [mockOffers[0], mockOffers[1]],
  },
};

export const Empty: Story = {
  args: {
    offers: [],
  },
};

export const PremiumAndRegular: Story = {
  args: {
    offers: [mockOffers[1], mockOffers[2]],
  },
};
