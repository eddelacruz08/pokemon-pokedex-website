import React from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import { PokemonHeaderProps } from '@/app/constants';

const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  setView,
  view,
}) => {
  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-center md:flex-row">
        <h1 className="mb-2 p-2 text-2xl font-bold md:mb-0 md:w-1/4">Gen 1 Pokedex</h1>
      </div>
      <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
        <input
          type="text"
          placeholder="Search Pokemon..."
          className="mb-2 rounded-md border border-gray-500 p-2 text-black dark:bg-gray-800 dark:text-white md:mb-0 md:w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setView('list')}
            className={`rounded-md border bg-gray-200 px-4 py-2 ${
              view === 'list'
                ? 'text-gray-800 dark:bg-gray-500 dark:text-white'
                : 'text-gray-500 dark:bg-gray-800 dark:text-white'
            } transition-colors`}
          >
            <FormatListBulletedIcon />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`rounded-md border bg-gray-200 px-4 py-2 ${
              view === 'grid'
                ? 'text-gray-800 dark:bg-gray-500 dark:text-white'
                : 'text-gray-500 dark:bg-gray-800 dark:text-white'
            } transition-colors`}
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
