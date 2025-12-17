"use client";

import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import { CreateBattleAnimation } from "./components/content/animation";
import { CreateBattleHeader } from "./components/content/header";
import { CreateBattlePreview } from "./components/content/preview";
import { CreateBattleResult } from "./components/content/result";
import { CreateBattleSelection } from "./components/content/selection";
import { CreateBattleStart } from "./components/content/start";
import { useBattle } from "./hooks/use-battle";
import { useBattleForm } from "./hooks/use-battle-form";

export default function CreateBattle() {
	const [battleResult, setBattleResult] = useState<{ winner: Pokemon | null } | null>(null);

	const {
		handleSubmit,
		isLoadingDetails,
		firstPokemonId,
		secondPokemonId,
		firstPokemon,
		secondPokemon,
		reset,
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
	} = useBattleForm();

	const { handleCreateBattle, canStartBattle, handleNewBattle, isBattling } = useBattle({
		firstPokemonId: firstPokemonId || 0,
		secondPokemonId: secondPokemonId || 0,
		firstPokemon,
		secondPokemon,
		onBattleResultChange: setBattleResult,
		onFormReset: reset,
	});

	return (
		<div className="p-4 max-w-7xl mx-auto">
			{/* Header */}
			<CreateBattleHeader />
			{/* Resultado da batalha */}
			<CreateBattleResult handleNewBattle={handleNewBattle} battleResult={battleResult} />
			{/* Animação de batalha */}
			<CreateBattleAnimation
				firstPokemon={firstPokemon || null}
				secondPokemon={secondPokemon || null}
				isBattling={isBattling}
			/>
			{/* Seleção de pokemons */}
			<CreateBattleSelection
				battleResult={battleResult}
				isBattling={isBattling}
				errors={errors}
				setValue={setValue}
				firstSearchTerm={firstSearchTerm}
				secondSearchTerm={secondSearchTerm}
				pokemonsInfinityData={pokemonsInfinityData}
				isLoadingPokemonsInfinity={isLoadingPokemonsInfinity}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
				handleSelectFirst={handleSelectFirst}
				handleSelectSecond={handleSelectSecond}
				firstPokemonId={firstPokemonId}
				secondPokemonId={secondPokemonId}
			/>
			{/* Preview dos pokemons selecionados */}
			<CreateBattlePreview
				battleResult={battleResult}
				isBattling={isBattling}
				firstPokemonId={firstPokemonId}
				secondPokemonId={secondPokemonId}
				firstPokemon={firstPokemon || null}
				secondPokemon={secondPokemon || null}
				isLoadingDetails={isLoadingDetails}
			/>
			{/* Botão de iniciar batalha */}
			<CreateBattleStart
				canStartBattle={canStartBattle}
				handleSubmit={handleSubmit}
				handleCreateBattle={handleCreateBattle}
				isLoadingDetails={isLoadingDetails}
			/>
		</div>
	);
}
