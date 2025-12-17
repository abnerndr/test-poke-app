"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { PokemonItem, Pokemons } from "@/types/pokemons";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { PokemonSelector } from "./selector";

interface PokemonListProps {
	data: InfiniteData<Pokemons> | undefined;
	isLoading: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	selectedPokemonId: number | null;
	onSelect: (pokemon: PokemonItem) => void;
	searchTerm?: string;
}

export function PokemonList({
	data,
	isLoading,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	selectedPokemonId,
	onSelect,
	searchTerm = "",
}: PokemonListProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const allPokemons: PokemonItem[] = data?.pages ? data.pages.flatMap((page) => page.items || page.results || []) : [];

	const filteredPokemons = searchTerm
		? allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: allPokemons;

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container || !hasNextPage || isFetchingNextPage) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			if (scrollHeight - scrollTop - clientHeight < 200) {
				fetchNextPage();
			}
		};

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading && allPokemons.length === 0) {
		return <LoadingScreen />;
	}

	return (
		<div ref={scrollContainerRef} className="space-y-2 max-h-[600px] overflow-y-auto overflow-x-hidden">
			{filteredPokemons.length === 0 ? (
				<p className="text-center text-gray-500 py-8">
					{searchTerm ? "Nenhum pokemon encontrado com esse nome" : "Nenhum pokemon encontrado"}
				</p>
			) : (
				<>
					<div className="grid grid-cols-2 gap-2 min-w-0 px-1">
						{filteredPokemons.map((pokemon: PokemonItem) => (
							<PokemonSelector
								key={pokemon.id}
								pokemon={pokemon}
								isSelected={selectedPokemonId === pokemon.id}
								onSelect={onSelect}
							/>
						))}
					</div>
					{/* Indicador de carregamento - só mostra se não estiver filtrando */}
					{!searchTerm && isFetchingNextPage && (
						<div className="text-center py-4">
							<p className="text-gray-500 text-sm">Carregando mais pokemons...</p>
						</div>
					)}
					{/* Indicador de fim - só mostra se não estiver filtrando */}
					{!searchTerm && !hasNextPage && allPokemons.length > 0 && (
						<div className="text-center py-4">
							<p className="text-gray-400 text-sm">Todos os pokemons foram carregados</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
