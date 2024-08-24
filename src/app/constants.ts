export type ResultResponse = { name: string; url: string };

export type SpeciesResponseProps = { data: { color: { name: string }; id: number } };

export type PokemonDetailResponse = {
  data: {
    name: string;
    id: number;
    sprites: {
      front_default: string;
    };
    types: string[];
    height: number;
    weight: number;
    isCaptured: boolean;
    capturedDetails: {
      nickname: string;
      when: string;
    };
  };
};

export type PokemonListProps = {
  data: {
    results: ResultResponse[];
  };
};

export type PokemonDetailProps = {
  pokemonDetails: {
    name: string;
    id: number;
    sprites: {
      front_default: string;
    };
    types: string[];
    height: number;
    weight: number;
    isCaptured: boolean;
    capturedDetails: {
      nickname: string;
      when: string;
    };
  };
  selectedPokemon: string;
  nickname: string;
  date: string;
  setDate: (v: any) => void;
  setNickname: (v: any) => void;
  saveCapture: () => void;
  setSelectedPokemon: (v: any) => void;
  removeCapture: () => void;
};

export type PokemonCardProps = {
  name: string;
  imageUrl: string;
  view: 'list' | 'grid';
  onCapture: () => void;
  isCaptured: boolean;
  onViewDetails?: () => void;
};

export type PokemonDetailValidation = {
  nickname?: string;
  date?: string;
};

export type PokemonHeaderProps = {
  searchTerm: string;
  setSearchTerm: (v: any) => void;
  setView: (v: any) => void;
  view: string;
};

export type PokemonFooterProps = {
  filter: string;
  setFilter: (v: any) => void;
  handlePageChange: (v: any) => void;
  page: number;
  totalPages: number;
};
