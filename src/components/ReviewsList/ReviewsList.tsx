import React from 'react';

interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
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
            <span className="reviews__user-name">{review.user}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${(review.rating / 5) * 100}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{review.text}</p>
            <time className="reviews__time" dateTime={review.date}>
              {review.date}
            </time>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
