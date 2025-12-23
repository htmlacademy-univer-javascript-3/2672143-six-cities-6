import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../../store/selectors';
import { logout } from '../../../../store/slices/authSlice';
import type { AppDispatch } from '../../../../store';

export const Navigation: React.FC = (): React.ReactElement => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    void dispatch(logout())
      .then(() => {
        navigate('/login');
      })
      .catch(() => {});
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {user?.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt="User avatar"
                  width="20"
                  height="20"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
            </div>
            <span className="header__user-name user__name">{user?.email}</span>
          </a>
        </li>
        <li className="header__nav-item">
          <button
            className="header__nav-link"
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              font: 'inherit',
              padding: '0',
            }}
          >
            <span className="header__signout">Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
