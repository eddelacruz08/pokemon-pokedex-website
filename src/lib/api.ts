import client from '@/helpers/clients';

// Fetch a list of Pokémon with a limit and offset
export const getPokemonList = async () => {
  try {
    const response = await client.get('/v2/pokemon/?limit=150&offset=??');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

// Fetch details of a specific Pokémon by name
export const getPokemonDetails = async (name: string) => {
  try {
    const response = await client.get(`/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};
