import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReviewForm } from '../review-form';
import { REVIEW_VALIDATION } from '../../../constants/review';

const mockOnSubmit = vi.fn();

const renderReviewForm = (props = {}) => {
  const defaultProps = {
    onSubmit: mockOnSubmit,
    isLoading: false,
    ...props,
  };
  return render(<ReviewForm {...defaultProps} />);
};

describe('ReviewForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form with correct class', () => {
    const { container } = renderReviewForm();

    const form = container.querySelector('.reviews__form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('form');
  });

  it('should render rating label', () => {
    renderReviewForm();

    const ratingLabel = screen.getByText('Your rating');
    expect(ratingLabel).toBeInTheDocument();
    expect(ratingLabel).toHaveClass('reviews__rating-label');
  });

  it('should render textarea with correct attributes', () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('reviews__textarea');
    expect(textarea).toHaveAttribute('id', 'review');
    expect(textarea).toHaveAttribute('name', 'review');
  });

  it('should render submit button', () => {
    renderReviewForm();

    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('reviews__submit');
  });

  it('should render help text with validation info', () => {
    renderReviewForm();

    const helpText = screen.getByText(/To submit review please make sure/);
    expect(helpText).toBeInTheDocument();
    expect(helpText).toHaveClass('reviews__help');
  });

  it('should display minimum characters requirement in help text', () => {
    renderReviewForm();

    const minChars = screen.getByText(
      new RegExp(REVIEW_VALIDATION.minLength.toString())
    );
    expect(minChars).toBeInTheDocument();
    expect(minChars).toHaveClass('reviews__text-amount');
  });

  it('should initialize with rating 5', () => {
    const { container } = renderReviewForm();

    const ratingInputs = container.querySelectorAll(
      'input[type="radio"][name="rating"]'
    );
    const defaultRating = Array.from(ratingInputs).find(
      (input: Element) => (input as HTMLInputElement).value === '5'
    ) as HTMLInputElement;

    expect(defaultRating?.checked).toBe(true);
  });

  it('should initialize with empty comment', () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    expect(textarea).toHaveValue('');
  });

  it('should show error when submitting empty comment', async () => {
    renderReviewForm();

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      const error = screen.getByText('Comment is required');
      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('review-error');
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error when comment is too short', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const shortComment = 'a'.repeat(REVIEW_VALIDATION.minLength - 1);

    await userEvent.type(textarea, shortComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      const error = screen.getByText(
        new RegExp(`at least ${REVIEW_VALIDATION.minLength} characters`)
      );
      expect(error).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error when comment exceeds max length', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const longComment = 'a'.repeat(REVIEW_VALIDATION.maxLength + 1);

    await userEvent.type(textarea, longComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      const error = screen.getByText(
        new RegExp(`not exceed ${REVIEW_VALIDATION.maxLength} characters`)
      );
      expect(error).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const validComment = 'a'.repeat(REVIEW_VALIDATION.minLength);

    await userEvent.type(textarea, validComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(5, validComment);
    });
  });

  it('should clear form after successful submission', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const validComment = 'a'.repeat(REVIEW_VALIDATION.minLength);

    await userEvent.type(textarea, validComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  });

  it('should reset rating to 5 after submission', async () => {
    const { container } = renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const validComment = 'a'.repeat(REVIEW_VALIDATION.minLength);

    const ratingInputs = container.querySelectorAll(
      'input[type="radio"][name="rating"]'
    );
    const rating1 = ratingInputs[0] as HTMLInputElement;

    fireEvent.click(rating1);
    await userEvent.type(textarea, validComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      const rating5 = Array.from(ratingInputs).find(
        (input: Element) => (input as HTMLInputElement).value === '5'
      ) as HTMLInputElement;
      expect(rating5.checked).toBe(true);
    });
  });

  it('should clear error when typing after validation error', async () => {
    renderReviewForm();

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Comment is required')).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    await userEvent.type(textarea, 'a');

    await waitFor(() => {
      expect(screen.queryByText('Comment is required')).not.toBeInTheDocument();
    });
  });

  it('should disable form elements when loading', () => {
    renderReviewForm({ isLoading: true });

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const button = screen.getByRole('button');

    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('should show "Submitting..." button text when loading', () => {
    renderReviewForm({ isLoading: true });

    const button = screen.getByRole('button', { name: /Submitting/i });
    expect(button).toBeInTheDocument();
  });

  it('should disable rating inputs when loading', () => {
    const { container } = renderReviewForm({ isLoading: true });

    const ratingInputs = container.querySelectorAll(
      'input[type="radio"][name="rating"]'
    );
    ratingInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('should accept valid comment at minimum length', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const minComment = 'a'.repeat(REVIEW_VALIDATION.minLength);

    await userEvent.type(textarea, minComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(5, minComment);
    });
  });

  it('should accept valid comment at maximum length', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const maxComment = 'a'.repeat(REVIEW_VALIDATION.maxLength);

    await userEvent.type(textarea, maxComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(5, maxComment);
    });
  });

  it('should allow changing rating', async () => {
    const { container } = renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const validComment = 'a'.repeat(REVIEW_VALIDATION.minLength);

    const ratingInputs = container.querySelectorAll(
      'input[type="radio"][name="rating"]'
    );
    const rating3 = ratingInputs[2] as HTMLInputElement;

    fireEvent.click(rating3);
    await userEvent.type(textarea, validComment);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(3, validComment);
    });
  });

  it('should have correct textarea class and id', () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    expect(textarea).toHaveClass('reviews__textarea');
    expect(textarea).toHaveClass('form__textarea');
  });

  it('should render RatingInput components', () => {
    const { container } = renderReviewForm();

    const ratingInputs = container.querySelectorAll(
      'input[type="radio"][name="rating"]'
    );
    expect(ratingInputs.length).toBeGreaterThan(0);
  });

  it('should not submit when validation fails', async () => {
    renderReviewForm();

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Comment is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle whitespace-only comment as empty', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    await userEvent.type(textarea, '     ');

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Comment is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should update textarea value on input', async () => {
    renderReviewForm();

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/);
    const testText = 'This is a test review comment';

    await userEvent.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  });
});
