import type { Meta, StoryObj } from '@storybook/react';
import { OfferGallery } from './offer-gallery';

const meta = {
  title: 'Components/OfferGallery',
  component: OfferGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OfferGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockImages = [
  'https://via.placeholder.com/300x200?text=Image+1',
  'https://via.placeholder.com/300x200?text=Image+2',
  'https://via.placeholder.com/300x200?text=Image+3',
  'https://via.placeholder.com/300x200?text=Image+4',
  'https://via.placeholder.com/300x200?text=Image+5',
  'https://via.placeholder.com/300x200?text=Image+6',
];

export const Default: Story = {
  args: {
    images: mockImages,
  },
};

export const SingleImage: Story = {
  args: {
    images: [mockImages[0]],
  },
};

export const TwoImages: Story = {
  args: {
    images: [mockImages[0], mockImages[1]],
  },
};

export const EmptyGallery: Story = {
  args: {
    images: [],
  },
};

export const ManyImages: Story = {
  args: {
    images: [...mockImages, ...mockImages],
  },
};
