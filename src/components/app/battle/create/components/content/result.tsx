import { useI18n } from "@/lib/i18n/context";
import { Pokemon } from "@/types/pokemon";
import { cn } from "tailwind-variants";
import { WinnerCard } from "../winner-card";

interface CreateBattleResultProps {
	handleNewBattle: () => void;
	battleResult: {
		winner: Pokemon | null;
	} | null;
}

export function CreateBattleResult({ handleNewBattle, battleResult }: CreateBattleResultProps) {
	const { t } = useI18n();
	return (
		<div>
			{battleResult && battleResult.winner && (
				<div className="mb-6">
					<WinnerCard pokemon={battleResult.winner} />
					<div className="text-center mt-4">
						<button
							onClick={handleNewBattle}
							className={cn("px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors")}
						>
							{t("ui.newBattle") || "Nova Batalha"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
