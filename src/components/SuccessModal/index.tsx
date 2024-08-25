import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import Box from '@mui/material/Box';

import clsx from 'clsx';

import styles from '@/components/SuccessModal/SuccessModal.module.css';

const SuccessModal: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <Box className={clsx(styles.card)}>
      <Box className={clsx(styles.cardBody, 'dark:bg-gray-800')}>
        <h2 className={clsx('dark:text-white')}>{message}</h2>
        <Box>
          <CheckCircleTwoToneIcon className={clsx(styles.icon)} />
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessModal;
