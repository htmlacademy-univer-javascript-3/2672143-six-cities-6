import React from 'react';
import { Review } from '../../types/review';

type ReviewsListProps = {
  reviews: Review[];
};

export const ReviewsList: React.FC<ReviewsListProps> = (
  props: ReviewsListProps
) => {
  const { reviews } = props;
  return (
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
                  src={review.user.avatarUrl}
                  width="54"
                  height="54"
                  alt={`${review.user.name}'s avatar`}
                />
              </div>
              <span className="reviews__user-name">{review.user.name}</span>
              {review.user.isPro && (
                <span className="reviews__user-status">Pro</span>
              )}
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${(review.rating / 5) * 100}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="reviews__rating-value">{review.rating}</span>
              </div>
              <p className="reviews__text">{review.comment}</p>
              <time className="reviews__time" dateTime={review.date}>
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
