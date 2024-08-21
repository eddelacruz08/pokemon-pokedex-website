import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

import { useDarkMode } from '@/lib/useDarkMode';

const SuccessModal: React.FC<{ message?: string }> = ({ message }) => {
  const { darkMode } = useDarkMode();
  const textColor = darkMode ? 'text-white' : 'text-black';

  return (
    <div className="h-100 fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
      <div
        className={`w-full max-w-md rounded-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow-lg`}
      >
        <h2 className={`mb-4 text-center text-xl font-bold capitalize ${textColor}`}>{message}</h2>
        <div className="flex justify-center">
          <CheckCircleTwoToneIcon className="text-2xl text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
