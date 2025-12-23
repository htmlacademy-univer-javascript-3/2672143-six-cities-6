import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/slices/sortingSlice';
import { selectSortType } from '../../store/selectors';
import styles from './Sort.module.css';
import { SORT_OPTIONS } from '../../constants/sort-options';
import { ICONS } from '../../assets';

export const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(selectSortType);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = useMemo(
    () =>
      SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || 'Popular',
    [currentSort]
  );

  const handleSortChange = useCallback(
    (sortType: typeof currentSort) => {
      dispatch(setSortType(sortType));
      setIsOpen(false);
    },
    [dispatch]
  );

  return (
    <form className={styles.sort}>
      <span className={styles.sortTitle}>Sort by</span>
      <div className={styles.sortOptions} ref={dropdownRef}>
        <button
          className={styles.sortButton}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {currentLabel}
          <img
            src={ICONS.sortArrow}
            alt=""
            className={styles.sortArrow}
            aria-hidden="true"
          />
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
