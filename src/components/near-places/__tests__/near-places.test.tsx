import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NearPlaces } from '../near-places';
import type { Offer } from '../../../types/offer';

vi.mock('../../offers-list/ui/offer-items', () => ({
  OfferItems: ({ offer }: { offer: Offer }) => (
    <div data-testid={`offer-items-${offer.id}`}>{offer.title}</div>
  ),
}));

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    location: { latitude: 48.8566, longitude: 2.3522 },
    isFavorite: false,
  } as Offer,
  {
    id: '2',
    title: 'Cozy Room',
    type: 'room',
    price: 80,
    location: { latitude: 48.87, longitude: 2.36 },
    isFavorite: false,
  } as Offer,
  {
    id: '3',
    title: 'Modern Studio',
    type: 'studio',
    price: 95,
    location: { latitude: 48.85, longitude: 2.34 },
    isFavorite: true,
  } as Offer,
];

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('NearPlaces', () => {
  it('should render container with correct class', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('place-container');
  });

  it('should render section with correct classes', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const section = container.querySelector('.near-places');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('places');
  });

  it('should render title "Other places in the neighborhood"', () => {
    renderWithRouter(<NearPlaces offers={mockOffers} />);

    const title = screen.getByText('Other places in the neighborhood');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title).toHaveClass('near-places__title');
  });

  it('should render places list div with correct classes', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const list = container.querySelector('.near-places__list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('places__list');
  });

  it('should render all offers as articles', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const articles = container.querySelectorAll('article.near-places__card');
    expect(articles).toHaveLength(3);
  });

  it('should render articles with correct class', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const articles = container.querySelectorAll('.place-card');
    expect(articles).toHaveLength(mockOffers.length);
    articles.forEach((article) => {
      expect(article).toHaveClass('near-places__card');
    });
  });

  it('should render OfferItems for each offer', () => {
    renderWithRouter(<NearPlaces offers={mockOffers} />);

    mockOffers.forEach((offer) => {
      const offerItem = screen.getByTestId(`offer-items-${offer.id}`);
      expect(offerItem).toBeInTheDocument();
      expect(offerItem).toHaveTextContent(offer.title);
    });
  });

  it('should render correct number of offers', () => {
    renderWithRouter(<NearPlaces offers={mockOffers} />);

    const offerItems = screen.getAllByTestId(/offer-items-/);
    expect(offerItems).toHaveLength(3);
  });

  it('should render empty list when no offers provided', () => {
    const { container } = renderWithRouter(<NearPlaces offers={[]} />);

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(0);
  });

  it('should render single offer', () => {
    const { container } = renderWithRouter(
      <NearPlaces offers={[mockOffers[0]]} />
    );

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(1);
    expect(articles[0]).toHaveClass('place-card');
  });

  it('should render correct structure hierarchy', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const containerDiv = container.querySelector('.container');
    const section = containerDiv?.querySelector('.near-places');
    const list = section?.querySelector('.near-places__list');
    const articles = list?.querySelectorAll('article');

    expect(containerDiv).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(articles).toHaveLength(3);
  });

  it('should render offers with correct key prop', () => {
    const { container } = renderWithRouter(<NearPlaces offers={mockOffers} />);

    const articles = container.querySelectorAll('article');
    articles.forEach((article) => {
      expect(article).toHaveClass('near-places__card');
    });
  });

  it('should render OfferItems with offer prop', () => {
    renderWithRouter(<NearPlaces offers={mockOffers} />);

    mockOffers.forEach((offer) => {
      const offerElement = screen.getByTestId(`offer-items-${offer.id}`);
      expect(offerElement).toHaveTextContent(offer.title);
    });
  });
});
