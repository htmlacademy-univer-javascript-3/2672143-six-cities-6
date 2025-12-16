import { AuthorizationStatus } from '../enums/AuthorizationStatus';
import { AuthInfo } from './AuthInfo';

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  isLoading: boolean;
  error: string | null;
};
