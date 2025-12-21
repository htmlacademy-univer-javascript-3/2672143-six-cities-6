import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OffersList } from '..';
import type { Offer } from '../../../types/offer';

vi.mock('../ui/OfferItems', () => ({
  OfferItems: ({ offer }: { offer: Offer }) => (
    <div data-testid={`offer-item-${offer.id}`}>{offer.title}</div>
  ),
}));

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'https://example.com/image1.jpg',
    location: { latitude: 48.8566, longitude: 2.3522 },
  } as Offer,
  {
    id: '2',
    title: 'Cozy Room',
    type: 'room',
    price: 80,
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    previewImage: 'https://example.com/image2.jpg',
    location: { latitude: 48.87, longitude: 2.36 },
  } as Offer,
  {
    id: '3',
    title: 'Modern Studio',
    type: 'studio',
    price: 95,
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: 'https://example.com/image3.jpg',
    location: { latitude: 48.85, longitude: 2.34 },
  } as Offer,
];

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('OffersList', () => {
  const mockOnOfferHover = vi.fn();
  const mockOnFavoriteClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render div with correct classes', () => {
    const { container } = renderWithRouter(<OffersList offers={mockOffers} />);

    const listDiv = container.querySelector('.cities__places-list');
    expect(listDiv).toBeInTheDocument();
    expect(listDiv).toHaveClass('places__list');
    expect(listDiv).toHaveClass('tabs__content');
  });

  it('should render all offers', () => {
    renderWithRouter(
      <OffersList
        offers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    mockOffers.forEach((offer) => {
      const offerItem = screen.getByTestId(`offer-item-${offer.id}`);
      expect(offerItem).toBeInTheDocument();
      expect(offerItem).toHaveTextContent(offer.title);
    });
  });

  it('should render correct number of offers', () => {
    const { container } = renderWithRouter(<OffersList offers={mockOffers} />);

    const offerItems = container.querySelectorAll(
      '[data-testid^="offer-item-"]'
    );
    expect(offerItems).toHaveLength(3);
  });

  it('should render empty list when no offers provided', () => {
    const { container } = renderWithRouter(<OffersList offers={[]} />);

    const offerItems = container.querySelectorAll(
      '[data-testid^="offer-item-"]'
    );
    expect(offerItems).toHaveLength(0);
  });

  it('should pass hoveredOfferId to OfferItems', () => {
    renderWithRouter(
      <OffersList
        offers={mockOffers}
        hoveredOfferId="1"
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const hoveredItem = screen.getByTestId('offer-item-1');
    expect(hoveredItem).toBeInTheDocument();
  });

  it('should pass callbacks to OfferItems', () => {
    renderWithRouter(
      <OffersList
        offers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    mockOffers.forEach((offer) => {
      const offerItem = screen.getByTestId(`offer-item-${offer.id}`);
      expect(offerItem).toBeInTheDocument();
    });
  });

  it('should render single offer', () => {
    const { container } = renderWithRouter(
      <OffersList offers={[mockOffers[0]]} />
    );

    const offerItems = container.querySelectorAll(
      '[data-testid^="offer-item-"]'
    );
    expect(offerItems).toHaveLength(1);
  });
});
