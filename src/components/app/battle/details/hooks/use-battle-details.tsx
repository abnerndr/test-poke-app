import { Pokemon } from "@/types/pokemon";
import { useBattlePokemon } from "./use-battle-pokemon";

interface UseBattleDetailsProps {
	firstPokemon?: Pokemon;
	secondPokemon?: Pokemon;
	isTranslating: boolean;
}

/**
 * Hook principal para gerenciar os detalhes da batalha com tradução
 * Use este hook quando você tem os dados dos Pokémon e quer traduzi-los
 */
export function useBattleDetails(firstPokemon?: Pokemon, secondPokemon?: Pokemon): UseBattleDetailsProps {
	const { pokemon: translatedFirstPokemon, isTranslating: isTranslatingFirst } = useBattlePokemon(firstPokemon);
	const { pokemon: translatedSecondPokemon, isTranslating: isTranslatingSecond } = useBattlePokemon(secondPokemon);

	return {
		firstPokemon: translatedFirstPokemon || firstPokemon,
		secondPokemon: translatedSecondPokemon || secondPokemon,
		isTranslating: isTranslatingFirst || isTranslatingSecond,
	};
}

