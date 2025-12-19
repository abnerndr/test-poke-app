"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { Pokemons } from "@/types/pokemons";
import { useEffect, useRef, useState } from "react";
import { PokemonCards } from "./components/card";
import { PokemonListHeader } from "./components/header";
import { PokemonPagination } from "./components/pagination";
import { useInfinityPokemons } from "./hooks/use-infinity-pokemons";
import { useList } from "./hooks/use-list";

export default function PokemonList() {
	const { pokemonData, isLoading, error, handleNext, handlePrev, offset, limit } = useList();
	const [searchTerm, setSearchTerm] = useState("");

	const {
		data: pokemonsInfinityData,
		isLoading: isLoadingPokemonsInfinity,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfinityPokemons({ limit: 60 });

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!searchTerm || !hasNextPage || isFetchingNextPage) return;

		const allLoadedPokemons = pokemonsInfinityData?.pages.flatMap((page) => page.items || page.results || []) || [];
		const hasResults = allLoadedPokemons.some((pokemon) =>
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		const loadedPages = pokemonsInfinityData?.pages.length || 0;
		if (!hasResults && loadedPages < 5) {
			const timer = setTimeout(() => {
				fetchNextPage();
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [searchTerm, hasNextPage, isFetchingNextPage, fetchNextPage, pokemonsInfinityData]);

	useEffect(() => {
		if (!searchTerm || !hasNextPage || isFetchingNextPage) return;

		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			if (scrollHeight - scrollTop - clientHeight < 200) {
				fetchNextPage();
			}
		};

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [searchTerm, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const allPokemonsForSearch: Pokemons | null =
		searchTerm && pokemonsInfinityData
			? {
					count: pokemonsInfinityData.pages[0]?.count || 0,
					next: pokemonsInfinityData.pages[pokemonsInfinityData.pages.length - 1]?.next || null,
					previous: null,
					items: pokemonsInfinityData.pages.flatMap((page) => page.items || page.results || []),
			  }
			: null;

	const displayData = searchTerm ? allPokemonsForSearch : pokemonData;
	const displayIsLoading = searchTerm ? isLoadingPokemonsInfinity : isLoading;

	if (error) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-600">Erro ao carregar pokemons. Tente novamente.</p>
			</div>
		);
	}

	if (displayIsLoading && (!displayData || !displayData.items || displayData.items.length === 0)) {
		return <LoadingScreen />;
	}

	if (!displayData || !displayData.items || displayData.items.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600">Nenhum pokemon encontrado</p>
			</div>
		);
	}

	return (
		<div className="p-4 max-w-7xl mx-auto">
			{/* Header */}
			<PokemonListHeader
				data={searchTerm ? allPokemonsForSearch ?? pokemonData! : pokemonData!}
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
			/>
			{/* Cards */}
			<div ref={scrollContainerRef} className={searchTerm ? "max-h-[600px] overflow-y-auto" : ""}>
				<PokemonCards data={displayData} searchTerm={searchTerm} />
				{/* Indicador de carregamento quando buscar */}
				{searchTerm && isFetchingNextPage && (
					<div className="text-center py-4">
						<p className="text-gray-500 text-sm">Carregando mais pokemons...</p>
					</div>
				)}
			</div>
			{/* Pagination - só mostra quando não houver busca */}
			{!searchTerm && (
				<PokemonPagination
					handlePrev={handlePrev}
					handleNext={handleNext}
					previous={pokemonData?.previous ?? ""}
					count={pokemonData?.count ?? 0}
					next={pokemonData?.next ?? ""}
					isLoading={isLoading}
					offset={offset}
					limit={limit}
				/>
			)}
		</div>
	);
}
