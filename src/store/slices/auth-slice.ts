import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthInfo } from '../../types/auth-info';
import { AuthorizationStatus } from '../../enums/authorization-status';
import { AuthState } from '../../types/auth-state';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  {
    extra: AxiosInstance;
  }
>('auth/login', async ({ email, password }, { extra: api }) => {
  const response = await api.post<AuthInfo>('/login', { email, password });
  const authData: AuthInfo = response.data;
  const token: string = authData.token;

  localStorage.setItem('token', token);
  api.defaults.headers.common['X-Token'] = token;

  return authData;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('auth/logout', async (_, { extra: api }) => {
  await api.delete('/logout');

  localStorage.removeItem('token');
  delete api.defaults.headers.common['X-Token'];
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state: AuthState) => {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        state.authorizationStatus = AuthorizationStatus.Auth;
      } else {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export const { initializeAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
