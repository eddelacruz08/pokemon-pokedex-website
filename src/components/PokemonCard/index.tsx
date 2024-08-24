import React from 'react';

import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';

import { PokemonCardProps } from '@/app/constants';

import clsx from 'clsx';

import styles from '@/components/PokemonCard/PokemonCard.module.css';
import Box from '@mui/material/Box';

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  imageUrl,
  view,
  onCapture,
  isCaptured,
  onViewDetails,
}) => {
  return (
    <div
      onClick={isCaptured ? onViewDetails : () => {}}
      className={clsx(
        styles.card,
        view === 'list' ? styles.cardViewList : styles.cardViewGrid,
        isCaptured
          ? styles.cardIsCaptured + ` bg-green-600 dark:bg-green-700`
          : styles.cardIsNotCaptured + ` bg-gray-600 dark:bg-gray-700`,
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className={clsx(view === 'list' ? styles.cardImageList : styles.cardImageGrid)}
      />
      <h3
        className={clsx(
          'dark:text-white',
          view === 'list' ? styles.cardNameList : styles.cardNameGrid,
        )}
      >
        {name}
      </h3>

      {!isCaptured ? (
        <button
          className={clsx(
            styles.cardButton,
            isCaptured ? styles.cardButtonIsCaptured : styles.cardButtonIsNotCaptured,
          )}
          onClick={onCapture}
          disabled={isCaptured}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              src={'/lock.png'}
              alt={'Pokemon Ball'}
              className={clsx(styles.icon, 'dark:text-white')}
            />
            &nbsp; <p>Tag as Captured</p>
          </Box>
        </button>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={'/pokeball.png'}
            alt={'Pokemon Ball'}
            className={clsx(styles.icon, 'dark:text-white')}
          />
        </Box>
      )}
    </div>
  );
};

export default PokemonCard;
