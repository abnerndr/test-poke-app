import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { AbilitiesDetail } from "../abilities-detail";
import { BaseStats } from "../base-stats";
import { Evolutions } from "../evolutions";
import { PokemonDetail } from "../pokemon-detail";
import { PokemonImage } from "../pokemon-image";
import { Training } from "../training";

interface PokemonDetailsMainContentProps {
	pokemon: Pokemon;
	borderColorClass: string;
}

export function PokemonDetailsMainContent({ pokemon, borderColorClass }: PokemonDetailsMainContentProps) {
	return (
		<div className={cn("border rounded-lg p-6 bg-white shadow-lg", borderColorClass)}>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left Column - Image */}
				<div>
					<PokemonImage pokemon={pokemon} />
				</div>

				{/* Right Column - Data */}
				<div className="space-y-6">
					<PokemonDetail pokemon={pokemon} />
					<Training pokemon={pokemon} />
				</div>
			</div>

			{/* Full Width Sections */}
			<div className="mt-8 space-y-8">
				<BaseStats pokemon={pokemon} />
				<AbilitiesDetail pokemon={pokemon} />
				<Evolutions pokemon={pokemon} />
			</div>
		</div>
	);
}
