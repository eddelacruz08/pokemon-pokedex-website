'use client';

import React from 'react';
import { useDarkMode } from '@/lib/useDarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-md border bg-gray-200 px-4 py-2 ${darkMode ? 'text-gray-500' : 'dark:bg-gray-800 dark:text-white'} transition-colors`}
    >
      {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </button>
  );
};

export default ThemeToggle;
