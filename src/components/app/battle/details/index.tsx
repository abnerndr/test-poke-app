"use client";

import { useI18n } from "@/lib/i18n/context";
import { Pokemon } from "@/types/pokemon";
import { BattleDetailsFirstPokemon } from "./components/first-pokemon";
import { BattleDetailsHeader } from "./components/header";
import { BattleDetailsSecondPokemon } from "./components/second-pokemon";
import { useBattleDetails } from "./hooks/use-battle-details";

interface BattleDetailsProps {
	firstPokemon?: Pokemon;
	secondPokemon?: Pokemon;
}

export default function BattleDetails({ firstPokemon, secondPokemon }: BattleDetailsProps) {
	const { t } = useI18n();
	const {
		firstPokemon: firstPokemonData,
		secondPokemon: secondPokemonData,
		isTranslating,
	} = useBattleDetails(firstPokemon, secondPokemon);

	if (!firstPokemonData || !secondPokemonData) {
		return (
			<div className="p-4 text-center">
				<p className="text-gray-600">{t("errors.pokemonNotFound")}</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="max-w-6xl mx-auto">
				<BattleDetailsHeader isTranslating={isTranslating} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Primeiro Pokémon */}
					<BattleDetailsFirstPokemon firstPokemonData={firstPokemonData} isTranslating={isTranslating} />
					{/* Segundo Pokémon */}
					<BattleDetailsSecondPokemon secondPokemonData={secondPokemonData} isTranslating={isTranslating} />
				</div>
			</div>
		</div>
	);
}
