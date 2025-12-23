import React, { useCallback } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import { submitReview } from '../store/slices/offersSlice';

import { ReviewForm } from '../components/ReviewForm/ReviewForm';
import { ReviewsList } from '../components/ReviewsList/ReviewsList';
import { NearPlaces } from '../components/NearPlaces/NearPlaces';
import { Map } from '../components/Map/Map';
import { Header } from '../components/Header';
import { OfferGallery } from '../components/OfferGallery/OfferGallery';
import { OfferFeatures } from '../components/OfferFeatures/OfferFeatures';
import { OfferGoodsList } from '../components/OfferGoodsList/OfferGoodsList';
import { OfferHost } from '../components/OfferHost/OfferHost';
import { selectOfferPageData } from '../store/selectors';
import { useLoadOfferData } from '../hooks/useLoadOfferData';
import { toggleFavorite } from '../store/slices/favoriteSlice';

export const OfferPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useLoadOfferData({ id });

  const dispatch = useDispatch<AppDispatch>();

  const {
    offer,
    nearbyOffers,
    reviews,
    isLoading,
    isSubmittingReview,
    error,
    isAuthorized,
  } = useSelector(selectOfferPageData);

  const handleReviewSubmit = useCallback(
    (rating: number, comment: string): void => {
      if (!id) {
        return;
      }

      void dispatch(submitReview({ offerId: id, rating, comment }));
    },
    [id, dispatch]
  );

  const handleFavoriteClick = useCallback(() => {
    if (!isAuthorized) {
      navigate('/login');
      return;
    }

    if (!id || !offer) {
      return;
    }

    void dispatch(
      toggleFavorite({
        offerId: id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  }, [id, offer, isAuthorized, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <div className="loading-container">
            <p>Loading offer...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !offer) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer offer-page">
          <div className="offer__gallery-container container">
            <OfferGallery images={offer.images} />
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>

              <OfferFeatures
                type={offer.type}
                bedrooms={offer.bedrooms}
                maxAdults={offer.maxAdults}
              />

              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <OfferGoodsList goods={offer.goods} />

              {offer.host && <OfferHost host={offer.host} />}

              {reviews && reviews.length > 0 && (
                <ReviewsList reviews={reviews} />
              )}

              {isAuthorized && (
                <ReviewForm
                  onSubmit={handleReviewSubmit}
                  isLoading={isSubmittingReview}
                />
              )}
            </div>
          </div>
        </section>

        <section className="offer__map">
          <Map offers={nearbyOffers} />
        </section>

        {nearbyOffers.length > 0 && <NearPlaces offers={nearbyOffers} />}
      </main>
    </div>
  );
};
