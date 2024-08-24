import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

import clsx from 'clsx';

import styles from '@/components/SuccessModal/SuccessModal.module.css';

const SuccessModal: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={clsx(styles.cardBody, 'dark:bg-gray-800')}>
        <h2 className={clsx('dark:text-white')}>{message}</h2>
        <div>
          <CheckCircleTwoToneIcon className={clsx(styles.icon)} />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
