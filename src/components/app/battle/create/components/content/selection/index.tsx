import { Pokemon } from "@/types/pokemon";
import { PokemonItem, Pokemons } from "@/types/pokemons";
import { InfiniteData } from "@tanstack/react-query";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { BattleFormData } from "../../../schemas/battle-form.schema";
import CreateBattleSelectionFirst from "./first";
import CreateBattleSelectionSecondary from "./secondary";

interface CreateBattleSelectionProps {
	battleResult: {
		winner: Pokemon | null;
	} | null;
	isBattling: boolean;
	errors: FieldErrors<BattleFormData>;
	setValue: UseFormSetValue<BattleFormData>;
	firstSearchTerm: string | undefined;
	secondSearchTerm: string | undefined;
	pokemonsInfinityData: InfiniteData<Pokemons, unknown> | undefined;
	isLoadingPokemonsInfinity: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	handleSelectFirst: (pokemon: PokemonItem) => void;
	handleSelectSecond: (pokemon: PokemonItem) => void;
	firstPokemonId: number;
	secondPokemonId: number;
}
export function CreateBattleSelection({
	battleResult,
	isBattling,
	errors,
	setValue,
	firstSearchTerm,
	secondSearchTerm,
	pokemonsInfinityData,
	isLoadingPokemonsInfinity,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	handleSelectFirst,
	handleSelectSecond,
	firstPokemonId,
	secondPokemonId,
}: CreateBattleSelectionProps) {
	return (
		<div>
			{!battleResult && !isBattling && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
					{/* Lado Esquerdo */}
					<CreateBattleSelectionFirst
						firstSearchTerm={firstSearchTerm}
						setValue={setValue}
						errors={errors}
						pokemonsInfinityData={pokemonsInfinityData}
						isLoadingPokemonsInfinity={isLoadingPokemonsInfinity}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
						firstPokemonId={firstPokemonId}
						secondPokemonId={secondPokemonId}
						handleSelectFirst={handleSelectFirst}
					/>

					{/* Lado Direito */}
					<CreateBattleSelectionSecondary
						secondSearchTerm={secondSearchTerm}
						setValue={setValue}
						errors={errors}
						pokemonsInfinityData={pokemonsInfinityData}
						isLoadingPokemonsInfinity={isLoadingPokemonsInfinity}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
						firstPokemonId={firstPokemonId}
						secondPokemonId={secondPokemonId}
						handleSelectSecond={handleSelectSecond}
					/>
				</div>
			)}
		</div>
	);
}
