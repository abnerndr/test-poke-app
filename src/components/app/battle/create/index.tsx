"use client";

import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import { BattleAnimation } from "./components/battle-animation";
import { PokemonList } from "./components/pokemon-list";
import { PokemonPreview } from "./components/pokemon-preview";
import { WinnerCard } from "./components/winner-card";
import { useBattle } from "./hooks/use-battle";
import { useBattleForm } from "./hooks/use-battle-form";

export default function CreateBattle() {
	const [battleResult, setBattleResult] = useState<{ winner: Pokemon | null } | null>(null);

	const {
		errors,
		handleSubmit,
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
		isLoadingDetails,
		firstPokemonId,
		secondPokemonId,
		firstPokemon,
		secondPokemon,
		reset,
	} = useBattleForm();

	const battle = useBattle({
		firstPokemonId: firstPokemonId || 0,
		secondPokemonId: secondPokemonId || 0,
		firstPokemon,
		secondPokemon,
		onBattleResultChange: setBattleResult,
		onFormReset: reset,
	});

	const { t, handleCreateBattle, canStartBattle, handleNewBattle, isBattling } = battle;

	return (
		<div className="p-4 max-w-7xl mx-auto">
			<h1 className={cn("text-3xl font-bold mb-6 text-center", pressStart2P.className)}>
				{t("ui.createBattle") || "Criar Batalha"}
			</h1>

			{/* Resultado da batalha */}
			{battleResult && battleResult.winner && (
				<div className="mb-6">
					<WinnerCard pokemon={battleResult.winner} />
					<div className="text-center mt-4">
						<button
							onClick={handleNewBattle}
							className={cn("px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors")}
						>
							{t("ui.newBattle") || "Nova Batalha"}
						</button>
					</div>
				</div>
			)}

			{/* Animação de batalha */}
			{isBattling && (
				<div className="mb-6">
					<BattleAnimation firstPokemon={firstPokemon || null} secondPokemon={secondPokemon || null} />
				</div>
			)}

			{/* Seleção de pokemons */}
			{!battleResult && !isBattling && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
					{/* Lado Esquerdo */}
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

					{/* Lado Direito */}
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
							{errors.secondPokemonId && <p className="mt-1 text-sm text-red-500">{errors.secondPokemonId.message}</p>}
						</div>
						<div className="overflow-hidden">
							<PokemonList
								data={pokemonsInfinityData}
								isLoading={isLoadingPokemonsInfinity}
								hasNextPage={hasNextPage || false}
								isFetchingNextPage={isFetchingNextPage}
								fetchNextPage={fetchNextPage}
								selectedPokemonId={secondPokemonId && secondPokemonId > 0 ? secondPokemonId : null}
								onSelect={handleSelectSecond}
								searchTerm={secondSearchTerm}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Preview dos pokemons selecionados */}
			{!battleResult &&
				!isBattling &&
				((firstPokemonId && firstPokemonId > 0) || (secondPokemonId && secondPokemonId > 0)) && (
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
				)}

			{/* Botão de iniciar batalha */}
			{canStartBattle && (
				<div className="mt-8 text-center">
					<button
						onClick={handleSubmit(handleCreateBattle)}
						disabled={!canStartBattle || isLoadingDetails}
						className={cn(
							"px-8 py-4 bg-red-500 text-white rounded-lg font-bold text-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							pressStart2P.className
						)}
					>
						{t("ui.startBattle") || "Iniciar Batalha!"}
					</button>
				</div>
			)}
		</div>
	);
}
