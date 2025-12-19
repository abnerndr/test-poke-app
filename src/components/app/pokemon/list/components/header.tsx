"use client";

import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { Pokemons } from "@/types/pokemons";
import { cn } from "tailwind-variants";

interface PokemonListHeaderProps {
	data: Pokemons;
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export function PokemonListHeader({ data, searchTerm, onSearchChange }: PokemonListHeaderProps) {
	const { t } = useI18n();
	return (
		<div className="mb-6">
			<h1 className={cn("text-2xl font-bold mb-2", pressStart2P.className)}>Lista de Pokemons</h1>
			{/* Campo de busca */}
			<div className="mb-4">
				<input
					type="text"
					placeholder={t("ui.searchPokemon") || "Buscar Pokémon..."}
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>
			{data && data.items && (
				<p className={cn("text-zinc-600", pressStart2P.className)}>
					Mostrando {data.items.length} de {data.count ?? 0} pokemon
					{data.count !== 1 ? "s" : ""}
				</p>
			)}
		</div>
	);
}
