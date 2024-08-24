'use client';

import React from 'react';
import { useDarkMode } from '@/lib/useDarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import clsx from 'clsx';

import styles from '@/components/SuccessModal/SuccessModal.module.css';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={clsx(
        styles.button,
        darkMode ? 'text-gray-500' : 'dark:bg-gray-800 dark:text-white',
      )}
    >
      {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </button>
  );
};

export default ThemeToggle;
