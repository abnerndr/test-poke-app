"use client";

import { pokemonService } from "@/services/pokemon";
import { PokemonsQueryFilters } from "@/types/pokemons";
import { useQuery } from "@tanstack/react-query";

export function usePokemons(queryFilters: PokemonsQueryFilters) {
	return useQuery({
		queryKey: ["pokemons", queryFilters],
		queryFn: () => pokemonService.getPokemons(queryFilters),
	});
}
