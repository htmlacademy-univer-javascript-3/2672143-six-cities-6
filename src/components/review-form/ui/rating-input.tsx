import React from 'react';

type RatingInputProps = {
  star: number;
  isChecked: boolean;
  isDisabled?: boolean;
  title: string;
  onChange: (value: number) => void;
};

export const RatingInput: React.FC<RatingInputProps> = (
  props: RatingInputProps
) => {
  const { star, isChecked, isDisabled, title, onChange } = props;
  return (
    <React.Fragment>
      <input
        className="form__rating-input visually-hidden"
        type="radio"
        id={`${star}-stars`}
        name="rating"
        value={star}
        checked={isChecked}
        onChange={() => onChange(star)}
        disabled={isDisabled}
      />
      <label
        htmlFor={`${star}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  );
};
