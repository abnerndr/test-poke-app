import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { PokemonItem, Pokemons } from "@/types/pokemons";
import { InfiniteData } from "@tanstack/react-query";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { BattleFormData } from "../../../schemas/battle-form.schema";
import { PokemonList } from "../../pokemon-list";

interface CreateBattleSelectionSecondaryProps {
	secondSearchTerm: string | undefined;
	setValue: UseFormSetValue<BattleFormData>;
	errors: FieldErrors<BattleFormData>;
	pokemonsInfinityData: InfiniteData<Pokemons, unknown> | undefined;
	isLoadingPokemonsInfinity: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	firstPokemonId: number;
	secondPokemonId: number;
	handleSelectSecond: (pokemon: PokemonItem) => void;
}

export default function CreateBattleSelectionSecondary({
	secondSearchTerm,
	setValue,
	errors,
	pokemonsInfinityData,
	isLoadingPokemonsInfinity,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	firstPokemonId,
	secondPokemonId,
	handleSelectSecond,
}: CreateBattleSelectionSecondaryProps) {
	const { t } = useI18n();
	return (
		<div className="space-y-4 min-w-0 max-w-full overflow-hidden">
			<h2 className={cn("text-lg sm:text-xl font-bold", pressStart2P.className)}>
				{t("ui.selectSecondPokemon") || "Selecione o Segundo Pokémon"}
			</h2>
			<div className="mb-2 px-1">
				<input
					type="text"
					placeholder={t("ui.searchPokemon") || "Buscar Pokémon..."}
					value={secondSearchTerm || ""}
					onChange={(e) => setValue("secondSearchTerm", e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
				/>
			</div>
			<div className="overflow-hidden">
				<PokemonList
					data={pokemonsInfinityData}
					isLoading={isLoadingPokemonsInfinity}
					hasNextPage={hasNextPage || false}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					selectedPokemonId={secondPokemonId && secondPokemonId > 0 ? secondPokemonId : null}
					blockedPokemonId={firstPokemonId && firstPokemonId > 0 ? firstPokemonId : null}
					onSelect={handleSelectSecond}
					searchTerm={secondSearchTerm}
				/>
			</div>
		</div>
	);
}
