import { Pokemons } from "@/types/pokemons";
import { useState } from "react";
import { usePokemons } from "./use-pokemons";

interface UseListProps {
	pokemonData: Pokemons | undefined;
	isLoading: boolean;
	error: Error | null;
	handleNext: () => void;
	handlePrev: () => void;
	offset: number;
	limit: number;
}

export function useList(): UseListProps {
	const [offset, setOffset] = useState(0);
	const limit = 24;
	const { data: pokemonData, isLoading, error } = usePokemons({ limit, offset });

	const handleNext = () => {
		if (pokemonData?.next) {
			try {
				const url = new URL(pokemonData.next);
				const nextOffset = url.searchParams.get("offset");
				if (nextOffset) {
					setOffset(parseInt(nextOffset, 10));
				}
			} catch {
				const match = pokemonData.next.match(/offset=(\d+)/);
				if (match) {
					setOffset(parseInt(match[1], 10));
				}
			}
		}
	};

	const handlePrev = () => {
		if (pokemonData?.previous) {
			try {
				const url = new URL(pokemonData.previous);
				const prevOffset = url.searchParams.get("offset");
				if (prevOffset) {
					setOffset(parseInt(prevOffset, 10));
				} else {
					setOffset(0);
				}
			} catch {
				setOffset(Math.max(0, offset - limit));
			}
		} else {
			setOffset(0);
		}
	};

	return {
		pokemonData,
		isLoading,
		error,
		handleNext,
		handlePrev,
		offset,
		limit,
	};
}
