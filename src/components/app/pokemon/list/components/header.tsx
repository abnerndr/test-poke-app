import { pressStart2P } from "@/lib/fonts/press-start";
import { Pokemons } from "@/types/pokemons";
import { cn } from "tailwind-variants";

interface PokemonListHeaderProps {
	data: Pokemons;
}

export function PokemonListHeader({ data }: PokemonListHeaderProps) {
	return (
		<div className="mb-6">
			<h1 className={cn("text-2xl font-bold mb-2", pressStart2P.className)}>Lista de Pokemons</h1>
			{data && data.items && (
				<p className={cn("text-zinc-600", pressStart2P.className)}>
					Mostrando {data.items.length} de {data.count ?? 0} pokemon
					{data.count !== 1 ? "s" : ""}
				</p>
			)}
		</div>
	);
}
