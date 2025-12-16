import { render, screen } from '@testing-library/react';
import { EmptyOffers } from '../ui/EmptyOffers';
import { EmptyOffersSection } from '../EmptyOfferSection';

describe('EmptyOffersSection', () => {
  it('should render EmptyOffers component with cityName prop', () => {
    render(<EmptyOffersSection cityName="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(
        /We could not find any property available at the moment in Paris/
      )
    ).toBeInTheDocument();
  });

  it('should render empty right section div', () => {
    const { container } = render(<EmptyOffersSection cityName="London" />);

    const rightSection = container.querySelector('.cities__right-section');
    expect(rightSection).toBeInTheDocument();
    expect(rightSection).toBeEmptyDOMElement();
  });

  it('should pass cityName to EmptyOffers component', () => {
    render(<EmptyOffersSection cityName="Berlin" />);

    expect(
      screen.getByText(
        /We could not find any property available at the moment in Berlin/
      )
    ).toBeInTheDocument();
  });
});

describe('EmptyOffers', () => {
  it('should render section with correct class', () => {
    const { container } = render(<EmptyOffers cityName="Paris" />);

    const section = container.querySelector('.cities__no-places');
    expect(section).toBeInTheDocument();
  });

  it('should render status wrapper with correct classes', () => {
    const { container } = render(<EmptyOffers cityName="Paris" />);

    const statusWrapper = container.querySelector('.cities__status-wrapper');
    expect(statusWrapper).toBeInTheDocument();
    expect(statusWrapper).toHaveClass('tabs__content');
  });

  it('should render "No places to stay available" text', () => {
    render(<EmptyOffers cityName="Paris" />);

    const statusText = screen.getByText('No places to stay available');
    expect(statusText).toBeInTheDocument();
    expect(statusText.tagName).toBe('B');
  });

  it('should render description with cityName', () => {
    render(<EmptyOffers cityName="Tokyo" />);

    expect(
      screen.getByText(
        /We could not find any property available at the moment in Tokyo/
      )
    ).toBeInTheDocument();
  });

  it('should render description as paragraph', () => {
    render(<EmptyOffers cityName="Paris" />);

    const description = screen.getByText(
      /We could not find any property available at the moment in Paris/
    );
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('cities__status-description');
  });

  it('should render correct structure', () => {
    const { container } = render(<EmptyOffers cityName="Paris" />);

    const section = container.querySelector('.cities__no-places');
    const wrapper = section?.querySelector('.cities__status-wrapper');
    const status = wrapper?.querySelector('b.cities__status');
    const description = wrapper?.querySelector('p.cities__status-description');

    expect(section).toBeInTheDocument();
    expect(wrapper).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
