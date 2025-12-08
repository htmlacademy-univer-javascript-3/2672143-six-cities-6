import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Offer } from '../types/Offer';
import { ReviewForm } from '../components/ReviewForm/ReviewForm';

type OfferPageProps = {
  offers: Offer[];
};

export const OfferPage: React.FC<OfferPageProps> = ({ offers }) => {
  const { id } = useParams<{ id: string }>();

  const offer = offers.find((o) => o.id === id);

  const [reviews, setReviews] = useState(offer?.reviews || []);

  if (!offer) {
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
    inside,
    host,
  } = offer;

  const handleReviewSubmit = (newRating: number, newText: string) => {
    const newReview = {
      id: `r${Date.now()}`,
      user: 'You',
      avatar: 'img/avatar-max.jpg',
      rating: newRating,
      text: newText,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setReviews([...reviews, newReview]);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(images || []).map((image) => (
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

              {inside && inside.length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {inside.map((item) => (
                      <li key={`${item}}`} className="offer__inside-item">
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
                        src={host.avatar}
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
                  <div className="offer__description">
                    <p className="offer__text">{host.description}</p>
                  </div>
                </div>
              )}

              {reviews && reviews.length > 0 && (
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ul className="reviews__list">
                    {reviews.map((review) => (
                      <li key={review.id} className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img
                              className="reviews__avatar user__avatar"
                              src={review.avatar}
                              width="54"
                              height="54"
                              alt={`${review.user}'s avatar`}
                            />
                          </div>
                          <span className="reviews__user-name">
                            {review.user}
                          </span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span
                                style={{
                                  width: `${(review.rating / 5) * 100}%`,
                                }}
                              >
                              </span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">{review.text}</p>
                          <time
                            className="reviews__time"
                            dateTime={review.date}
                          >
                            {review.date}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          </div>

          <section className="offer__map map"></section>
        </section>
      </main>
    </div>
  );
};
