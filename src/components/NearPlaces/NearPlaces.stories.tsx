import type { Meta, StoryObj } from '@storybook/react';
import type { Offer } from '../../types/Offer';
import { NearPlaces } from './NearPlaces';

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

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4.8,
    isPremium: false,
    isFavorite: false,
    city: 'Amsterdam',
    previewImage: 'img/room.jpg',
    images: ['img/room.jpg'],
    latitude: 52.3609,
    longitude: 4.8852,
    description: 'Cozy room near the city center',
    bedrooms: 1,
    maxAdults: 2,
    inside: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: {
      name: 'John Doe',
      avatar: 'img/avatar.jpg',
      isPro: true,
      description: 'Friendly and helpful host',
    },
    reviews: [
      {
        id: 'r1',
        user: 'Max',
        avatar: 'img/avatar-max.jpg',
        rating: 4.8,
        text: 'Great place to stay!',
        date: 'April 2024',
      },
    ],
  },
  {
    id: '2',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.8,
    isPremium: false,
    isFavorite: true,
    city: 'Amsterdam',
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-02.jpg'],
    latitude: 52.3727,
    longitude: 4.8885,
    description: 'Beautiful apartment with canal view',
    bedrooms: 2,
    maxAdults: 4,
    inside: ['Wi-Fi', 'Washing machine', 'Heating', 'Kitchen'],
    host: {
      name: 'Jane Smith',
      avatar: 'img/avatar-jane.jpg',
      isPro: true,
      description: 'Professional host with great reviews',
    },
    reviews: [
      {
        id: 'r2',
        user: 'Anna',
        avatar: 'img/avatar-anna.jpg',
        rating: 4.8,
        text: 'Perfect location and comfortable apartment',
        date: 'March 2024',
      },
    ],
  },
  {
    id: '3',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5.0,
    isPremium: true,
    isFavorite: false,
    city: 'Amsterdam',
    previewImage: 'img/apartment-03.jpg',
    images: ['img/apartment-03.jpg'],
    latitude: 52.395,
    longitude: 4.9331,
    description: 'Premium apartment with all amenities',
    bedrooms: 3,
    maxAdults: 6,
    inside: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
    ],
    host: {
      name: 'Bob Wilson',
      avatar: 'img/avatar-bob.jpg',
      isPro: true,
      description: 'Experienced host with luxury properties',
    },
    reviews: [
      {
        id: 'r3',
        user: 'Tom',
        avatar: 'img/avatar-tom.jpg',
        rating: 5.0,
        text: 'Absolutely amazing! Everything is perfect!',
        date: 'February 2024',
      },
    ],
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
