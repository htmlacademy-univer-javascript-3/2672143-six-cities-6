import { render, screen } from '@testing-library/react';
import { OfferHost } from '../offer-host';
import type { Host } from '../../../types/host';

const mockHost: Host = {
  name: 'John Doe',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: true,
};

const mockHostNonPro: Host = {
  name: 'Jane Smith',
  avatarUrl: 'https://example.com/avatar2.jpg',
  isPro: false,
};

describe('OfferHost', () => {
  it('should render host container with correct class', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const hostDiv = container.querySelector('.offer__host');
    expect(hostDiv).toBeInTheDocument();
  });

  it('should render "Meet the host" title', () => {
    render(<OfferHost host={mockHost} />);

    const title = screen.getByText('Meet the host');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title).toHaveClass('offer__host-title');
  });

  it('should render host user div with correct classes', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const userDiv = container.querySelector('.offer__host-user');
    expect(userDiv).toBeInTheDocument();
    expect(userDiv).toHaveClass('user');
  });

  it('should render avatar wrapper with correct classes', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const avatarWrapper = container.querySelector('.offer__avatar-wrapper');
    expect(avatarWrapper).toBeInTheDocument();
    expect(avatarWrapper).toHaveClass('offer__avatar-wrapper--pro');
    expect(avatarWrapper).toHaveClass('user__avatar-wrapper');
  });

  it('should render avatar image with correct attributes', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const avatar = container.querySelector('.offer__avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockHost.avatarUrl);
    expect(avatar).toHaveAttribute('width', '74');
    expect(avatar).toHaveAttribute('height', '74');
    expect(avatar).toHaveAttribute('alt', `Host ${mockHost.name}`);
  });

  it('should render avatar image with correct classes', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const avatar = container.querySelector('.offer__avatar');
    expect(avatar).toHaveClass('offer__avatar');
    expect(avatar).toHaveClass('user__avatar');
  });

  it('should render host name', () => {
    render(<OfferHost host={mockHost} />);

    const name = screen.getByText(mockHost.name);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass('offer__user-name');
  });

  it('should render Pro status when host is Pro', () => {
    render(<OfferHost host={mockHost} />);

    const proStatus = screen.getByText('Pro');
    expect(proStatus).toBeInTheDocument();
    expect(proStatus).toHaveClass('offer__user-status');
  });

  it('should not render Pro status when host is not Pro', () => {
    render(<OfferHost host={mockHostNonPro} />);

    const proStatus = screen.queryByText('Pro');
    expect(proStatus).not.toBeInTheDocument();
  });

  it('should render correct alt text for avatar', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const avatar = container.querySelector('img');
    expect(avatar).toHaveAttribute('alt', `Host ${mockHost.name}`);
  });

  it('should render avatar image tag', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const avatar = container.querySelector('img');
    expect(avatar?.tagName).toBe('IMG');
  });

  it('should render correct structure hierarchy', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const hostDiv = container.querySelector('.offer__host');
    const title = hostDiv?.querySelector('.offer__host-title');
    const userDiv = hostDiv?.querySelector('.offer__host-user');
    const avatarWrapper = userDiv?.querySelector('.offer__avatar-wrapper');
    const avatar = avatarWrapper?.querySelector('img');

    expect(hostDiv).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(userDiv).toBeInTheDocument();
    expect(avatarWrapper).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it('should render name as span element', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const name = container.querySelector('.offer__user-name');
    expect(name?.tagName).toBe('SPAN');
  });

  it('should render Pro status as span element', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const proStatus = container.querySelector('.offer__user-status');
    expect(proStatus?.tagName).toBe('SPAN');
  });

  it('should render multiple elements in user div', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const userDiv = container.querySelector('.offer__host-user');
    const children = userDiv?.children;

    expect(children).toHaveLength(3);
  });

  it('should render two elements in user div when host is not Pro', () => {
    const { container } = render(<OfferHost host={mockHostNonPro} />);

    const userDiv = container.querySelector('.offer__host-user');
    const children = userDiv?.children;

    expect(children).toHaveLength(2);
  });

  it('should display different host names', () => {
    const { rerender } = render(<OfferHost host={mockHost} />);

    expect(screen.getByText(mockHost.name)).toBeInTheDocument();

    rerender(<OfferHost host={mockHostNonPro} />);
    expect(screen.getByText(mockHostNonPro.name)).toBeInTheDocument();
  });

  it('should display correct avatar for different hosts', () => {
    const { rerender, container } = render(<OfferHost host={mockHost} />);

    let avatar = container.querySelector('img');
    expect(avatar).toHaveAttribute('src', mockHost.avatarUrl);

    rerender(<OfferHost host={mockHostNonPro} />);
    avatar = container.querySelector('img');
    expect(avatar).toHaveAttribute('src', mockHostNonPro.avatarUrl);
  });

  it('should render avatar wrapper inside user div', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const userDiv = container.querySelector('.offer__host-user');
    const avatarWrapper = userDiv?.querySelector('.offer__avatar-wrapper');

    expect(avatarWrapper?.parentElement).toBe(userDiv);
  });

  it('should render name after avatar wrapper', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const userDiv = container.querySelector('.offer__host-user');
    const children = Array.from(userDiv?.children || []);
    const wrapperIndex = children.findIndex((child) =>
      child.classList.contains('offer__avatar-wrapper')
    );
    const nameIndex = children.findIndex((child) =>
      child.classList.contains('offer__user-name')
    );

    expect(nameIndex).toBeGreaterThan(wrapperIndex);
  });

  it('should render Pro status after name when isPro is true', () => {
    const { container } = render(<OfferHost host={mockHost} />);

    const userDiv = container.querySelector('.offer__host-user');
    const children = Array.from(userDiv?.children || []);
    const nameIndex = children.findIndex((child) =>
      child.classList.contains('offer__user-name')
    );
    const proIndex = children.findIndex((child) =>
      child.classList.contains('offer__user-status')
    );

    expect(proIndex).toBeGreaterThan(nameIndex);
  });

  it('should render host with Pro status true', () => {
    render(<OfferHost host={mockHost} />);

    const proStatus = screen.getByText('Pro');
    expect(proStatus).toBeInTheDocument();
  });

  it('should render host without Pro status', () => {
    render(<OfferHost host={mockHostNonPro} />);

    const hostDiv = screen.getByText(mockHostNonPro.name);
    expect(hostDiv).toBeInTheDocument();

    const proStatus = screen.queryByText('Pro');
    expect(proStatus).not.toBeInTheDocument();
  });
});
