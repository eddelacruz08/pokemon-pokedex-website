import client from '@/helpers/clients';

import {
  PokemonDetailResponse,
  PokemonListProps,
  ResultResponse,
  SpeciesResponseProps,
} from '@/app/constants';

// Fetch a list of Pokemon with a limit and offset
export const getPokemonList = async () => {
  try {
    const response: PokemonListProps = await client.get(`/v2/pokemon/?limit=150&offset=??`);
    const pokemonList = response.data.results;

    const pokemonWithColors = await Promise.all(
      pokemonList.map(async (pokemon: ResultResponse) => {
        const speciesUrl = pokemon.url.replace('/pokemon/', '/pokemon-species/');
        const speciesResponse: SpeciesResponseProps = await client.get(speciesUrl);
        const color = speciesResponse.data.color.name;
        const images = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${speciesResponse.data.id}.svg`;
        return {
          ...pokemon,
          color, // Add color information to each Pokemon
          images, // Add image information to each Pokemon
        };
      }),
    );

    return pokemonWithColors;
  } catch (error) {
    console.error('Error fetching Pokemon list with colors:', error);
    throw error;
  }
};

// Fetch details of a specific Pokemon by name
export const getPokemonDetails = async (name: string) => {
  try {
    const response: PokemonDetailResponse = await client.get(`/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};
