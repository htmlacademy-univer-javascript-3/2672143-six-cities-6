import { render, screen } from '@testing-library/react';
import { OfferFeatures } from '../OfferFeatures';

describe('OfferFeatures', () => {
  it('should render ul with correct class', () => {
    const { container } = render(<OfferFeatures type="apartment" />);

    const ul = container.querySelector('ul.offer__features');
    expect(ul).toBeInTheDocument();
  });

  it('should render type feature', () => {
    render(<OfferFeatures type="apartment" />);

    const typeFeature = screen.getByText('apartment');
    expect(typeFeature).toBeInTheDocument();
    expect(typeFeature).toHaveClass('offer__feature');
    expect(typeFeature).toHaveClass('offer__feature--entire');
  });

  it('should render type as list item', () => {
    const { container } = render(<OfferFeatures type="studio" />);

    const typeItem = container.querySelector('.offer__feature--entire');
    expect(typeItem).toBeInTheDocument();
    expect(typeItem?.tagName).toBe('LI');
  });

  it('should render bedrooms feature when provided', () => {
    render(<OfferFeatures type="apartment" bedrooms={3} />);

    const bedroomsFeature = screen.getByText('3 Bedrooms');
    expect(bedroomsFeature).toBeInTheDocument();
    expect(bedroomsFeature).toHaveClass('offer__feature');
    expect(bedroomsFeature).toHaveClass('offer__feature--bedrooms');
  });

  it('should not render bedrooms feature when not provided', () => {
    render(<OfferFeatures type="apartment" />);

    const bedroomsFeature = screen.queryByText(/Bedrooms/);
    expect(bedroomsFeature).not.toBeInTheDocument();
  });

  it('should not render bedrooms feature when bedrooms is 0', () => {
    render(<OfferFeatures type="apartment" bedrooms={0} />);

    const bedroomsFeature = screen.queryByText(/Bedrooms/);
    expect(bedroomsFeature).not.toBeInTheDocument();
  });

  it('should render maxAdults feature when provided', () => {
    render(<OfferFeatures type="apartment" maxAdults={4} />);

    const adultsFeature = screen.getByText('Max 4 adults');
    expect(adultsFeature).toBeInTheDocument();
    expect(adultsFeature).toHaveClass('offer__feature');
    expect(adultsFeature).toHaveClass('offer__feature--adults');
  });

  it('should not render maxAdults feature when not provided', () => {
    render(<OfferFeatures type="apartment" />);

    const adultsFeature = screen.queryByText(/Max/);
    expect(adultsFeature).not.toBeInTheDocument();
  });

  it('should not render maxAdults feature when maxAdults is 0', () => {
    render(<OfferFeatures type="apartment" maxAdults={0} />);

    const adultsFeature = screen.queryByText(/Max/);
    expect(adultsFeature).not.toBeInTheDocument();
  });

  it('should render all features when all props provided', () => {
    const { container } = render(
      <OfferFeatures type="apartment" bedrooms={2} maxAdults={5} />
    );

    const features = container.querySelectorAll('li.offer__feature');
    expect(features).toHaveLength(3);
  });

  it('should render only type feature when optional props not provided', () => {
    const { container } = render(<OfferFeatures type="studio" />);

    const features = container.querySelectorAll('li.offer__feature');
    expect(features).toHaveLength(1);
  });

  it('should render type and bedrooms when maxAdults not provided', () => {
    const { container } = render(
      <OfferFeatures type="apartment" bedrooms={3} />
    );

    const features = container.querySelectorAll('li.offer__feature');
    expect(features).toHaveLength(2);
  });

  it('should render type and maxAdults when bedrooms not provided', () => {
    const { container } = render(
      <OfferFeatures type="apartment" maxAdults={2} />
    );

    const features = container.querySelectorAll('li.offer__feature');
    expect(features).toHaveLength(2);
  });

  it('should render correct type values', () => {
    const { rerender } = render(<OfferFeatures type="room" />);

    expect(screen.getByText('room')).toBeInTheDocument();

    rerender(<OfferFeatures type="house" />);
    expect(screen.getByText('house')).toBeInTheDocument();
  });

  it('should render correct bedroom counts', () => {
    const { rerender } = render(
      <OfferFeatures type="apartment" bedrooms={1} />
    );

    expect(screen.getByText('1 Bedrooms')).toBeInTheDocument();

    rerender(<OfferFeatures type="apartment" bedrooms={5} />);
    expect(screen.getByText('5 Bedrooms')).toBeInTheDocument();
  });

  it('should render correct adult counts', () => {
    const { rerender } = render(
      <OfferFeatures type="apartment" maxAdults={2} />
    );

    expect(screen.getByText('Max 2 adults')).toBeInTheDocument();

    rerender(<OfferFeatures type="apartment" maxAdults={6} />);
    expect(screen.getByText('Max 6 adults')).toBeInTheDocument();
  });

  it('should render features in correct order', () => {
    const { container } = render(
      <OfferFeatures type="apartment" bedrooms={3} maxAdults={4} />
    );

    const features = container.querySelectorAll('li.offer__feature');
    expect(features[0]).toHaveTextContent('apartment');
    expect(features[1]).toHaveTextContent('3 Bedrooms');
    expect(features[2]).toHaveTextContent('Max 4 adults');
  });

  it('should render bedrooms as list item', () => {
    const { container } = render(
      <OfferFeatures type="apartment" bedrooms={2} />
    );

    const bedroomsItem = container.querySelector('.offer__feature--bedrooms');
    expect(bedroomsItem?.tagName).toBe('LI');
  });

  it('should render maxAdults as list item', () => {
    const { container } = render(
      <OfferFeatures type="apartment" maxAdults={3} />
    );

    const adultsItem = container.querySelector('.offer__feature--adults');
    expect(adultsItem?.tagName).toBe('LI');
  });
});
