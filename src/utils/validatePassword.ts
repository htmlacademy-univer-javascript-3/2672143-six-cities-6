import {
  PASSWORD_DIGIT_REGEX,
  PASSWORD_LETTER_REGEX,
} from '../constants/regex-const';

export const validatePassword = (passwordValue: string): boolean => {
  const hasLetter = PASSWORD_LETTER_REGEX.test(passwordValue);
  const hasDigit = PASSWORD_DIGIT_REGEX.test(passwordValue);
  return hasLetter && hasDigit && passwordValue.length > 0;
};
