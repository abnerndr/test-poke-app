import { useI18n } from "@/lib/i18n/context";
import { Pokemon } from "@/types/pokemon";
import { PokemonPreview } from "../pokemon-preview";

interface CreateBattlePreviewProps {
	battleResult: {
		winner: Pokemon | null;
	} | null;
	isBattling: boolean;
	firstPokemonId: number;
	secondPokemonId: number;
	firstPokemon: Pokemon | null;
	secondPokemon: Pokemon | null;
	isLoadingDetails: boolean;
}
export function CreateBattlePreview({
	battleResult,
	isBattling,
	firstPokemonId,
	secondPokemonId,
	firstPokemon,
	secondPokemon,
	isLoadingDetails,
}: CreateBattlePreviewProps) {
	const { t } = useI18n();
	if (
		(battleResult && isBattling && !firstPokemonId && firstPokemonId < 0) ||
		(battleResult && isBattling && !secondPokemonId && secondPokemonId < 0)
	) {
		return null;
	}
	return (
		<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
			<PokemonPreview
				pokemon={isLoadingDetails ? null : firstPokemon || null}
				title={t("ui.firstPokemon") || "Primeiro Pokémon"}
			/>
			<PokemonPreview
				pokemon={isLoadingDetails ? null : secondPokemon || null}
				title={t("ui.secondPokemon") || "Segundo Pokémon"}
			/>
		</div>
	);
}
