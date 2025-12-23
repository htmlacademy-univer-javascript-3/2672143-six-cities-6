import { render, screen } from '@testing-library/react';
import { OfferGoodsList } from '../OfferGoodsList';

describe('OfferGoodsList', () => {
  it('should return null when goods array is empty', () => {
    const { container } = render(<OfferGoodsList goods={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when goods is undefined', () => {
    const { container } = render(<OfferGoodsList goods={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render all goods', () => {
    const goods = ['Wi-Fi', 'Washing machine', 'Kitchen'];
    render(<OfferGoodsList goods={goods} />);

    // eslint-disable-next-line quotes
    expect(screen.getByText("What's inside")).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Washing machine')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
  });

  it('should render goods list with correct structure', () => {
    const goods = ['Air conditioning', 'Laptop friendly workspace'];
    render(<OfferGoodsList goods={goods} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Air conditioning');
    expect(listItems[1]).toHaveTextContent('Laptop friendly workspace');
  });

  it('should render single good item', () => {
    const goods = ['Wi-Fi'];
    render(<OfferGoodsList goods={goods} />);

    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
