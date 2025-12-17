import { Pokemon } from "@/types/pokemon";
import { BattleAnimation } from "../battle-animation";

interface CreateBattleAnimationProps {
	firstPokemon: Pokemon | null;
	secondPokemon: Pokemon | null;
	isBattling: boolean;
}

export function CreateBattleAnimation({ firstPokemon, secondPokemon, isBattling }: CreateBattleAnimationProps) {
	return (
		<div>
			{isBattling && (
				<div className="mb-6">
					<BattleAnimation firstPokemon={firstPokemon || null} secondPokemon={secondPokemon || null} />
				</div>
			)}
		</div>
	);
}
