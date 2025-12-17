"use client";

import { EightBitButton } from "@/components/common/button/eight-bit-button";
import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { BattleHistoryItem } from "./components/battle-history-item";
import { BattleHistoryPagination } from "./components/battle-history-pagination";
import { BattleHistoryError } from "./components/content/error";
import { BattleHistoryLoading } from "./components/content/loading";
import { BattleHistoryNotFound } from "./components/content/not-found";
import { useBattleHistory } from "./hooks/use-battle-history";
import { useBattleHistoryPagination } from "./hooks/use-battle-history-pagination";
import { useBattles } from "./hooks/use-battles";

export default function BattleHistory() {
	const { t } = useI18n();
	const { data: battles, isLoading, error } = useBattles();
	const allBattleHistory = useBattleHistory(battles || []);
	const { paginatedBattles, currentPage, totalPages, handleNext, handlePrev, hasNext, hasPrev } =
		useBattleHistoryPagination({
			totalBattles: battles?.length || 0,
			itemsPerPage: 10,
		});

	const paginatedHistory = paginatedBattles(allBattleHistory);

	if (isLoading) {
		return <BattleHistoryLoading />;
	}

	if (error) {
		return <BattleHistoryError />;
	}

	if (!battles || battles.length === 0) {
		return <BattleHistoryNotFound />;
	}

	return (
		<div className="p-4 max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className={cn("text-2xl font-bold", pressStart2P.className)}>
					{t("ui.battleHistory") || "Histórico de Batalhas"}
				</h1>
				<Link href="/pokemon/battle">
					<EightBitButton color="blue">
						<div className="flex items-center gap-2">
							<ArrowLeftIcon className="w-4 h-4" /> {t("ui.backToBattle") || "Voltar para Batalha"}
						</div>
					</EightBitButton>
				</Link>
			</div>
			<div className="space-y-4">
				{paginatedHistory.map((battleData) => (
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
			{totalPages > 1 && (
				<BattleHistoryPagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePrev={handlePrev}
					handleNext={handleNext}
					hasPrev={hasPrev}
					hasNext={hasNext}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
}
