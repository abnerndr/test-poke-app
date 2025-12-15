import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { getEVFields } from "../utils/get-ev";

interface TrainingProps {
	pokemon: Pokemon;
}

export function Training({ pokemon }: TrainingProps) {
	const evYield = getEVFields(pokemon.stats || []);
	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>Training</h2>
			<div className="space-y-2">
				<div>
					<span className="font-semibold">EV yield:</span> {evYield}
				</div>
				<div>
					<span className="font-semibold">Base Exp.:</span> {pokemon.base_experience || "N/A"}
				</div>
			</div>
		</div>
	);
}
