import type { Meta, StoryObj } from '@storybook/react';
import type { City } from '../../types/City';
import { Tabs } from '.';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCities: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
  },
  {
    name: 'London',
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      zoom: 12,
    },
  },
  {
    name: 'Berlin',
    location: {
      latitude: 52.52,
      longitude: 13.405,
      zoom: 12,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 12,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 12,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 12,
    },
  },
];

export const Default: Story = {
  args: {
    cities: mockCities,
  },
};

export const SingleCity: Story = {
  args: {
    cities: [mockCities[0]],
  },
};

export const TwoCities: Story = {
  args: {
    cities: mockCities.slice(0, 2),
  },
};

export const WithCallback: Story = {
  args: {
    cities: mockCities,
  },
};

export const Empty: Story = {
  args: {
    cities: [],
  },
};

export const LargeCitiesList: Story = {
  args: {
    cities: mockCities,
  },
};
