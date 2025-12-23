import type { Meta, StoryObj } from '@storybook/react';
import { ReviewsList } from './reviews-list';
import { Review } from '../../types/reviewsssss';

const meta = {
  title: 'Components/ReviewsList',
  component: ReviewsList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4.8,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'April 2024',
  },
  {
    id: '2',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-anna.jpg',
      isPro: true,
    },
    rating: 4.5,
    comment:
      'Great location and comfortable accommodation. The host was very helpful and responsive.',
    date: 'March 2024',
  },
  {
    id: '3',
    user: {
      name: 'John',
      avatarUrl: 'img/avatar-john.jpg',
      isPro: false,
    },
    rating: 5.0,
    comment:
      'Perfect! Everything was excellent. I would definitely stay here again.',
    date: 'February 2024',
  },
  {
    id: '4',
    user: {
      name: 'Sarah',
      avatarUrl: 'img/avatar-sarah.jpg',
      isPro: false,
    },
    rating: 3.8,
    comment:
      'Good place overall, but some minor issues with the heating system. The host quickly resolved it.',
    date: 'January 2024',
  },
];

export const Default: Story = {
  args: {
    reviews: mockReviews,
  },
};

export const SingleReview: Story = {
  args: {
    reviews: [mockReviews[0]],
  },
};

export const TwoReviews: Story = {
  args: {
    reviews: [mockReviews[0], mockReviews[1]],
  },
};

export const Empty: Story = {
  args: {
    reviews: [],
  },
};

export const PerfectRating: Story = {
  args: {
    reviews: [mockReviews[2]],
  },
};

export const LowRating: Story = {
  args: {
    reviews: [mockReviews[3]],
  },
};

export const ManyReviews: Story = {
  args: {
    reviews: [
      ...mockReviews,
      ...mockReviews.map((r, i) => ({
        ...r,
        id: `${r.id}-copy-${i}`,
        user: {
          ...r.user,
          name: `${r.user.name} ${i}`,
        },
      })),
    ],
  },
};
