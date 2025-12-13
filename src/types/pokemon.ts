export interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	location_area_encounters?: string;
	pictures: PokemonPicture[];
	species: PokeNamedResource;
	stats: PokemonStats[];
	abilities: PokemonAbility[];
	evolutions?: PokemonEvolutions;
	color: PokemonColor;
}

type PokemonColor = {
	name: string;
};

type PokeNamedResource = {
	name: string;
	url: string;
};

type PokemonPicture = {
	url: string;
};

type PokemonStats = {
	stat: PokeNamedResource;
	effort: number;
	base_stat: number;
};

type PokemonAbility = {
	name: string;
	is_hidden: boolean;
	slot: number;
	effect?: string;
	short_effect?: string;
};

type PokemonEvolutions = {
	first?: PokemonEvolutionChain;
	second?: PokemonEvolutionChain;
	third?: PokemonEvolutionChain;
};

type PokemonEvolutionChain = {
	id: number;
	name: string;
	pictures: PokemonPicture[];
};
