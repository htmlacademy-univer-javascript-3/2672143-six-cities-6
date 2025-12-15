import React, { useState } from 'react';
import './ReviewForm.css';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

// Константа с маппингом рейтингов
const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ comment?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { comment?: string } = {};

    if (!comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (comment.length < 50) {
      newErrors.comment = 'Comment must be at least 50 characters';
    } else if (comment.length > 300) {
      newErrors.comment = 'Comment must not exceed 300 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(rating, comment);
    setComment('');
    setRating(5);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label">
        <span className="reviews__rating-label">Your rating</span>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                type="radio"
                id={`${star}-stars`}
                name="rating"
                value={star}
                checked={rating === star}
                onChange={() => setRating(star)}
                disabled={isLoading}
              />
              <label
                htmlFor={`${star}-stars`}
                className="reviews__rating-label form__rating-label"
                title={RATING_TITLES[star]}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>
      </label>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          if (errors.comment) {
            setErrors({ ...errors, comment: undefined });
          }
        }}
        disabled={isLoading}
      />
      {errors.comment && (
        <p style={{ color: '#ff5555', fontSize: '12px', marginTop: '5px' }}>
          {errors.comment}
        </p>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
