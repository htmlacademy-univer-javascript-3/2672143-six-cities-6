import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../store/selectors';
import { Container } from './ui/container/container';
import { Navigation } from './ui/navigation/navigation';

export const Header: React.FC = (): React.ReactElement => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to="/"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {isAuthorized ? (
            <>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link header__favorites-link"
                      type="button"
                      onClick={handleFavoritesClick}
                    >
                      <span className="header__favorites-text">Favorites</span>
                    </button>
                  </li>
                </ul>
              </nav>
              <Navigation />
            </>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signin">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};
