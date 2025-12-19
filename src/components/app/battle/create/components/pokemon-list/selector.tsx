"use client";

import { cn } from "@/lib/utils";
import { PokemonItem } from "@/types/pokemons";
import Image from "next/image";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../../../../pokemon/list/utils/get-pokemon-color";

interface PokemonSelectorProps {
	pokemon: PokemonItem;
	isSelected: boolean;
	isDisabled?: boolean;
	onSelect: (pokemon: PokemonItem) => void;
}

export function PokemonSelector({ pokemon, isSelected, isDisabled = false, onSelect }: PokemonSelectorProps) {
	const bgColorClass = getPokemonColorClass(pokemon?.color?.name);
	const borderColorClass = getPokemonBorderColorClass(pokemon?.color?.name);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (isDisabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		onSelect(pokemon);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isDisabled}
			className={cn(
				"rounded-lg p-2 sm:p-3 transition-all text-left w-full min-w-0 box-border",
				bgColorClass,
				isDisabled
					? "opacity-50 cursor-not-allowed grayscale"
					: "cursor-pointer",
				isSelected
					? "border-2 border-blue-500 shadow-lg shadow-blue-500/50"
					: cn("border", borderColorClass, !isDisabled && "hover:shadow-md")
			)}
		>
			<div className="flex flex-col items-center text-center min-w-0">
				{pokemon?.pictures && pokemon.pictures.length > 0 && pokemon.pictures[0]?.url && (
					<div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2 shrink-0">
						<Image
							width={64}
							height={64}
							src={pokemon.pictures[0].url}
							alt={pokemon?.name || "Pokemon"}
							className="w-full h-full object-contain"
						/>
					</div>
				)}
				<h3 className="font-bold text-xs sm:text-sm capitalize text-zinc-800 truncate w-full px-1">
					{pokemon?.name || "Unknown"}
				</h3>
				{pokemon?.id && <p className="text-gray-400 text-[10px] sm:text-xs font-semibold">#{pokemon.id}</p>}
			</div>
		</button>
	);
}
