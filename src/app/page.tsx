'use client';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokedex from '@/app/pokedex/page';
import Box from '@mui/material/Box';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will run only on the client
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <BrowserRouter>
      <Box className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </main>
      </Box>
    </BrowserRouter>
  );
}
