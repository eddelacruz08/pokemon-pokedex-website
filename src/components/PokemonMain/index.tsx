'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import PokemonCard from '@/components/PokemonCard';
import PokemonDetails from '@/components/PokemonDetails';
import PokemonHeader from '@/components/PokemonHeader';
import PokemonFooter from '@/components/PokemonFooter';
import LoadingScreen from '@/components/LoadingScreen';

import { getPokemonList, getPokemonDetails } from '@/lib/api';

import clsx from 'clsx';

import styles from '@/components/PokemonMain/PokemonMain.module.css';

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
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const limit = 18;

  // Fetch Pokemon list using Tanstack Query
  const { data: pokemon = [], isLoading } = useQuery<any>({
    queryKey: ['pokemonList'],
    queryFn: getPokemonList,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    let results = pokemon.filter((p: any) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (filter === 'captured') {
      results = results.filter((p: any) => capturedPokemon[p.name]);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    setFilteredPokemon(results.slice(startIndex, endIndex));
  }, [searchTerm, pokemon, filter, page, capturedPokemon]);

  useEffect(() => {
    const storedCaptured = localStorage.getItem('capturedPokemon');
    if (storedCaptured) {
      setCapturedPokemon(JSON.parse(storedCaptured));
    }
  }, []);

  const fetchPokemonDetails = async (name: string) => {
    const details = await getPokemonDetails(name);
    setPokemonDetails({
      ...details,
      isCaptured: !!capturedPokemon[name],
      capturedDetails: capturedPokemon[name],
    });
  };

  const totalPages = Math.ceil(
    filter === 'all' ? pokemon.length / limit : Object.keys(capturedPokemon).length / limit,
  );

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

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={clsx(styles.main)}>
      <PokemonHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setView={setView}
        view={view}
      />
      {filteredPokemon.length !== 0 ? (
        <div className={clsx(styles.pokemonCard, view === 'grid' ? styles.grid : '')}>
          {filteredPokemon.map((p: any) => {
            return (
              <PokemonCard
                key={p.name}
                name={p.name}
                imageUrl={p.images}
                view={view}
                onCapture={() => handleCapture(p.name)}
                isCaptured={!!capturedPokemon[p.name]}
                onViewDetails={() => handleViewDetails(p.name)}
              />
            );
          })}
        </div>
      ) : (
        <div className={clsx('text-center')}>No Pokemon Data</div>
      )}

      <PokemonFooter
        filter={filter}
        setFilter={setFilter}
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      />

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
