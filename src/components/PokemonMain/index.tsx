'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';

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
  const [selectedPokemon, setSelectedPokemon] = useState<{
    name?: string;
    imageUrl?: string;
  } | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [nickname, setNickname] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'captured'>('all');

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const limitPerPage = 18;
  const limit = 150;
  const offset = 0;

  // Fetch Pokemon list using Tanstack Query
  const { data: pokemon = [], isLoading } = useQuery<any>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => getPokemonList(limit, offset),
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

    const startIndex = (page - 1) * limitPerPage;
    const endIndex = page * limitPerPage;
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
    filter === 'all'
      ? pokemon.length / limitPerPage
      : Object.keys(capturedPokemon).length / limitPerPage,
  );

  const handleViewDetails = async (name: string, imageUrl: string) => {
    setSelectedPokemon({ name: name, imageUrl: imageUrl });
    await fetchPokemonDetails(name);
  };

  const handleCaptureDetails = (action: string) => {
    if (selectedPokemon) {
      let updatedCaptured: any = {};

      if (action === 'SAVE') {
        updatedCaptured = {
          ...capturedPokemon,
          [selectedPokemon.name || '']: { when: date, nickname },
        };
      }

      if (action === 'REMOVE') {
        updatedCaptured = { ...capturedPokemon };
        delete updatedCaptured[selectedPokemon.name || ''];
      }

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
    <Box className={clsx(styles.main)}>
      <PokemonHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setView={setView}
        view={view}
      />
      {filteredPokemon.length !== 0 ? (
        <Box className={clsx(styles.pokemonCard, view === 'grid' ? styles.grid : '')}>
          {filteredPokemon.map((p: any) => {
            return (
              <PokemonCard
                key={p.name}
                name={p.name}
                imageUrl={p.imageUrl}
                view={view}
                isCaptured={!!capturedPokemon[p.name]}
                onViewDetails={() => handleViewDetails(p.name, p.imageUrl)}
              />
            );
          })}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>No Pokemon Data</Box>
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
          onCapture={handleCaptureDetails}
          onClose={setSelectedPokemon}
        />
      )}
    </Box>
  );
};

export default PokemonMain;
