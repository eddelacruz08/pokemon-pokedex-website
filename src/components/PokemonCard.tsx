import React from 'react';

import { PokemonCardProps } from '@/app/constants';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  url,
  view,
  onCapture,
  isCaptured,
  onViewDetails,
}) => {
  const pokemonId = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  return (
    <div
      onClick={isCaptured ? onViewDetails : () => {}}
      className={`rounded-lg border p-4 shadow-md ${view === 'list' ? 'flex flex-row items-center justify-center gap-4' : 'flex w-full flex-col items-center justify-center gap-4'} ${isCaptured ? 'cursor-pointer border-green-500' : ''}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`${view === 'list' ? 'h-20' : 'h-24'} object-contain`}
      />
      <h3 className={`mt-2 text-center capitalize ${view === 'list' ? 'text-lg' : 'text-base'}`}>
        {name}
      </h3>
      {!isCaptured ? (
        <button
          className={`mt-2 rounded-md px-4 py-2 text-xs ${isCaptured ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
          onClick={onCapture}
          disabled={isCaptured}
        >
          <CatchingPokemonOutlinedIcon />
          &nbsp; Tag as Captured
        </button>
      ) : (
        <CheckCircleTwoToneIcon className="text-2xl text-green-500" />
      )}
    </div>
  );
};

export default PokemonCard;
