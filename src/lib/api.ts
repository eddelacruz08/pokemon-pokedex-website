import client from '@/helpers/clients';

import {
  PokemonDetailResponse,
  PokemonListProps,
  ResultResponse,
  SpeciesResponseProps,
} from '@/app/types';

// Fetch a list of Pokemon with a limit and offset
export const getPokemonList = async (limit: number, offset: number) => {
  try {
    const response: PokemonListProps = await client.get(
      `/v2/pokemon/?limit=${limit}&offset=${offset}`,
    );
    const pokemonList = response.data;

    const pokemonWithImages = await Promise.all(
      pokemonList.results.map(async (pokemon: ResultResponse) => {
        const speciesUrl = pokemon.url.replace('/pokemon/', '/pokemon-species/');
        const speciesResponse: SpeciesResponseProps = await client.get(speciesUrl);
        const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${speciesResponse.data.id}.svg`;
        const color = speciesResponse.data.color.name;
        return {
          ...pokemon,
          imageUrl, // Add image to each Pokemon
          color, // Add color to each Pokemon
        };
      }),
    );

    return { list: pokemonWithImages, count: pokemonList.count };
  } catch (error) {
    console.error('Error fetching Pokemon list with colors:', error);
    throw error;
  }
};

// Fetch details of a specific Pokemon by name
export const getPokemonDetails = async (name: string) => {
  try {
    const response: PokemonDetailResponse = await client.get(`/v2/pokemon/${name}`);

    return {
      id: response.data.id,
      height: response.data.height,
      name: response.data.name,
      weight: response.data.weight,
      types: response.data.types.map((type: any) => type.type.name),
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};
