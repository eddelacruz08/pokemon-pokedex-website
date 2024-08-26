import React, { useState } from 'react';

import { Box, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import SuccessModal from '@/components/SuccessModal';

import clsx from 'clsx';

import { PokemonDetailProps, PokemonDetailValidation } from '@/app/types';
import { colorTypes } from '@/app/constants';

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
        setSuccessMessage(selectedPokemon?.name + ' was successfully captured!');
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

  const pokemonData = {
    pokemonName: selectedPokemon.name,
    imageUrl: selectedPokemon.imageUrl,
    isCaptured: pokemonDetails?.isCaptured,
    color: selectedPokemon?.color,
    capturedData: [
      { name: 'nickname', value: pokemonDetails?.capturedDetails?.nickname },
      { name: 'date captured', value: pokemonDetails?.capturedDetails?.when },
    ],
    pokemonInfo: [
      { name: 'height', value: pokemonDetails?.height / 10 + ' m' },
      {
        name: 'types',
        value: pokemonDetails?.types,
      },
      { name: 'weight', value: pokemonDetails?.weight / 10 + ' kg' },
    ],
  };

  return (
    <>
      {successMessage && <SuccessModal message={successMessage} />}

      <Box className={clsx(styles.details)}>
        <Box
          className={clsx(
            styles.detailsCard,
            pokemonData.isCaptured
              ? `bg-gradient-to-b from-green-600 to-yellow-200 dark:from-green-700 dark:to-yellow-200`
              : `bg-gradient-to-b from-gray-600 to-yellow-200 dark:bg-gray-700 dark:to-yellow-200`,
          )}
        >
          <Box className={clsx(styles.detailsTitle)}>
            <CloseIcon className={'dark:text-yellow-500'} onClick={() => onClose(null)} />
          </Box>
          {pokemonDetails && (
            <Box className={clsx(styles.detailsBody)}>
              <img src={pokemonData.imageUrl} alt={pokemonData.pokemonName} />
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {pokemonData.pokemonName}
              </Typography>
              <Box className={clsx(styles.cardTransparent, 'p-2')}>
                {pokemonData.isCaptured && (
                  <Box className="align-center mb-4 flex flex-row justify-between gap-4">
                    {pokemonData.capturedData.map((data, index) => {
                      return (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '1.3rem',
                              opacity: 0.8,
                              textTransform: 'uppercase',
                              marginBottom: '4px',
                            }}
                          >
                            {data.value || 'N/A'}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              textAlign: 'center',
                              lineHeight: '.75rem',
                            }}
                          >
                            {data.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
                <Box className="align-center mb-2 flex flex-row justify-between gap-4">
                  {pokemonData.pokemonInfo.map((data: any, index: number) => {
                    return (
                      <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1.3rem',
                            opacity: 0.8,
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                          }}
                        >
                          {data.name === 'types'
                            ? data.value.map((type: string, index: number) => (
                                <Button
                                  key={index}
                                  size="small"
                                  sx={{
                                    background: colorTypes[type as keyof typeof colorTypes] || '',
                                    borderRadius: '15px',
                                    fontSize: '8px',
                                    gap: 2,
                                    color: 'white',
                                    marginRight: '1px',
                                  }}
                                >
                                  {type}
                                </Button>
                              ))
                            : data.value}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            lineHeight: '.75rem',
                          }}
                        >
                          {data.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
          {!pokemonData.isCaptured ? (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                error={!!errors.nickname}
                label="Enter Nickname:"
                placeholder="Nickname"
                variant="standard"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                helperText={errors.nickname || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={!!errors.date}
                label="Enter Date:"
                variant="standard"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                helperText={errors.date || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box className={clsx(styles.detailsCardDiv)}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleCapture('SAVE')}
                  startIcon={
                    <img src={'/lock.png'} alt={'Pokemon Ball'} className={clsx(styles.icon)} />
                  }
                  color="warning"
                >
                  Tag as Captured
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className={clsx(styles.detailsCardDiv)}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleCapture('REMOVE')}
                startIcon={<DeleteIcon />}
                color="error"
              >
                Remove
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PokemonDetails;
