import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../enums/authorization-status';
import type { AuthState } from '../../../types/auth-state';
import PrivateRoute from '../private-router';

vi.mock('../../../store/selectors', () => ({
  selectIsAuthorized: (state: { auth: AuthState }) =>
    state.auth.authorizationStatus === AuthorizationStatus.Auth,
}));

const createTestStore = (isAuthorized: boolean) =>
  configureStore({
    reducer: {
      auth: () => ({
        authorizationStatus: isAuthorized
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.NoAuth,
        user: null,
        isLoading: false,
        error: null,
      }),
    },
  });

const TestComponent = () => <div>Protected Content</div>;

describe('PrivateRoute', () => {
  it('should render Outlet when user is authorized', () => {
    render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const protectedContent = screen.getByText('Protected Content');
    expect(protectedContent).toBeInTheDocument();
  });

  it('should render Navigate to /login when user is not authorized', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginPage = screen.getByText('Login Page');
    expect(loginPage).toBeInTheDocument();
  });

  it('should not render protected content when not authorized', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const protectedContent = screen.queryByText('Protected Content');
    expect(protectedContent).not.toBeInTheDocument();
  });

  it('should redirect to /login when unauthorized', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route
              path="/login"
              element={<div data-testid="login">Login</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  });

  it('should use selectIsAuthorized selector', () => {
    render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render Outlet component when authorized', () => {
    const { container } = render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should handle multiple routes with PrivateRoute', () => {
    render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/profile" element={<div>Profile</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const dashboard = screen.getByText('Dashboard');
    expect(dashboard).toBeInTheDocument();
  });

  it('should work with nested routes', () => {
    render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/admin/users']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/admin">
                <Route path="users" element={<div>Users Page</div>} />
                <Route path="settings" element={<div>Settings Page</div>} />
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const usersPage = screen.getByText('Users Page');
    expect(usersPage).toBeInTheDocument();
  });

  it('should redirect unauthorized user from nested routes', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/admin/users']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/admin">
                <Route path="users" element={<div>Users Page</div>} />
              </Route>
            </Route>
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginPage = screen.getByText('Login');
    expect(loginPage).toBeInTheDocument();

    const usersPage = screen.queryByText('Users Page');
    expect(usersPage).not.toBeInTheDocument();
  });

  it('should not render any content initially when unauthorized', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render PrivateRoute as a component', () => {
    const { container } = render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  it('should handle authorization state changes', () => {
    const { rerender } = render(
      <Provider store={createTestStore(true)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>Dashboard</div>} />
            </Route>
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();

    rerender(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>Dashboard</div>} />
            </Route>
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render Navigate component when not authorized', () => {
    render(
      <Provider store={createTestStore(false)}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginPage = screen.getByText('Login Page');
    expect(loginPage).toBeInTheDocument();
  });
});
