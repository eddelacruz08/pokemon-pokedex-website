'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import PokemonCard from '@/components/PokemonCard';
import PokemonDetails from '@/components/PokemonDetails';
import PokemonHeader from '@/components/PokemonHeader';
import PokemonFooter from '@/components/PokemonFooter';

import { useDarkMode } from '@/lib/useDarkMode';
import { getPokemonList, getPokemonDetails } from '@/lib/api';

const PokemonMain: React.FC = () => {
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [capturedPokemon, setCapturedPokemon] = useState<{
    [key: string]: { when: string; nickname: string };
  }>({});
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [nickname, setNickname] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'captured'>('all');
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { darkMode } = useDarkMode();

  // Fetch Pokémon list using Tanstack Query
  const { data: pokemon = [], isLoading } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: getPokemonList,
  });

  useEffect(() => {
    setFilteredPokemon(pokemon.slice(0, displayCount));
  }, [pokemon, displayCount]);

  useEffect(() => {
    let results = pokemon.filter((p: any) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (filter === 'captured') {
      results = results.filter((p: any) => capturedPokemon[p.name]);
    }

    setFilteredPokemon(results.slice(0, displayCount));
  }, [searchTerm, pokemon, filter, displayCount, capturedPokemon]);

  useEffect(() => {
    const storedCaptured = localStorage.getItem('capturedPokemon');
    if (storedCaptured) {
      setCapturedPokemon(JSON.parse(storedCaptured));
    }
  }, []);

  // Fetch Pokémon details using Tanstack Query
  const fetchPokemonDetails = async (name: string) => {
    const details = await getPokemonDetails(name);
    setPokemonDetails({
      ...details,
      isCaptured: !!capturedPokemon[name],
      capturedDetails: capturedPokemon[name],
    });
  };

  const handleCapture = async (name: string) => {
    setSelectedPokemon(name);
    await fetchPokemonDetails(name);
  };

  const handleViewDetails = async (name: string) => {
    setSelectedPokemon(name);
    await fetchPokemonDetails(name);
  };

  const saveCapture = () => {
    if (selectedPokemon) {
      const updatedCaptured = {
        ...capturedPokemon,
        [selectedPokemon]: { when: date, nickname },
      };
      setCapturedPokemon(updatedCaptured);
      localStorage.setItem('capturedPokemon', JSON.stringify(updatedCaptured));
      setSelectedPokemon(null);
      setNickname('');
      setDate('');
      setPokemonDetails(null);
    }
  };

  const removeCapture = () => {
    if (selectedPokemon) {
      const updatedCaptured = { ...capturedPokemon };
      delete updatedCaptured[selectedPokemon];
      setCapturedPokemon(updatedCaptured);
      localStorage.setItem('capturedPokemon', JSON.stringify(updatedCaptured));
      setSelectedPokemon(null);
      setNickname('');
      setDate('');
      setPokemonDetails(null);
    }
  };

  const loadMore = () => {
    if (pokemon.length > displayCount) {
      setDisplayCount(displayCount + 20);
    } else {
      setHasMore(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-20 p-4">
      <PokemonHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setView={setView}
        view={view}
      />
      <div
        className={`grid gap-4 ${
          view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : ''
        }`}
      >
        {filteredPokemon.map((p: any) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            url={p.url}
            view={view}
            onCapture={() => handleCapture(p.name)}
            isCaptured={!!capturedPokemon[p.name]}
            onViewDetails={() => handleViewDetails(p.name)}
          />
        ))}
        {hasMore && (
          <div
            className={`rounded-lg border p-4 shadow-md ${view === 'list' ? 'flex flex-row items-center justify-center gap-4' : 'flex w-full flex-col items-center justify-center gap-4'} `}
          >
            <div className="flex justify-center">
              <button
                className="dark: rounded-md px-4 py-2 italic hover:bg-gray-500 hover:text-white"
                onClick={loadMore}
              >
                Load more . . .
              </button>
            </div>
          </div>
        )}
      </div>

      <PokemonFooter filter={filter} setFilter={setFilter} />

      {selectedPokemon && (
        <PokemonDetails
          pokemonDetails={pokemonDetails}
          selectedPokemon={selectedPokemon}
          nickname={nickname}
          date={date}
          setDate={setDate}
          setNickname={setNickname}
          saveCapture={saveCapture}
          removeCapture={removeCapture}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}
    </div>
  );
};

export default PokemonMain;
