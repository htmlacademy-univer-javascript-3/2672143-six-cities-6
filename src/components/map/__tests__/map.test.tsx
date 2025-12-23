import { render } from '@testing-library/react';
import { Map } from '../map';
import type { Offer } from '../../../types/offer';
import { IconOptions } from 'leaflet';

vi.mock('leaflet', () => {
  const mockMarker = {
    bindPopup: vi.fn().mockReturnThis(),
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  };

  const mockTileLayer = {
    addTo: vi.fn().mockReturnThis(),
  };

  const mockMap = {
    setView: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  };

  return {
    default: {
      map: vi.fn().mockReturnValue(mockMap),
      marker: vi.fn().mockReturnValue(mockMarker),
      icon: vi.fn((options: IconOptions) => options),
      tileLayer: vi.fn().mockReturnValue(mockTileLayer),
    },
  };
});

vi.mock('leaflet/dist/leaflet.css', () => ({}));

describe('Map', () => {
  const mockOffer: Offer = {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
  } as Offer;

  const mockOffers: Offer[] = [mockOffer];

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="cities__map"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render map container with correct id', () => {
    const { container } = render(<Map offers={mockOffers} />);

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveClass('cities__map');
  });

  it('should render map container with correct class', () => {
    const { container } = render(<Map offers={mockOffers} />);

    const mapContainer = container.querySelector('.cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render empty div when no offers provided', () => {
    const { container } = render(<Map offers={[]} />);

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer?.children).toHaveLength(0);
  });

  it('should render map container when offers provided', () => {
    const { container } = render(<Map offers={mockOffers} />);

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should have correct className and id', () => {
    const { container } = render(<Map offers={mockOffers} />);

    const mapContainer = container.querySelector('div#cities__map');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveAttribute('id', 'cities__map');
    expect(mapContainer).toHaveClass('cities__map');
  });

  it('should render map container with multiple offers', () => {
    const multipleOffers: Offer[] = [
      mockOffer,
      {
        ...mockOffer,
        id: '2',
        title: 'Cozy Room',
        location: { latitude: 48.87, longitude: 2.36 },
      } as Offer,
    ];

    const { container } = render(<Map offers={multipleOffers} />);

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should accept hoveredOfferId prop', () => {
    const { container } = render(
      <Map offers={mockOffers} hoveredOfferId="1" />
    );

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should accept undefined hoveredOfferId prop', () => {
    const { container } = render(
      <Map offers={mockOffers} hoveredOfferId={undefined} />
    );

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should accept null hoveredOfferId prop', () => {
    const { container } = render(
      <Map offers={mockOffers} hoveredOfferId={null} />
    );

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render div element', () => {
    const { container } = render(<Map offers={mockOffers} />);

    const mapContainer = container.querySelector('#cities__map');
    expect(mapContainer?.tagName).toBe('DIV');
  });
});
