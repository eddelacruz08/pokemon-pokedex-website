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
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [capturedPokemon, setCapturedPokemon] = useState<{
    [key: string]: { when: string; nickname: string };
  }>({});
  const [selectedPokemon, setSelectedPokemon] = useState<{
    name?: string;
    color?: string;
    imageUrl?: string;
  } | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [nickname, setNickname] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'captured'>('all');
  const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const limit = 150;
  const offset = (page - 1) * limit;

  // Fetch Pokemon list using Tanstack Query
  const { data: pokemon = { list: [], count: 0 }, isLoading } = useQuery<any | {}>({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => getPokemonList(limit, offset),
  });

  useEffect(() => {
    // Restore captured Pokemon from local storage
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(
    filter === 'all' ? pokemon?.count / limit : Object.keys(capturedPokemon).length / limit,
  );

  const handleViewDetails = async (name: string, color: string, imageUrl: string) => {
    setSelectedPokemon({ name, color, imageUrl });
    await fetchPokemonDetails(name);
  };

  const handleCaptureDetails = (action: string) => {
    if (selectedPokemon) {
      let updatedCaptured: any = {};

      if (action === 'SAVE') {
        updatedCaptured = {
          ...capturedPokemon,
          [selectedPokemon.name || '']: {
            when: date,
            nickname,
            imageUrl: selectedPokemon.imageUrl,
          },
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

  useEffect(() => {
    let filteredList = [];

    // Filter based on 'all' or 'captured'
    if (filter === 'captured') {
      filteredList = Object.keys(capturedPokemon).map((name) => {
        const capturedDetail: any = capturedPokemon[name];
        return {
          name,
          color: capturedDetail.color,
          imageUrl: capturedDetail.imageUrl,
        };
      });
    } else {
      filteredList = pokemon?.list?.filter((p: any) => {
        return filter === 'all' || !!capturedPokemon[p.name];
      });
    }

    // Apply search term filter
    if (searchTerm) {
      filteredList = filteredList.filter((p: any) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    setFilteredPokemonList(
      filter === 'all' ? filteredList : filteredList?.slice(startIndex, endIndex),
    );
  }, [filter, searchTerm, capturedPokemon, pokemon?.list]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Box className={clsx(styles.main)}>
      <PokemonHeader
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        setView={setView}
        view={view}
      />
      {filteredPokemonList?.length !== 0 ? (
        <Box className={clsx(styles.pokemonCard, view === 'grid' ? styles.grid : '')}>
          {filteredPokemonList?.map((p: any) => (
            <PokemonCard
              key={p.name}
              name={p.name}
              color={p.color}
              imageUrl={p.imageUrl}
              view={view}
              isCaptured={!!capturedPokemon[p.name]}
              onViewDetails={() => handleViewDetails(p.name, p.color, p.imageUrl)}
            />
          ))}
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
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </Box>
  );
};

export default PokemonMain;
