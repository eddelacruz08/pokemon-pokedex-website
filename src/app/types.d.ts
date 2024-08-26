export type ResultResponse = { name: string; url: string; id: number };

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
    count: number;
    results: ResultResponse[];
  };
};

export type PokemonDetailProps = {
  pokemonDetails: {
    name?: string;
    id?: number;
    types: string[];
    height: number;
    weight: number;
    isCaptured?: boolean;
    capturedDetails?: {
      nickname: string;
      when: string;
    };
  };
  selectedPokemon: {
    name?: string;
    imageUrl?: string;
    color?: string;
  };
  nickname: string;
  date: string;
  setDate: (v: any) => void;
  setNickname: (v: any) => void;
  onCapture: (v: any) => void;
  onClose: (v: any) => void;
};

export type PokemonCardProps = {
  name: string;
  imageUrl: string;
  color: string;
  view: 'list' | 'grid';
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
