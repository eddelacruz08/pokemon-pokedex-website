import React from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import { PokemonHeaderProps } from '@/app/constants';

import clsx from 'clsx';

import styles from '@/components/PokemonHeader/PokemonHeader.module.css';

const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  setView,
  view,
}) => {
  return (
    <>
      <div className={clsx(styles.titleImage)}>
        <img alt="pokemon" src="pokemon-23.svg" className="h-32" />
      </div>
      <div className={clsx(styles.title)}>
        <img
          src={'/pokeball.png'}
          alt={'Pokemon Ball'}
          className={clsx(styles.icon, 'dark:text-white')}
        />
        <p>Gen 1 Pokedex</p>
      </div>
      <div className={clsx(styles.body)}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          className="dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <button
            onClick={() => setView('list')}
            className={`${
              view === 'list'
                ? 'text-gray-800 dark:bg-gray-500 dark:text-white'
                : 'text-gray-500 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <FormatListBulletedIcon />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`${
              view === 'grid'
                ? 'text-gray-800 dark:bg-gray-500 dark:text-white'
                : 'text-gray-500 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <AppsIcon />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default PokemonHeader;
