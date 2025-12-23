import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { LoginCitySuggestion } from '../LoginCitySuggestion';
import storeReducer from '../../../store/reducer';

const createTestStore = () =>
  configureStore({
    reducer: {
      store: storeReducer,
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

describe('LoginCitySuggestion', () => {
  it('should render button with city name', () => {
    renderWithProviders(<LoginCitySuggestion />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('locations__item-link');
  });

  it('should render section with correct structure', () => {
    const { container } = renderWithProviders(<LoginCitySuggestion />);

    const section = container.querySelector('.locations');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('locations--login');
    expect(section).toHaveClass('locations--current');
  });

  it('should render city name inside span', () => {
    renderWithProviders(<LoginCitySuggestion />);

    const button = screen.getByRole('button');
    const span = button.querySelector('span');

    expect(span).toBeInTheDocument();
    expect(span?.textContent).toBeTruthy();
  });

  it('should render one city suggestion', () => {
    renderWithProviders(<LoginCitySuggestion />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('should have button with type="button"', () => {
    renderWithProviders(<LoginCitySuggestion />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
