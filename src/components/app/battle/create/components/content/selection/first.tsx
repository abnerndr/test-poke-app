import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { PokemonItem, Pokemons } from "@/types/pokemons";
import { InfiniteData } from "@tanstack/react-query";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { BattleFormData } from "../../../schemas/battle-form.schema";
import { PokemonList } from "../../pokemon-list";

interface CreateBattleSelectionFirstProps {
	firstSearchTerm: string | undefined;
	setValue: UseFormSetValue<BattleFormData>;
	errors: FieldErrors<BattleFormData>;
	pokemonsInfinityData: InfiniteData<Pokemons, unknown> | undefined;
	isLoadingPokemonsInfinity: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	firstPokemonId: number;
	handleSelectFirst: (pokemon: PokemonItem) => void;
}

export default function CreateBattleSelectionFirst({
	firstSearchTerm,
	setValue,
	errors,
	pokemonsInfinityData,
	isLoadingPokemonsInfinity,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	firstPokemonId,
	handleSelectFirst,
}: CreateBattleSelectionFirstProps) {
	const { t } = useI18n();
	return (
		<div className="space-y-4 min-w-0 max-w-full overflow-hidden">
			<h2 className={cn("text-lg sm:text-xl font-bold", pressStart2P.className)}>
				{t("ui.selectFirstPokemon") || "Selecione o Primeiro Pokémon"}
			</h2>
			<div className="mb-2 px-1">
				<input
					type="text"
					placeholder={t("ui.searchPokemon") || "Buscar Pokémon..."}
					value={firstSearchTerm || ""}
					onChange={(e) => setValue("firstSearchTerm", e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				{errors.firstPokemonId && <p className="mt-1 text-sm text-red-500">{errors.firstPokemonId.message}</p>}
			</div>
			<div className="overflow-hidden">
				<PokemonList
					data={pokemonsInfinityData}
					isLoading={isLoadingPokemonsInfinity}
					hasNextPage={hasNextPage || false}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					selectedPokemonId={firstPokemonId && firstPokemonId > 0 ? firstPokemonId : null}
					onSelect={handleSelectFirst}
					searchTerm={firstSearchTerm}
				/>
			</div>
		</div>
	);
}
