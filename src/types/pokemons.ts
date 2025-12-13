export interface Pokemons {
	count: number;
	next: string | null;
	previous: string | null;
	results?: PokemonItem[];
	items?: PokemonItem[];
}

export interface PokemonItem {
	id: number;
	name: string;
	pictures: PokemonPicture[];
	color: PokemonColor;
}

type PokemonColor = {
	name: string;
};

export interface PokemonsQueryFilters {
	limit?: number;
	offset?: number;
}

type PokemonPicture = {
	url: string;
};
