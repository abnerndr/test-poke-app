"use client";

import { pokemonService } from "@/services/pokemon";
import { Battle } from "@/types/battle";
import { Pokemon } from "@/types/pokemon";
import { useQueries } from "@tanstack/react-query";

interface BattleWithPokemons {
	battle: Battle;
	firstPokemon: Pokemon | undefined;
	secondPokemon: Pokemon | undefined;
	winnerPokemon: Pokemon | undefined;
	isLoading: boolean;
}

export function useBattleHistory(battles: Battle[]): BattleWithPokemons[] {
	const queries = useQueries({
		queries: battles.map((battle) => ({
			queryKey: ["battle-pokemons", battle.id],
			queryFn: async () => {
				const [firstPokemon, secondPokemon, winnerPokemon] = await Promise.all([
					pokemonService.getPokemon(battle.firstPokemonId.toString()),
					pokemonService.getPokemon(battle.secondPokemonId.toString()),
					battle.winnerId ? pokemonService.getPokemon(battle.winnerId.toString()) : Promise.resolve(null),
				]);

				return {
					battle,
					firstPokemon,
					secondPokemon,
					winnerPokemon: winnerPokemon || undefined,
				};
			},
			enabled: battles.length > 0,
		})),
	});

	return queries.map((query, index) => ({
		battle: battles[index],
		firstPokemon: query.data?.firstPokemon,
		secondPokemon: query.data?.secondPokemon,
		winnerPokemon: query.data?.winnerPokemon,
		isLoading: query.isLoading,
	}));
}
