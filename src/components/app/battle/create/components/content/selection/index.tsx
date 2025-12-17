import { Pokemon } from "@/types/pokemon";
import { useBattleForm } from "../../../hooks/use-battle-form";
import CreateBattleSelectionFirst from "./first";
import CreateBattleSelectionSecondary from "./secondary";

interface CreateBattleSelectionProps {
	battleResult: {
		winner: Pokemon | null;
	} | null;
	isBattling: boolean;
}
export function CreateBattleSelection({ battleResult, isBattling }: CreateBattleSelectionProps) {
	const {
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
	} = useBattleForm();
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
						secondPokemonId={secondPokemonId}
						handleSelectSecond={handleSelectSecond}
					/>
				</div>
			)}
		</div>
	);
}
