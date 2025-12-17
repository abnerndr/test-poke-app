"use client";

import { useI18n } from "@/lib/i18n/context";
import { BattleHistoryItem } from "./components/battle-history-item";
import { useBattleHistory } from "./hooks/use-battle-history";
import { useBattles } from "./hooks/use-battles";

export default function BattleHistory() {
	const { t } = useI18n();
	const { data: battles, isLoading, error } = useBattles();
	const battleHistory = useBattleHistory(battles || []);

	if (isLoading) {
		return (
			<div className="p-4 max-w-6xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">{t("ui.battleHistory") || "Histórico de Batalhas"}</h1>
				<div className="space-y-4">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="border rounded-lg p-4 animate-pulse">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="w-20 h-20 bg-gray-200 rounded"></div>
									<div className="w-20 h-20 bg-gray-200 rounded"></div>
								</div>
								<div className="w-20 h-20 bg-gray-200 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 max-w-6xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">{t("ui.battleHistory") || "Histórico de Batalhas"}</h1>
				<div className="text-center py-8">
					<p className="text-red-600">{t("errors.loadBattles") || "Erro ao carregar batalhas"}</p>
				</div>
			</div>
		);
	}

	if (!battles || battles.length === 0) {
		return (
			<div className="p-4 max-w-6xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">{t("ui.battleHistory") || "Histórico de Batalhas"}</h1>
				<div className="text-center py-8">
					<p className="text-gray-600">{t("ui.noBattles") || "Nenhuma batalha encontrada"}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">{t("ui.battleHistory") || "Histórico de Batalhas"}</h1>
			<div className="space-y-4">
				{battleHistory.map((battleData) => (
					<BattleHistoryItem
						key={battleData.battle.id}
						battle={battleData.battle}
						firstPokemon={battleData.firstPokemon}
						secondPokemon={battleData.secondPokemon}
						winnerPokemon={battleData.winnerPokemon}
						isLoading={battleData.isLoading}
					/>
				))}
			</div>
		</div>
	);
}
