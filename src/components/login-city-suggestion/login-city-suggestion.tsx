import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cities } from '../../mocs/cities';
import { changeCity } from '../../store/reducer';
import type { AppDispatch } from '../../store';

export const LoginCitySuggestion: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }, []);

  const handleCityClick = useCallback(() => {
    dispatch(changeCity(randomCity));
    navigate('/');
  }, [randomCity, dispatch, navigate]);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <button
          className="locations__item-link"
          type="button"
          onClick={handleCityClick}
        >
          <span>{randomCity.name}</span>
        </button>
      </div>
    </section>
  );
};
