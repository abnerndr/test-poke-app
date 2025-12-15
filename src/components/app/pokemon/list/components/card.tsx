"use client";

import { cn } from "@/lib/utils";
import { PokemonItem, Pokemons } from "@/types/pokemons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../utils/get-pokemon-color";

interface PokemonCardsData {
	data: Pokemons;
}

export function PokemonCards({ data }: PokemonCardsData) {
	const searchParams = useSearchParams();
	const items = data.items || data.results || [];

	const getDetailUrl = (id: number) => {
		const params = new URLSearchParams(searchParams.toString());
		return `/pokemon/${id}${params.toString() ? `?${params.toString()}` : ""}`;
	};

	return (
		<div className="grid grid-cols-3 gap-4 mb-6">
			{items.map((pokemon: PokemonItem) => {
				const bgColorClass = getPokemonColorClass(pokemon?.color?.name);
				const borderColorClass = getPokemonBorderColorClass(pokemon?.color?.name);
				return (
					<Link href={getDetailUrl(pokemon?.id)} key={pokemon?.id}>
						<div
							className={cn("border rounded-lg p-4 hover:shadow-md transition-shadow", bgColorClass, borderColorClass)}
						>
							<div className="flex flex-col items-center text-center">
								{pokemon?.pictures && pokemon.pictures.length > 0 && pokemon.pictures[0]?.url && (
									<Image
										priority
										width={96}
										height={96}
										src={pokemon.pictures[0].url}
										alt={pokemon?.name || "Pokemon"}
										className="w-24 h-24 object-contain mb-2"
									/>
								)}
								<h3 className="font-bold text-xl capitalize text-zinc-800">{pokemon?.name || "Unknown"}</h3>
								{pokemon?.id && <p className={cn("text-gray-400 text-lg font-semibold")}>#{pokemon.id}</p>}
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
