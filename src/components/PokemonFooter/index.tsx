import React from 'react';

import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

import { PokemonFooterProps } from '@/app/constants';

import clsx from 'clsx';

import styles from '@/components/PokemonFooter/PokemonFooter.module.css';

const PokemonFooter: React.FC<PokemonFooterProps> = ({
  filter,
  setFilter,
  handlePageChange,
  page,
  totalPages,
}) => {
  return (
    <>
      <div className={clsx(styles.pagination)}>
        <button
          className={clsx(styles.paginationButton)}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <WestIcon />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={clsx(styles.paginationButton)}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <EastIcon />
        </button>
      </div>
      <div className={clsx(styles.card, 'dark:bg-gray-800')}>
        <button
          className={clsx(filter === 'all' ? styles.all : styles.captured)}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={clsx(filter === 'captured' ? styles.all : styles.captured)}
          onClick={() => setFilter('captured')}
        >
          <CatchingPokemonOutlinedIcon />
          &nbsp;Captured
        </button>
      </div>
    </>
  );
};

export default PokemonFooter;
