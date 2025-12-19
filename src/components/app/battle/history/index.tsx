"use client";

import { useI18n } from "@/lib/i18n/context";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BattleHistoryItem } from "./components/battle-history-item";
import { BattleHistoryPagination } from "./components/battle-history-pagination";
import { BattleHistoryError } from "./components/content/error";
import { BattleHistoryLoading } from "./components/content/loading";
import { BattleHistoryNavigation } from "./components/content/navigation";
import { BattleHistoryNotFound } from "./components/content/not-found";
import { useBattleHistory } from "./hooks/use-battle-history";
import { useBattles } from "./hooks/use-battles";

export default function BattleHistory() {
	const { t } = useI18n();
	const router = useRouter();
	const searchParams = useSearchParams();

	const limit = 10;
	const currentPage = useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams]);
	const order = useMemo<"desc" | "asc">(() => (searchParams.get("order") === "asc" ? "asc" : "desc"), [searchParams]);
	const offset = (currentPage - 1) * limit;

	const {
		data: battles,
		isLoading,
		error,
	} = useBattles({
		order,
		limit,
		offset,
	});
	const allBattleHistory = useBattleHistory(battles || []);

	const hasPrev = currentPage > 1;
	const hasNext = !!battles && battles.length === limit;

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (page <= 1) {
			params.delete("page");
		} else {
			params.set("page", page.toString());
		}
		router.push(`/battle/history?${params.toString()}`);
	};

	const handleNext = () => {
		if (!hasNext) return;
		goToPage(currentPage + 1);
	};

	const handlePrev = () => {
		if (!hasPrev) return;
		goToPage(currentPage - 1);
	};

	const handleToggleOrder = () => {
		const params = new URLSearchParams(searchParams.toString());
		const nextOrder: "asc" | "desc" = order === "desc" ? "asc" : "desc";
		params.set("order", nextOrder);
		params.delete("page"); // reset pagina ao mudar ordenação
		router.push(`/battle/history?${params.toString()}`);
	};

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
			{/*  Navigation */}
			<BattleHistoryNavigation handleToggleOrder={handleToggleOrder} order={order} />
			{/*  Battle History */}
			<div className="space-y-4">
				{allBattleHistory.map((battleData) => (
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
			{/*  Pagination */}
			<BattleHistoryPagination
				currentPage={currentPage}
				handlePrev={handlePrev}
				handleNext={handleNext}
				hasPrev={hasPrev}
				hasNext={hasNext}
				isLoading={isLoading}
			/>
		</div>
	);
}
