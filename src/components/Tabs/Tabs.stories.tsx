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
    id: 1,
    name: 'Paris',
    href: '/cities/paris',
  },
  {
    id: 2,
    name: 'London',
    href: '/cities/london',
  },
  {
    id: 3,
    name: 'Berlin',
    href: '/cities/berlin',
  },
  {
    id: 4,
    name: 'Amsterdam',
    href: '/cities/amsterdam',
  },
  {
    id: 5,
    name: 'Brussels',
    href: '/cities/brussels',
  },
  {
    id: 6,
    name: 'Cologne',
    href: '/cities/cologne',
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
    onCityChange: (city, index) => {
      // eslint-disable-next-line no-console
      console.log(`City changed to: ${city.name} (index: ${index})`);
    },
  },
};

export const Empty: Story = {
  args: {
    cities: [],
  },
};
