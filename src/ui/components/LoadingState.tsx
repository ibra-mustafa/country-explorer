import React from 'react';
import styles from './LoadingState.module.css';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default LoadingState;