import React from 'react';
import clsx from 'clsx';

import styles from '@/components/LoadingScreen/LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className={clsx(styles.isLoading)}>
      <img alt="pokemon" src="pokemon-23.svg" className="h-32" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
