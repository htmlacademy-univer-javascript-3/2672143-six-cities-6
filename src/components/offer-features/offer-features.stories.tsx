import type { Meta, StoryObj } from '@storybook/react';
import { OfferFeatures } from './offer-features';

const meta = {
  title: 'Components/OfferFeatures',
  component: OfferFeatures,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OfferFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'apartment',
    bedrooms: 2,
    maxAdults: 4,
  },
};

export const WithoutBedrooms: Story = {
  args: {
    type: 'room',
    maxAdults: 2,
  },
};

export const WithoutMaxAdults: Story = {
  args: {
    type: 'house',
    bedrooms: 3,
  },
};

export const OnlyType: Story = {
  args: {
    type: 'villa',
  },
};

export const AllFeatures: Story = {
  args: {
    type: 'apartment',
    bedrooms: 4,
    maxAdults: 8,
  },
};
