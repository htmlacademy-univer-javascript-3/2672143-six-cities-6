import { AuthorizationStatus } from '../../enums/authorization-status';
import { RootState } from '../index';

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus;

export const selectIsAuthorized = (state: RootState): boolean =>
  state.auth.authorizationStatus === AuthorizationStatus.Auth;

export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;
