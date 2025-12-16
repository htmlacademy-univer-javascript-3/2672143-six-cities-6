import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OfferItems } from '../ui/OfferItems';
import type { Offer } from '../../../types/Offer';

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

describe('OfferItems', () => {
  const mockOnFavoriteClick = vi.fn();
  const mockOnHover = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render article with place-card classes', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const article = container.querySelector('article.place-card');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('cities__card');
  });

  it('should render Premium mark when isPremium is true', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const premiumMark = screen.getByText('Premium');
    expect(premiumMark).toBeInTheDocument();
    expect(premiumMark.parentElement).toHaveClass('place-card__mark');
  });

  it('should not render Premium mark when isPremium is false', () => {
    renderWithRouter(<OfferItems offer={mockOffers[1]} />);

    const premiumMark = screen.queryByText('Premium');
    expect(premiumMark).not.toBeInTheDocument();
  });

  it('should render image link with correct href', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const imageLink = screen.getByRole('link', { name: /Place image/i });
    expect(imageLink).toHaveAttribute('href', '/offer/1');
  });

  it('should render preview image with correct attributes', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const image = container.querySelector('.place-card__image');
    expect(image).toHaveAttribute('src', mockOffers[0].previewImage);
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
    expect(image).toHaveAttribute('alt', 'Place image');
  });

  it('should render price value', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const priceValue = screen.getByText('€120');
    expect(priceValue).toBeInTheDocument();
    expect(priceValue).toHaveClass('place-card__price-value');
  });

  it('should render price text "/night"', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const priceText = container.querySelector('.place-card__price-text');
    expect(priceText).toBeInTheDocument();
    expect(priceText).toHaveTextContent('/ night');
  });

  it('should render bookmark button', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('place-card__bookmark-button');
  });

  it('should add active class to bookmark button when isFavorite is true', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[1]} />
    );

    const button = container.querySelector('.place-card__bookmark-button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
  });

  it('should not add active class to bookmark button when isFavorite is false', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const button = container.querySelector('.place-card__bookmark-button');
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render "In bookmarks" text when isFavorite is true', () => {
    renderWithRouter(<OfferItems offer={mockOffers[1]} />);

    const hiddenText = screen.getByText('In bookmarks');
    expect(hiddenText).toHaveClass('visually-hidden');
  });

  it('should render "To bookmarks" text when isFavorite is false', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const hiddenText = screen.getByText('To bookmarks');
    expect(hiddenText).toHaveClass('visually-hidden');
  });

  it('should render rating with correct width', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const ratingSpan = container.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle({ width: '90%' });
  });

  it('should render "Rating" visually-hidden text', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const ratingText = screen.getByText('Rating');
    expect(ratingText).toHaveClass('visually-hidden');
  });

  it('should render title as link', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const titleLink = screen.getByRole('link', { name: mockOffers[0].title });
    expect(titleLink).toHaveAttribute('href', '/offer/1');
    expect(titleLink).toHaveTextContent(mockOffers[0].title);
  });

  it('should render type', () => {
    renderWithRouter(<OfferItems offer={mockOffers[0]} />);

    const type = screen.getByText(mockOffers[0].type);
    expect(type).toBeInTheDocument();
    expect(type).toHaveClass('place-card__type');
  });

  it('should not add active class when isHovered is false', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} isHovered={false} />
    );

    const article = container.querySelector('article');
    expect(article).not.toHaveClass('place-card--active');
  });

  it('should call onHover with offer id on mouse enter', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} onHover={mockOnHover} />
    );

    const article = container.querySelector('article');
    fireEvent.mouseEnter(article!);

    expect(mockOnHover).toHaveBeenCalledWith('1');
  });

  it('should call onHover with null on mouse leave', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} onHover={mockOnHover} />
    );

    const article = container.querySelector('article');
    fireEvent.mouseLeave(article!);

    expect(mockOnHover).toHaveBeenCalledWith(null);
  });

  it('should call onFavoriteClick when bookmark button clicked', () => {
    renderWithRouter(
      <OfferItems offer={mockOffers[0]} onFavoriteClick={mockOnFavoriteClick} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnFavoriteClick).toHaveBeenCalledWith('1', true);
  });

  it('should toggle isFavorite on bookmark click', () => {
    const { rerender } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} onFavoriteClick={mockOnFavoriteClick} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnFavoriteClick).toHaveBeenCalledWith('1', true);

    rerender(
      <BrowserRouter>
        <OfferItems
          offer={{ ...mockOffers[0], isFavorite: true }}
          onFavoriteClick={mockOnFavoriteClick}
        />
      </BrowserRouter>
    );

    fireEvent.click(button);
    expect(mockOnFavoriteClick).toHaveBeenCalledWith('1', false);
  });

  it('should render correct rating for 4.0', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[1]} />
    );

    const ratingSpan = container.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle({ width: '80%' });
  });

  it('should render correct rating for 4.8', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[2]} />
    );

    const ratingSpan = container.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle({ width: '96%' });
  });

  it('should render bookmark icon svg', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const svg = container.querySelector('.place-card__bookmark-icon');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '19');
  });

  it('should render all sections of card', () => {
    const { container } = renderWithRouter(
      <OfferItems offer={mockOffers[0]} />
    );

    const priceWrapper = container.querySelector('.place-card__price-wrapper');
    const ratingDiv = container.querySelector('.place-card__rating');
    const nameHeading = container.querySelector('.place-card__name');
    const typeP = container.querySelector('.place-card__type');

    expect(priceWrapper).toBeInTheDocument();
    expect(ratingDiv).toBeInTheDocument();
    expect(nameHeading).toBeInTheDocument();
    expect(typeP).toBeInTheDocument();
  });
});
