// src/components/ui/SearchInput.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './SearchInput.module.css';

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  isLoading = false,
  className = ''
}) => {
  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <i className={`bi bi-search ${styles.iconLeft}`}></i>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isLoading ? (
        <Spinner animation="border" size="sm" className={styles.iconRight} />
      ) : (
        value && (
          <button onClick={onClear} className={styles.clearButton}>
            <i className="bi bi-x-lg"></i>
          </button>
        )
      )}
    </div>
  );
};

export default SearchInput;

