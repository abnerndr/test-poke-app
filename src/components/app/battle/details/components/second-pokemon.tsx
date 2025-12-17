import { useI18n } from "@/lib/i18n/context";
import { Pokemon } from "@/types/pokemon";

interface BattleDetailsSecondPokemonProps {
	secondPokemonData: Pokemon;
	isTranslating: boolean;
}

export function BattleDetailsSecondPokemon({ secondPokemonData, isTranslating }: BattleDetailsSecondPokemonProps) {
	const { t } = useI18n();
	return (
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
								{ability.short_effect && <span className="text-sm text-gray-600 ml-2">- {ability.short_effect}</span>}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
