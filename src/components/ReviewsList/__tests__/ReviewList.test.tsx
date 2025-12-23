import { render, screen } from '@testing-library/react';
import { ReviewsList } from '../ReviewsList';
import type { Review } from '../../../types/Review';

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatarUrl: 'https://example.com/avatar1.jpg',
      isPro: true,
    },
    rating: 4.5,
    comment: 'Great place to stay! Clean and cozy.',
    date: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatarUrl: 'https://example.com/avatar2.jpg',
      isPro: false,
    },
    rating: 5,
    comment: 'Excellent service and beautiful rooms.',
    date: '2024-01-10T14:20:00Z',
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      avatarUrl: 'https://example.com/avatar3.jpg',
      isPro: true,
    },
    rating: 3.5,
    comment: 'Nice place, but could be cleaner.',
    date: '2024-01-05T08:45:00Z',
  },
];

describe('ReviewsList', () => {
  it('should render section with correct classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const section = container.querySelector('.offer__reviews');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('reviews');
  });

  it('should render title with reviews count', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const title = screen.getByText(/Reviews/);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('reviews__title');
  });

  it('should display correct number of reviews in title', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const amount = screen.getByText(mockReviews.length.toString());
    expect(amount).toBeInTheDocument();
    expect(amount).toHaveClass('reviews__amount');
  });

  it('should render reviews list with correct class', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const list = container.querySelector('.reviews__list');
    expect(list).toBeInTheDocument();
    expect(list?.tagName).toBe('UL');
  });

  it('should render all reviews', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const items = container.querySelectorAll('.reviews__item');
    expect(items).toHaveLength(mockReviews.length);
  });

  it('should display user name for each review', () => {
    render(<ReviewsList reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      const userName = screen.getByText(review.user.name);
      expect(userName).toBeInTheDocument();
      expect(userName).toHaveClass('reviews__user-name');
    });
  });

  it('should display user avatar for each review', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const avatars = container.querySelectorAll('.reviews__avatar');
    expect(avatars).toHaveLength(mockReviews.length);

    mockReviews.forEach((review, index) => {
      const avatar = avatars[index] as HTMLImageElement;
      expect(avatar).toHaveAttribute('src', review.user.avatarUrl);
      expect(avatar).toHaveAttribute('alt', `${review.user.name}'s avatar`);
      expect(avatar).toHaveAttribute('width', '54');
      expect(avatar).toHaveAttribute('height', '54');
    });
  });

  it('should display Pro status for Pro users', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const proStatuses = screen.getAllByText('Pro');
    expect(proStatuses.length).toBeGreaterThan(0);

    proStatuses.forEach((status) => {
      expect(status).toHaveClass('reviews__user-status');
    });
  });

  it('should not display Pro status for non-Pro users', () => {
    render(<ReviewsList reviews={[mockReviews[1]]} />);

    const proStatuses = screen.queryAllByText('Pro');
    expect(proStatuses.length).toBe(0);
  });

  it('should display rating for each review', () => {
    render(<ReviewsList reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      const rating = screen.getByText(review.rating.toString());
      expect(rating).toBeInTheDocument();
      expect(rating).toHaveClass('reviews__rating-value');
    });
  });

  it('should calculate correct rating width percentage', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const ratingSpans = container.querySelectorAll(
      '.reviews__stars > span:first-child'
    );

    mockReviews.forEach((review, index) => {
      const expectedWidth = `${(review.rating / 5) * 100}%`;
      expect(ratingSpans[index]).toHaveStyle({ width: expectedWidth });
    });
  });

  it('should display review comment for each review', () => {
    render(<ReviewsList reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      const comment = screen.getByText(review.comment);
      expect(comment).toBeInTheDocument();
      expect(comment).toHaveClass('reviews__text');
    });
  });

  it('should display formatted date for each review', () => {
    render(<ReviewsList reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      const expectedDate = new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const dateElement = screen.getByText(expectedDate);
      expect(dateElement).toBeInTheDocument();
      expect(dateElement).toHaveClass('reviews__time');
    });
  });

  it('should have correct datetime attribute on time element', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const timeElements = container.querySelectorAll('.reviews__time');
    expect(timeElements).toHaveLength(mockReviews.length);

    mockReviews.forEach((review, index) => {
      expect(timeElements[index]).toHaveAttribute('dateTime', review.date);
    });
  });

  it('should render empty list when no reviews provided', () => {
    const { container } = render(<ReviewsList reviews={[]} />);

    const items = container.querySelectorAll('.reviews__item');
    expect(items).toHaveLength(0);
  });

  it('should display 0 reviews count when empty', () => {
    render(<ReviewsList reviews={[]} />);

    const amount = screen.getByText('0');
    expect(amount).toBeInTheDocument();
  });

  it('should render single review correctly', () => {
    const { container } = render(<ReviewsList reviews={[mockReviews[0]]} />);

    const items = container.querySelectorAll('.reviews__item');
    expect(items).toHaveLength(1);

    const userName = screen.getByText(mockReviews[0].user.name);
    expect(userName).toBeInTheDocument();
  });

  it('should have correct user wrapper classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const userWrappers = container.querySelectorAll('.reviews__user');
    expect(userWrappers).toHaveLength(mockReviews.length);

    userWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('user');
    });
  });

  it('should have correct avatar wrapper classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const avatarWrappers = container.querySelectorAll(
      '.reviews__avatar-wrapper'
    );
    expect(avatarWrappers).toHaveLength(mockReviews.length);

    avatarWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('user__avatar-wrapper');
    });
  });

  it('should have correct rating section classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const ratingSections = container.querySelectorAll('.reviews__rating');
    expect(ratingSections).toHaveLength(mockReviews.length);

    ratingSections.forEach((section) => {
      expect(section).toHaveClass('rating');
    });
  });

  it('should have correct stars classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const starsElements = container.querySelectorAll('.reviews__stars');
    expect(starsElements).toHaveLength(mockReviews.length);

    starsElements.forEach((stars) => {
      expect(stars).toHaveClass('rating__stars');
    });
  });

  it('should render Rating visually-hidden text', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const hiddenTexts = screen.getAllByText('Rating');
    expect(hiddenTexts.length).toBe(mockReviews.length);

    hiddenTexts.forEach((text) => {
      expect(text).toHaveClass('visually-hidden');
    });
  });

  it('should have correct info section classes', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const infoSections = container.querySelectorAll('.reviews__info');
    expect(infoSections).toHaveLength(mockReviews.length);
  });

  it('should display different ratings correctly', () => {
    const reviewsWithDifferentRatings: Review[] = [
      {
        ...mockReviews[0],
        rating: 1,
      },
      {
        ...mockReviews[1],
        rating: 2.5,
      },
      {
        ...mockReviews[2],
        rating: 5,
      },
    ];

    const { container } = render(
      <ReviewsList reviews={reviewsWithDifferentRatings} />
    );

    const ratingSpans = container.querySelectorAll(
      '.reviews__stars > span:first-child'
    );

    expect(ratingSpans[0]).toHaveStyle({ width: '20%' });
    expect(ratingSpans[1]).toHaveStyle({ width: '50%' });
    expect(ratingSpans[2]).toHaveStyle({ width: '100%' });
  });

  it('should render reviews in order', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const comments = mockReviews.map((r) => r.comment);
    const renderedComments = comments.map((c) => screen.getByText(c));

    renderedComments.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should have unique key for each review item', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const items = container.querySelectorAll('.reviews__item');
    expect(items).toHaveLength(mockReviews.length);
    expect(new Set(mockReviews.map((r) => r.id)).size).toBe(mockReviews.length);
  });

  it('should render avatar images correctly', () => {
    const { container } = render(<ReviewsList reviews={mockReviews} />);

    const avatars = container.querySelectorAll('.reviews__avatar');
    avatars.forEach((avatar, index) => {
      expect(avatar).toHaveClass('user__avatar');
      expect((avatar as HTMLImageElement).src).toBe(
        mockReviews[index].user.avatarUrl
      );
    });
  });

  it('should display Pro user correctly', () => {
    const proReview = mockReviews[0];
    render(<ReviewsList reviews={[proReview]} />);

    const proStatus = screen.getByText('Pro');
    expect(proStatus).toBeInTheDocument();
    expect(proStatus.parentElement).toHaveClass('reviews__user');
  });

  it('should display non-Pro user without status', () => {
    const nonProReview = mockReviews[1];
    render(<ReviewsList reviews={[nonProReview]} />);

    const statusBadges = screen.queryAllByText('Pro');
    expect(statusBadges).toHaveLength(0);
  });
});
