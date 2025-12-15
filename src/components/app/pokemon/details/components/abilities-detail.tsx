import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";

interface AbilitiesDetailProps {
	pokemon: Pokemon;
}

export function AbilitiesDetail({ pokemon }: AbilitiesDetailProps) {
	const abilities = pokemon.abilities || [];
	if (abilities.length === 0) return null;

	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>Abilities</h2>
			<div className="space-y-4">
				{abilities.map((ability, index) => (
					<div key={index} className="border rounded-lg p-4">
						<div className="flex items-center gap-2 mb-2">
							<span className="font-bold capitalize">{ability.name}</span>
							{ability.is_hidden && (
								<span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Hidden Ability</span>
							)}
						</div>
						{ability.short_effect && <p className="text-sm text-gray-600">{ability.short_effect}</p>}
						{ability.effect && ability.effect !== ability.short_effect && (
							<details className="mt-2">
								<summary className="text-sm text-blue-600 cursor-pointer hover:underline">Show full effect</summary>
								<p className="text-sm text-gray-600 mt-2">{ability.effect}</p>
							</details>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
