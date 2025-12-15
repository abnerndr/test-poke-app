import { pokemonService } from "@/services/pokemon";
import { Pokemon } from "@/types/pokemon";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function usePokemon(id: string): UseQueryResult<Pokemon, Error> {
	return useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => pokemonService.getPokemon(id),
		enabled: !!id,
	});
}
