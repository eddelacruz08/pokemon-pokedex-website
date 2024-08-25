'use client';

import PokemonMain from '@/components/PokemonMain';
import Box from '@mui/material/Box';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Pokedex: React.FC = () => {
  return (
    <>
      <Box className="container mx-auto p-4">
        <QueryClientProvider client={queryClient}>
          <PokemonMain />
        </QueryClientProvider>
      </Box>
    </>
  );
};

export default Pokedex;
