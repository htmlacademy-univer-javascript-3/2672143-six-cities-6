import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Header } from '..';
import { authReducer } from '../../../store/slices/authSlice';
import { AuthorizationStatus } from '../../../enums/AuthorizationStatus';
import type { AuthState } from '../../../types/AuthState';
import type { AuthInfo } from '../../../types/AuthInfo';

const mockUser: AuthInfo = {
  email: 'user@example.com',
  token: 'test-token',
  avatarUrl: 'https://example.com/avatar.jpg',
  name: '',
  isPro: false,
};

const createTestStore = (isAuthorized: boolean, user: AuthInfo | null = null) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        authorizationStatus: isAuthorized
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.NoAuth,
        user: isAuthorized ? user : null,
        isLoading: false,
        error: null,
      } as AuthState,
    },
  });

const renderWithProviders = (
  component: React.ReactElement,
  isAuthorized: boolean = false,
  user: AuthInfo | null = null
) => {
  const store = createTestStore(isAuthorized, user);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Header', () => {
  it('should render header element', () => {
    const { container } = renderWithProviders(<Header />);

    const header = container.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  it('should render logo link', () => {
    renderWithProviders(<Header />);

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('header__logo-link');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render logo image with correct attributes', () => {
    const { container } = renderWithProviders(<Header />);

    const logo = container.querySelector('.header__logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('alt', '6 cities logo');
    expect(logo).toHaveAttribute('width', '81');
    expect(logo).toHaveAttribute('height', '41');
  });

  it('should render Sign in link when not authorized', () => {
    renderWithProviders(<Header />, false);

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
  });

  it('should render Favorites button when authorized', () => {
    renderWithProviders(<Header />, true);

    const favoritesButton = screen.getByRole('button', { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();
    expect(favoritesButton).toHaveClass('header__favorites-link');
  });

  it('should render Navigation component when authorized', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const navLinks = container.querySelectorAll('.header__nav');
    expect(navLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('should not render Navigation component when not authorized', () => {
    const { container } = renderWithProviders(<Header />, false);

    const navItems = container.querySelectorAll('.user');
    expect(navItems).toHaveLength(0);
  });

  it('should have correct header wrapper structure', () => {
    const { container } = renderWithProviders(<Header />);

    const wrapper = container.querySelector('.header__wrapper');
    const leftSection = wrapper?.querySelector('.header__left');

    expect(wrapper).toBeInTheDocument();
    expect(leftSection).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('should render navigation nav element', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const navs = container.querySelectorAll('.header__nav');
    expect(navs.length).toBeGreaterThan(0);
  });

  it('should render user profile section', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const userItem = container.querySelector('.user');
    expect(userItem).toBeInTheDocument();
  });

  it('should render Sign out button', () => {
    renderWithProviders(<Header />, true, mockUser);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveClass('header__nav-link');
  });

  it('should render user email in header', () => {
    renderWithProviders(<Header />, true, mockUser);

    const userName = screen.getByText(mockUser.email);
    expect(userName).toBeInTheDocument();
  });

  it('should render profile link', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const profileLink = container.querySelector('.header__nav-link--profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '#');
  });

  it('should render avatar wrapper', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const avatarWrapper = container.querySelector('.header__avatar-wrapper');
    expect(avatarWrapper).toBeInTheDocument();
  });

  it('should have Sign out button with correct styles', () => {
    renderWithProviders(<Header />, true, mockUser);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toHaveStyle('background: none');
    expect(signOutButton).toHaveStyle('cursor: pointer');
    expect(signOutButton).toHaveStyle('padding: 0');
  });

  it('should render nav list with correct items', () => {
    const { container } = renderWithProviders(<Header />, true, mockUser);

    const navItems = container.querySelectorAll('.header__nav-item');
    expect(navItems.length).toBeGreaterThanOrEqual(2);
  });
});
