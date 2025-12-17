import { Pokemon } from "@/types/pokemon";
import { useTranslatedPokemon } from "@/lib/i18n/pokemon-translations";

interface UseBattlePokemonProps {
	pokemon?: Pokemon;
	isTranslating: boolean;
}

/**
 * Hook para traduzir dados de Pokémon usado em batalhas
 * Similar ao useDetails mas específico para contexto de batalha
 */
export function useBattlePokemon(pokemon: Pokemon | undefined): UseBattlePokemonProps {
	const { translatedPokemon, isTranslating } = useTranslatedPokemon(pokemon);

	return {
		pokemon: translatedPokemon,
		isTranslating,
	};
}

