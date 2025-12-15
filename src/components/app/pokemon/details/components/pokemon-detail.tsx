import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { formatHeight, formatWeight } from "../utils/format";

interface PokemonDetailProps {
	pokemon: Pokemon;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>Pokédex Data</h2>
			<div className="space-y-2">
				<div>
					<span className="font-semibold">National №:</span> {String(pokemon.id).padStart(4, "0")}
				</div>
				<div>
					<span className="font-semibold">Species:</span>{" "}
					<span className="capitalize">{pokemon.species?.name || "Unknown"}</span>
				</div>
				<div>
					<span className="font-semibold">Height:</span> {formatHeight(pokemon.height)}
				</div>
				<div>
					<span className="font-semibold">Weight:</span> {formatWeight(pokemon.weight)}
				</div>
				<div>
					<span className="font-semibold">Abilities:</span>
					<ul className="list-disc list-inside ml-2 mt-1">
						{pokemon.abilities?.map((ability, index) => (
							<li key={index} className="capitalize">
								{ability.name}
								{ability.is_hidden && <span className="text-gray-500 ml-1">(hidden ability)</span>}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
