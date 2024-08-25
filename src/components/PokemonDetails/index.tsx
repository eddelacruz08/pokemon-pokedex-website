import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import SuccessModal from '@/components/SuccessModal';

import clsx from 'clsx';

import { PokemonDetailProps, PokemonDetailValidation } from '@/app/constants';

import styles from '@/components/PokemonDetails/PokemonDetails.module.css';

const PokemonDetails: React.FC<PokemonDetailProps> = ({
  pokemonDetails,
  selectedPokemon,
  nickname,
  date,
  setDate,
  setNickname,
  onCapture,
  onClose,
}) => {
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

  const handleCapture = (action: string) => {
    if (action === 'SAVE') {
      if (validateInputs()) {
        setSuccessMessage(selectedPokemon?.name + ' was successfully tag as captured!');
        setTimeout(() => {
          setSuccessMessage(null);
          onCapture(action);
        }, 2000);
      }
    }
    if (action === 'REMOVE') {
      setSuccessMessage(selectedPokemon?.name + ' was successfully removed!');
      setTimeout(() => {
        setSuccessMessage(null);
        onCapture(action);
      }, 2000);
    }
  };

  return (
    <>
      {successMessage && <SuccessModal message={successMessage} />}

      <Box className={clsx(styles.details)}>
        <Box
          className={clsx(
            styles.detailsCard,
            pokemonDetails?.isCaptured
              ? 'bg-gradient-to-b from-green-600 to-yellow-200 dark:from-green-700 dark:to-yellow-200'
              : 'bg-gradient-to-b from-gray-600 to-yellow-200 dark:bg-gray-700 dark:to-yellow-200',
          )}
        >
          <Box className={clsx(styles.detailsTitle)}>
            <h2>{pokemonDetails?.isCaptured ? 'Captured' : 'Tag Pokemon as Captured'}</h2>
            <CloseIcon className={'dark:text-yellow-500'} onClick={() => onClose(null)} />
          </Box>
          {pokemonDetails && (
            <Box className={clsx(styles.detailsBody, `dark:text-gray-800`)}>
              <img src={selectedPokemon?.imageUrl} alt={pokemonDetails.name} />
              <h3>{pokemonDetails.name}</h3>
              {pokemonDetails?.isCaptured && (
                <div className="align-center flex flex-row justify-center gap-4">
                  <p>
                    <strong>Nickname:</strong> {pokemonDetails?.capturedDetails?.nickname || 'N/A'}
                  </p>
                  <p>
                    <strong>When:</strong> {pokemonDetails?.capturedDetails?.when || 'N/A'}
                  </p>
                </div>
              )}
              <div className="align-center flex flex-row justify-center gap-4">
                <p>
                  <strong>Height:</strong> {pokemonDetails.height / 10} m
                </p>
                <p>
                  <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
                </p>
              </div>
              <p className="text-center">
                <strong>Type:</strong>{' '}
                {pokemonDetails.types.map((type: any) => type.type.name).join(', ')}
              </p>
            </Box>
          )}
          {!pokemonDetails?.isCaptured ? (
            <>
              <p className={`font-bold dark:text-gray-800`}>
                Selected Pokemon: {selectedPokemon?.name}
              </p>
              <input
                type="text"
                placeholder="Nickname"
                className={`dark:bg-gray-600 dark:text-white`}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {errors.nickname && <p className={clsx(styles.error)}>{errors.nickname}</p>}
              <input
                type="date"
                className={`dark:bg-gray-600 dark:text-white`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className={clsx(styles.error)}>{errors.date}</p>}
              <Box className={clsx(styles.detailsCardDiv)}>
                <button
                  className={clsx(styles.detailsCardButtonIsCaptured)}
                  onClick={() => handleCapture('SAVE')}
                >
                  Tag as Captured
                </button>
              </Box>
            </>
          ) : (
            <Box className={clsx(styles.detailsCardDiv)}>
              <button
                className={clsx(styles.detailsCardButtonIsNotCaptured)}
                onClick={() => handleCapture('REMOVE')}
              >
                Remove
              </button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PokemonDetails;
