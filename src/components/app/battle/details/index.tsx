"use client";

import { useI18n } from "@/lib/i18n/context";
import { Pokemon } from "@/types/pokemon";
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
				<h1 className="text-2xl font-bold mb-6">Battle Details</h1>

				{/* Indicadores de tradução */}
				{isTranslating && <div className="mb-4 text-sm text-gray-500">{t("ui.loading")}...</div>}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Primeiro Pokémon */}
					<div className="border rounded-lg p-4">
						<h2 className="text-xl font-bold capitalize mb-2">
							{firstPokemonData.name}
							{isTranslating && <span className="text-xs text-gray-500 ml-2 animate-pulse">...</span>}
						</h2>
						{/* Adicione aqui os componentes que exibem os dados do Pokémon */}
						{/* Por exemplo: habilidades, stats, etc. */}
						{firstPokemonData.abilities && (
							<div className="mt-4">
								<h3 className="font-semibold mb-2">{t("ui.abilities")}</h3>
								<ul className="list-disc list-inside">
									{firstPokemonData.abilities.map((ability, index) => (
										<li key={index} className="capitalize">
											{ability.name}
											{ability.short_effect && (
												<span className="text-sm text-gray-600 ml-2">- {ability.short_effect}</span>
											)}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Segundo Pokémon */}
					<div className="border rounded-lg p-4">
						<h2 className="text-xl font-bold capitalize mb-2">
							{secondPokemonData.name}
							{isTranslating && <span className="text-xs text-gray-500 ml-2 animate-pulse">...</span>}
						</h2>
						{/* Adicione aqui os componentes que exibem os dados do Pokémon */}
						{secondPokemonData.abilities && (
							<div className="mt-4">
								<h3 className="font-semibold mb-2">{t("ui.abilities")}</h3>
								<ul className="list-disc list-inside">
									{secondPokemonData.abilities.map((ability, index) => (
										<li key={index} className="capitalize">
											{ability.name}
											{ability.short_effect && (
												<span className="text-sm text-gray-600 ml-2">- {ability.short_effect}</span>
											)}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
