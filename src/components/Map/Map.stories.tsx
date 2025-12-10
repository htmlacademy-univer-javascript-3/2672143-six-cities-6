import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';
import { Offer } from '../../types/Offer';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful apartment in Amsterdam',
    description: 'Cozy 2-bedroom apartment in the city center',
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    type: '',
    price: 0,
    city: '',
    isFavorite: false,
    isPremium: false,
    rating: 0,
    previewImage: '',
  },
  {
    id: '2',
    title: 'Modern studio apartment',
    description: 'Perfect for couples and solo travelers',
    latitude: 52.3609553943508,
    longitude: 4.85309666406198,
    type: '',
    price: 0,
    city: '',
    isFavorite: false,
    isPremium: false,
    rating: 0,
    previewImage: '',
  },
  {
    id: '3',
    title: 'Luxury penthouse',
    description: 'Amazing view of the city',
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
    type: '',
    price: 0,
    city: '',
    isFavorite: false,
    isPremium: false,
    rating: 0,
    previewImage: '',
  },
  {
    id: '4',
    title: 'Charming Dutch house',
    description: 'Traditional architecture, modern comfort',
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    type: '',
    price: 0,
    city: '',
    isFavorite: false,
    isPremium: false,
    rating: 0,
    previewImage: '',
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
        description: 'This offer has no location data',
        latitude: 0,
        longitude: 0,
        type: '',
        price: 0,
        city: '',
        isFavorite: false,
        isPremium: false,
        rating: 0,
        previewImage: '',
      },
      {
        id: '2',
        title: 'Another offer',
        description: 'This one has proper coordinates',
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        type: '',
        price: 0,
        city: '',
        isFavorite: false,
        isPremium: false,
        rating: 0,
        previewImage: '',
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
