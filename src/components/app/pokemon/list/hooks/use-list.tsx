import { Pokemons } from "@/types/pokemons";
import { useRouter, useSearchParams } from "next/navigation";
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
	const searchParams = useSearchParams();
	const router = useRouter();
	const limit = 24;
	const offset = parseInt(searchParams.get("offset") || "0", 10);
	const { data: pokemonData, isLoading, error } = usePokemons({ limit, offset });

	const updateOffset = (newOffset: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (newOffset === 0) {
			params.delete("offset");
		} else {
			params.set("offset", newOffset.toString());
		}
		router.push(`/pokemon?${params.toString()}`);
	};

	const handleNext = () => {
		if (pokemonData?.next) {
			try {
				const url = new URL(pokemonData.next);
				const nextOffset = url.searchParams.get("offset");
				if (nextOffset) {
					updateOffset(parseInt(nextOffset, 10));
				}
			} catch {
				const match = pokemonData.next.match(/offset=(\d+)/);
				if (match) {
					updateOffset(parseInt(match[1], 10));
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
					updateOffset(parseInt(prevOffset, 10));
				} else {
					updateOffset(0);
				}
			} catch {
				updateOffset(Math.max(0, offset - limit));
			}
		} else {
			updateOffset(0);
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
