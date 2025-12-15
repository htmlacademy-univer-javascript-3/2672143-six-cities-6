import type { Meta, StoryObj } from '@storybook/react';
import { OfferGoodsList } from './OfferGoodsList';

const meta = {
  title: 'Components/OfferGoodsList',
  component: OfferGoodsList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OfferGoodsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockGoods = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'TV',
  'Kitchen',
  'Air conditioning',
  'Heating',
  'Dishwasher',
  'Refrigerator',
  'Microwave',
];

export const Default: Story = {
  args: {
    goods: mockGoods,
  },
};

export const FewGoods: Story = {
  args: {
    goods: ['Wi-Fi', 'Washing machine', 'TV'],
  },
};

export const SingleGood: Story = {
  args: {
    goods: ['Wi-Fi'],
  },
};

export const EmptyGoods: Story = {
  args: {
    goods: [],
  },
};

export const ManyGoods: Story = {
  args: {
    goods: [...mockGoods, ...mockGoods],
  },
};
