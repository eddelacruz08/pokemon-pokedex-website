'use client';

import PokemonMain from '@/components/PokemonMain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Pokedex: React.FC = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <QueryClientProvider client={queryClient}>
          <PokemonMain />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default Pokedex;
