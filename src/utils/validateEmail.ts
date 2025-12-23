import { EMAIL_REGEX } from '../constants/regex-const';

export const validateEmail = (emailValue: string): boolean =>
  EMAIL_REGEX.test(emailValue);
