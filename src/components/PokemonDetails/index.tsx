import React, { useState } from 'react';
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
  saveCapture,
  setSelectedPokemon,
  removeCapture,
}) => {
  const [errors, setErrors] = useState<PokemonDetailValidation>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails?.id}.svg`;

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

      <div className={clsx(styles.details)}>
        <div
          className={clsx(
            styles.detailsCard,
            pokemonDetails?.isCaptured
              ? 'bg-gradient-to-b from-green-600 to-yellow-200 dark:from-green-700 dark:to-yellow-200'
              : 'bg-gradient-to-b from-gray-600 to-yellow-200 dark:bg-gray-700 dark:to-yellow-200',
          )}
        >
          <div className={clsx(styles.detailsTitle)}>
            <h2>{pokemonDetails?.isCaptured ? 'Captured' : 'Tag Pokemon as Captured'}</h2>
            <CloseIcon
              className={'dark:text-yellow-500'}
              onClick={() => setSelectedPokemon(null)}
            />
          </div>
          {pokemonDetails && (
            <div className={clsx(styles.detailsBody, `dark:text-gray-800`)}>
              <img src={imageUrl} alt={pokemonDetails.name} />
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
            </div>
          )}
          {!pokemonDetails?.isCaptured ? (
            <>
              <p className={`dark:text-gray-800`}>Selected Pokemon: {selectedPokemon}</p>
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
              <div className={clsx(styles.detailsCardDiv)}>
                <button
                  className={clsx(styles.detailsCardButtonIsCaptured)}
                  onClick={handleSaveCapture}
                >
                  Tag as Captured
                </button>
              </div>
            </>
          ) : (
            <div className={clsx(styles.detailsCardDiv)}>
              <button
                className={clsx(styles.detailsCardButtonIsNotCaptured)}
                onClick={handleRemoveCapture}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
