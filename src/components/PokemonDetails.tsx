import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { PokemonDetailProps, PokemonDetailValidation } from '@/app/constants';
import { useDarkMode } from '@/lib/useDarkMode';
import SuccessModal from '@/components/SuccessModal';

const PokemonDetails: React.FC<PokemonDetailProps> = ({
  pokemonDetails,
  selectedPokemon,
  nickname,
  date,
  setDate,
  setNickname,
  saveCapture,
  setSelectedPokemon,
  removeCapture,
}) => {
  const { darkMode } = useDarkMode();
  const textColor = darkMode ? 'text-white' : 'text-black';

  const [errors, setErrors] = useState<PokemonDetailValidation>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateInputs = () => {
    const newErrors: PokemonDetailValidation = {};

    if (!nickname) {
      newErrors.nickname = 'Nickname is required.';
    }

    if (!date) {
      newErrors.date = 'Date is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCapture = () => {
    if (validateInputs()) {
      setSuccessMessage(selectedPokemon + ' was successfully tag as captured!');
      setTimeout(() => {
        setSuccessMessage(null);
        saveCapture();
      }, 3000);
    }
  };

  const handleRemoveCapture = () => {
    setSuccessMessage(selectedPokemon + ' was successfully removed!');
    setTimeout(() => {
      setSuccessMessage(null);
      removeCapture();
    }, 3000);
  };

  return (
    <>
      {successMessage && <SuccessModal message={successMessage} />}

      <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
        <div
          className={`w-full max-w-md rounded-md ${pokemonDetails?.isCaptured ? 'border border-green-500' : 'border border-white'} ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow-lg`}
        >
          <div className="flex flex-row items-center justify-between">
            <h2 className={`mb-4 text-center text-xl font-bold ${textColor}`}>
              {pokemonDetails?.isCaptured ? 'Captured' : 'Tag Pokemon as Captured'}
            </h2>
            <CloseIcon
              className={`cursor-pointer ${textColor}`}
              onClick={() => setSelectedPokemon(null)}
            />
          </div>
          {pokemonDetails && (
            <div className={`mb-4 ${textColor}`}>
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                className="mx-auto mb-2 rounded-lg border shadow-md"
              />
              <h3 className="text-transform: text-center text-lg font-semibold capitalize">
                {pokemonDetails.name}
              </h3>
              {pokemonDetails?.isCaptured && (
                <>
                  <p>
                    <strong>Nickname:</strong> {pokemonDetails?.capturedDetails?.nickname}
                  </p>
                  <p>
                    <strong>When:</strong> {pokemonDetails?.capturedDetails?.when}
                  </p>
                </>
              )}
              <p>
                <strong>Type:</strong>{' '}
                {pokemonDetails.types.map((type: any) => type.type.name).join(', ')}
              </p>
              <p>
                <strong>Height:</strong> {pokemonDetails.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
              </p>
            </div>
          )}
          {!pokemonDetails?.isCaptured ? (
            <>
              <p className={`mb-2 capitalize ${textColor}`}>Selected Pokémon: {selectedPokemon}</p>
              <input
                type="text"
                placeholder="Nickname"
                className={`mb-2 w-full rounded-md border p-2 text-black`}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {errors.nickname && <p className="text-sm text-red-500">{errors.nickname}</p>}
              <input
                type="date"
                className={`mb-2 w-full rounded-md border p-2 text-black`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              <div className="flex justify-end">
                <button
                  className={`rounded-md bg-blue-500 px-4 py-2 text-white`}
                  onClick={handleSaveCapture}
                >
                  Tag as Captured
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-end">
              <button
                className={`rounded-md bg-red-500 px-4 py-2 text-white`}
                onClick={handleRemoveCapture}
              >
                Remove Captured
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
