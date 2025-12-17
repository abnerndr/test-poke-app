"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { PokemonCards } from "./components/card";
import { PokemonListHeader } from "./components/header";
import { PokemonPagination } from "./components/pagination";
import { useList } from "./hooks/use-list";

export default function PokemonList() {
	const { pokemonData, isLoading, error, handleNext, handlePrev, offset, limit } = useList();

	if (error) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-600">Erro ao carregar pokemons. Tente novamente.</p>
			</div>
		);
	}

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!pokemonData || !pokemonData.items) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600">Nenhum pokemon encontrado</p>
			</div>
		);
	}

	return (
		<div className="p-4 max-w-7xl mx-auto">
			{/* Header */}
			<PokemonListHeader data={pokemonData} />
			{/* Cards */}
			<PokemonCards data={pokemonData} />
			{/* Pagination */}
			<PokemonPagination
				handlePrev={handlePrev}
				handleNext={handleNext}
				previous={pokemonData.previous ?? ""}
				count={pokemonData.count ?? 0}
				next={pokemonData.next ?? ""}
				isLoading={isLoading}
				offset={offset}
				limit={limit}
			/>
		</div>
	);
}
