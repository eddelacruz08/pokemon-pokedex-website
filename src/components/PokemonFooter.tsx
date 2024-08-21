import React from 'react';

import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';

import { PokemonFooterProps } from '@/app/constants';

const PokemonFooter: React.FC<PokemonFooterProps> = ({ filter, setFilter }) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 flex justify-evenly border-t border-gray-300 bg-white p-4 dark:bg-gray-800">
        <button
          className={`rounded-md border px-4 py-2 transition-colors ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'border-blue-500 bg-white text-blue-500 hover:bg-blue-100'
          }`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`rounded-md border px-4 py-2 transition-colors ${
            filter === 'captured'
              ? 'bg-blue-500 text-white'
              : 'border-blue-500 hover:bg-blue-100 dark:bg-white dark:text-blue-500'
          }`}
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
