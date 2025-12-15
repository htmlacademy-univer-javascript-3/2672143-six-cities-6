import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchReviews,
  submitReview,
} from '../store/slices/offersSlice';
import {
  selectOffer,
  selectNearbyOffers,
  selectReviews,
  selectOfferIsLoading,
  selectOfferIsSubmittingReview,
  selectOfferError,
  selectIsAuthorized,
} from '../store/selectors';
import { ReviewForm } from '../components/ReviewForm/ReviewForm';
import { ReviewsList } from '../components/ReviewsList/ReviewsList';
import { NearPlaces } from '../components/NearPlaces/NearPlaces';
import { Map } from '../components/Map/Map';
import { Header } from '../components/Header';

export const OfferPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const offer = useSelector(selectOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const reviews = useSelector(selectReviews);
  const isLoading = useSelector(selectOfferIsLoading);
  const isSubmittingReview = useSelector(selectOfferIsSubmittingReview);
  const error = useSelector(selectOfferError);
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (!id) {
      return;
    }

    void dispatch(fetchOfferById(id)).then((result) => {
      if (fetchOfferById.fulfilled.match(result)) {
        void dispatch(fetchNearbyOffers(id));
        void dispatch(fetchReviews(id));
      }
    });
  }, [id, dispatch]);

  const handleReviewSubmit = (rating: number, comment: string): void => {
    if (!id) {
      return;
    }

    void dispatch(submitReview({ offerId: id, rating, comment }));
  };

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <div
            className="container"
            style={{ textAlign: 'center', padding: '40px' }}
          >
            <p>Loading offer...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !offer) {
    return <Navigate to="/not-found" />;
  }

  const {
    title,
    type,
    price,
    isPremium,
    rating,
    images,
    bedrooms,
    maxAdults,
    goods,
    host,
  } = offer;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer offer-page">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(images || []).map((image: string) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                {bedrooms && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                )}
                {maxAdults && (
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
                  </li>
                )}
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              {goods && goods.length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((item: string) => (
                      <li key={item} className="offer__inside-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={host.avatarUrl}
                        width="74"
                        height="74"
                        alt={`Host ${host.name}`}
                      />
                    </div>
                    <span className="offer__user-name">{host.name}</span>
                    {host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                </div>
              )}

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

        <section className="offer__map ">
          <Map offers={nearbyOffers} />
        </section>

        {nearbyOffers.length > 0 && <NearPlaces offers={nearbyOffers} />}
      </main>
    </div>
  );
};
