import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './map';
import { Offer } from '../../types/Offers';
import { City } from '../../types/city-data';

const mockCity: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 12,
  },
};

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful apartment in Amsterdam',
    type: 'apartment',
    price: 120,
    city: mockCity,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.8,
    previewImage: 'https://via.placeholder.com/260x200?text=Amsterdam+1',
  },
  {
    id: '2',
    title: 'Modern studio apartment',
    type: 'room',
    price: 85,
    city: mockCity,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'https://via.placeholder.com/260x200?text=Modern+Studio',
  },
  {
    id: '3',
    title: 'Luxury penthouse',
    type: 'house',
    price: 250,
    city: mockCity,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5.0,
    previewImage: 'https://via.placeholder.com/260x200?text=Luxury+Penthouse',
  },
  {
    id: '4',
    title: 'Charming Dutch house',
    type: 'house',
    price: 180,
    city: mockCity,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.6,
    previewImage: 'https://via.placeholder.com/260x200?text=Dutch+House',
  },
];

const meta = {
  title: 'Components/Map',
  component: Map,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive map component displaying rental offers as markers using Leaflet and OpenStreetMap.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOffers: Story = {
  args: {
    offers: mockOffers,
  },
  render: (args) => (
    <div>
      <h2>Map with all offers (4 markers)</h2>
      <p>Amsterdam rental offers displayed as interactive markers</p>
      <Map {...args} />
    </div>
  ),
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]],
  },
  render: (args) => (
    <div>
      <h2>Map with single offer</h2>
      <p>Single rental offer marker on the map</p>
      <Map {...args} />
    </div>
  ),
};

export const MultipleOffers: Story = {
  args: {
    offers: mockOffers.slice(0, 2),
  },
  render: (args) => (
    <div>
      <h2>Map with multiple offers (2 markers)</h2>
      <p>Two rental offers displayed on the map</p>
      <Map {...args} />
    </div>
  ),
};

export const EmptyOffers: Story = {
  args: {
    offers: [],
  },
  render: (args) => (
    <div>
      <h2>Map with no offers</h2>
      <p>Empty map - no rental offers to display</p>
      <Map {...args} />
    </div>
  ),
};

export const OffersWithoutCoordinates: Story = {
  args: {
    offers: [
      {
        id: '1',
        title: 'Offer without coordinates',
        type: 'apartment',
        price: 100,
        city: mockCity,
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 12,
        },
        isFavorite: false,
        isPremium: false,
        rating: 0,
        previewImage: 'https://via.placeholder.com/260x200?text=No+Coords',
      },
      {
        id: '2',
        title: 'Another offer',
        type: 'room',
        price: 90,
        city: mockCity,
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 12,
        },
        isFavorite: false,
        isPremium: false,
        rating: 4.3,
        previewImage: 'https://via.placeholder.com/260x200?text=Valid+Coords',
      },
    ],
  },
  render: (args) => (
    <div>
      <h2>Map with mixed data</h2>
      <p>Some offers have valid coordinates, others dont</p>
      <Map {...args} />
    </div>
  ),
};

export const ZoomedView: Story = {
  args: {
    offers: mockOffers,
  },
  render: (args) => (
    <div>
      <h2>Map zoomed view</h2>
      <p>Default zoom level: 12, centered on first offer coordinates</p>
      <Map {...args} />
    </div>
  ),
};

export const PremiumOffers: Story = {
  args: {
    offers: mockOffers.filter((offer) => offer.isPremium),
  },
  render: (args) => (
    <div>
      <h2>Map with premium offers only</h2>
      <p>Displaying only premium rental offers</p>
      <Map {...args} />
    </div>
  ),
};
