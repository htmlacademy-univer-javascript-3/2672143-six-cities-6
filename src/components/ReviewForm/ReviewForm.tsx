import React, { useState, useCallback } from 'react';
import './ReviewForm.css';
import {
  RATING_TITLES,
  RATING_VALUES,
  REVIEW_VALIDATION,
} from '../../constants/review';
import { RatingInput } from './ui/RatingInput';

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => void;
  isLoading?: boolean;
};

export const ReviewForm: React.FC<ReviewFormProps> = (
  props: ReviewFormProps
) => {
  const { onSubmit, isLoading } = props;
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ comment?: string }>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: { comment?: string } = {};

    if (!comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (comment.length < REVIEW_VALIDATION.minLength) {
      newErrors.comment = `Comment must be at least ${REVIEW_VALIDATION.minLength} characters`;
    } else if (comment.length > REVIEW_VALIDATION.maxLength) {
      newErrors.comment = `Comment must not exceed ${REVIEW_VALIDATION.maxLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [comment]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      onSubmit(rating, comment);
      setComment('');
      setRating(5);
    },
    [rating, comment, validateForm, onSubmit]
  );

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      if (errors.comment) {
        setErrors((prev) => ({ ...prev, comment: undefined }));
      }
    },
    [errors.comment]
  );

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label">
        <span className="reviews__rating-label">Your rating</span>
        <div className="reviews__rating-form form__rating">
          {RATING_VALUES.map((star) => (
            <RatingInput
              key={star}
              star={star}
              isChecked={rating === star}
              isDisabled={isLoading}
              title={RATING_TITLES[star]}
              onChange={setRating}
            />
          ))}
        </div>
      </label>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isLoading}
      />
      {errors.comment && <p className="review-error">{errors.comment}</p>}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {REVIEW_VALIDATION.minLength} characters
          </b>
          .
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
