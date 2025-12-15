import { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsLoading, selectAuthError } from '../store/selectors';
import type { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { validateEmail } from '../utils/validateEmail';
import { validatePassword } from '../utils/validatePassword';
interface ValidationErrors {
  email?: string;
  password?: string;
}

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      errors.password =
        'Password must contain at least one letter and one digit';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleInputChange = useCallback(
    (field: 'email' | 'password', value: string) => {
      if (field === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }

      if (validationErrors[field]) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    },
    [validationErrors]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      void dispatch(login({ email, password }))
        .then((result) => {
          if (login.fulfilled.match(result)) {
            navigate('/');
          }
        })
        .catch(() => {});
    },
    [email, password, validateForm, dispatch, navigate]
  );

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {error && <p className="login__error">{error}</p>}
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={isLoading}
                />
                {validationErrors.email && (
                  <p className="input-error">{validationErrors.email}</p>
                )}
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)}
                  required
                  disabled={isLoading}
                />
                {validationErrors.password && (
                  <p className="input-error">{validationErrors.password}</p>
                )}
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
