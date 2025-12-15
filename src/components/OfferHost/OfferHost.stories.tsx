import type { Meta, StoryObj } from '@storybook/react';
import { OfferHost } from './OfferHost';
import type { Host } from '../../types/Host';

const meta = {
  title: 'Components/OfferHost',
  component: OfferHost,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OfferHost>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProHost: Host = {
  name: 'John Doe',
  avatarUrl: 'https://via.placeholder.com/74x74?text=John+Doe',
  isPro: true,
};

const mockRegularHost: Host = {
  name: 'Jane Smith',
  avatarUrl: 'https://via.placeholder.com/74x74?text=Jane+Smith',
  isPro: false,
};

export const ProHost: Story = {
  args: {
    host: mockProHost,
  },
};

export const RegularHost: Story = {
  args: {
    host: mockRegularHost,
  },
};

export const HostWithLongName: Story = {
  args: {
    host: {
      name: 'Alexander Montgomery III',
      avatarUrl: 'https://via.placeholder.com/74x74?text=Alexander',
      isPro: true,
    },
  },
};

export const HostWithShortName: Story = {
  args: {
    host: {
      name: 'Bob',
      avatarUrl: 'https://via.placeholder.com/74x74?text=Bob',
      isPro: false,
    },
  },
};
