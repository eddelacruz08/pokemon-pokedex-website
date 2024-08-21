export type PokemonDetailProps = {
  pokemonDetails: {
    name: string;
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
  url: string;
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
};
