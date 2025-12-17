"use client";

import { pokemonService } from "@/services/pokemon";
import { Pokemons, PokemonsQueryFilters } from "@/types/pokemons";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfinityPokemons(queryFilters: PokemonsQueryFilters) {
	return useInfiniteQuery<Pokemons, Error>({
		queryKey: ["infinity-pokemons", queryFilters],
		queryFn: ({ pageParam = 0 }) => pokemonService.getPokemons({ ...queryFilters, offset: pageParam as number }),
		getNextPageParam: (lastPage: Pokemons, allPages: Pokemons[]) => {
			if (lastPage.next) {
				try {
					const url = new URL(lastPage.next);
					const nextOffset = url.searchParams.get("offset");
					if (nextOffset) {
						return parseInt(nextOffset, 10);
					}
				} catch {
					const totalLoaded = allPages.reduce(
						(sum, page) => sum + (page.items?.length || page.results?.length || 0),
						0
					);
					return totalLoaded;
				}
			}
			return undefined;
		},
		initialPageParam: 0,
	});
}
