import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, SortType } from '../../store/slices/sortingSlice';
import { selectSortType } from '../../store/selectors';
import styles from './Sort.module.css';

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: low to high', value: 'priceLow' },
  { label: 'Price: high to low', value: 'priceHigh' },
  { label: 'Top rated first', value: 'rating' },
];

export const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(selectSortType);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSortChange = (sortType: SortType) => {
    dispatch(setSortType(sortType));
    setIsOpen(false);
  };

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || 'Popular';

  return (
    <form className={styles.sort}>
      <span className={styles.sortTitle}>Sort by</span>
      <div className={styles.sortOptions}>
        <button
          className={styles.sortButton}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {currentLabel}
          <svg
            className={styles.sortArrow}
            width="7"
            height="4"
            viewBox="0 0 7 4"
            fill="none"
          >
            <path
              d="M1 1L3.5 3L6 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.sortDropdown}>
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  className={`${styles.sortOption} ${
                    currentSort === option.value ? styles.sortOptionActive : ''
                  }`}
                  type="button"
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};
