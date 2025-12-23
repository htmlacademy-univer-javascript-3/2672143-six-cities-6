import { AuthorizationStatus } from '../enums/authorization-status';
import { AuthInfo } from './auth-info';

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  isLoading: boolean;
  error: string | null;
};
