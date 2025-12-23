import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { OffersContent } from '../OffersContent';
import type { Offer } from '../../../types/Offer';

vi.mock('../../OffersList', () => ({
  OffersList: ({ offers }: { offers: Offer[] }) => (
    <div data-testid="offers-list">
      {offers.map((offer) => (
        <div key={offer.id} data-testid={`offer-${offer.id}`}>
          {offer.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../Sort/Sort', () => ({
  Sort: () => <div data-testid="sort-component">Sort Component</div>,
}));

vi.mock('../../Map/Map', () => ({
  Map: () => <div data-testid="map-component">Map Component</div>,
}));

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Cozy apartment',
    type: 'apartment',
    price: 120,
    location: { latitude: 48.8566, longitude: 2.3522 },
    isFavorite: false,
  } as Offer,
  {
    id: '2',
    title: 'Modern studio',
    type: 'studio',
    price: 95,
    location: { latitude: 48.87, longitude: 2.36 },
    isFavorite: true,
  } as Offer,
  {
    id: '3',
    title: 'Spacious house',
    type: 'house',
    price: 200,
    location: { latitude: 48.85, longitude: 2.34 },
    isFavorite: false,
  } as Offer,
];

const mockStoreSlice = {
  auth: {
    authorizationStatus: 'Auth',
    user: null,
    isLoading: false,
    error: null,
  },
};

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: () => mockStoreSlice.auth,
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('OffersContent', () => {
  const mockOnOfferHover = vi.fn();
  const mockOnFavoriteClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render section with correct class', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const section = container.querySelector('.cities__places');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('places');
  });

  it('should render visually-hidden h2 with "Places" text', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const heading = screen.getByText('Places');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('visually-hidden');
    expect(heading.tagName).toBe('H2');
  });

  it('should render correct number of places and city name', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = screen.getByText('3 places to stay in Paris');
    expect(placesFound).toBeInTheDocument();
    expect(placesFound).toHaveClass('places__found');
  });

  it('should render places__found as bold element', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = container.querySelector('.places__found');
    expect(placesFound?.tagName).toBe('B');
  });

  it('should render Sort component', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const sortComponent = screen.getByTestId('sort-component');
    expect(sortComponent).toBeInTheDocument();
  });

  it('should render OffersList component', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const offersList = screen.getByTestId('offers-list');
    expect(offersList).toBeInTheDocument();
  });

  it('should pass offers to OffersList', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    mockOffers.forEach((offer) => {
      const offerElement = screen.getByTestId(`offer-${offer.id}`);
      expect(offerElement).toBeInTheDocument();
      expect(offerElement).toHaveTextContent(offer.title);
    });
  });

  it('should render right section with Map component', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const rightSection = container.querySelector('.cities__right-section');
    expect(rightSection).toBeInTheDocument();
  });

  it('should render Map component in right section', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const mapComponent = screen.getByTestId('map-component');
    expect(mapComponent).toBeInTheDocument();
  });

  it('should render correct count with single offer', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="London"
        sortedOffers={[mockOffers[0]]}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = screen.getByText('1 places to stay in London');
    expect(placesFound).toBeInTheDocument();
  });

  it('should render correct city name', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Berlin"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = screen.getByText(/places to stay in Berlin/);
    expect(placesFound).toBeInTheDocument();
  });

  it('should render empty offers list with zero offers', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={[]}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = screen.getByText('0 places to stay in Paris');
    expect(placesFound).toBeInTheDocument();
  });

  it('should render correct structure hierarchy', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const section = container.querySelector('.cities__places');
    const heading = section?.querySelector('.visually-hidden');
    const placesFound = section?.querySelector('.places__found');
    const rightSection = container.querySelector('.cities__right-section');

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(placesFound).toBeInTheDocument();
    expect(rightSection).toBeInTheDocument();
  });

  it('should accept hoveredOfferId prop', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId="1"
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const offersList = screen.getByTestId('offers-list');
    expect(offersList).toBeInTheDocument();
  });

  it('should accept null hoveredOfferId prop', () => {
    renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const offersList = screen.getByTestId('offers-list');
    expect(offersList).toBeInTheDocument();
  });

  it('should render all sections in correct order', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const children = container.firstChild?.childNodes;
    expect(children?.length).toBeGreaterThanOrEqual(2);
  });

  it('should render section before right section', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const section = container.querySelector('.cities__places');
    const rightSection = container.querySelector('.cities__right-section');
    const sectionIndex = Array.from(container.children).indexOf(
      section as Element
    );
    const rightSectionIndex = Array.from(container.children).indexOf(
      rightSection as Element
    );

    expect(sectionIndex).toBeLessThan(rightSectionIndex);
  });

  it('should handle different offer counts', () => {
    const { rerender } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    expect(screen.getByText('3 places to stay in Paris')).toBeInTheDocument();

    rerender(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={[mockOffers[0]]}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
  });

  it('should render places__found with correct class', () => {
    const { container } = renderWithProviders(
      <OffersContent
        hoveredOfferId={null}
        selectedCity="Paris"
        sortedOffers={mockOffers}
        onOfferHover={mockOnOfferHover}
        onFavoriteClick={mockOnFavoriteClick}
      />
    );

    const placesFound = container.querySelector('.places__found');
    expect(placesFound).toHaveClass('places__found');
  });
});
