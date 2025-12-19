"use client";

import { EightBitButton } from "@/components/common/button/eight-bit-button";
import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface BattleHistoryPaginationProps {
	currentPage: number;
	totalPages?: number;
	handlePrev: () => void;
	handleNext: () => void;
	hasPrev: boolean;
	hasNext: boolean;
	isLoading?: boolean;
}

export function BattleHistoryPagination({
	currentPage,
	totalPages,
	handlePrev,
	handleNext,
	hasPrev,
	hasNext,
	isLoading = false,
}: BattleHistoryPaginationProps) {
	return (
		<div className="flex justify-between items-center gap-4 mt-6">
			<EightBitButton color="yellow" onClick={handlePrev} disabled={!hasPrev || isLoading}>
				<div className="flex items-center gap-2">
					<ArrowLeftIcon className="w-6 h-6" /> Anterior
				</div>
			</EightBitButton>
			<span className={cn("text-zinc-600", pressStart2P.className)}>
				Página <span className={cn(currentPage === 1 ? "text-zinc-400" : "text-zinc-800")}>{currentPage}</span>
				{typeof totalPages === "number" && (
					<>
						{" "}
						de <span className={cn(currentPage === totalPages ? "text-zinc-400" : "text-zinc-800")}>{totalPages}</span>
					</>
				)}
			</span>
			<EightBitButton color="green" onClick={handleNext} disabled={!hasNext || isLoading}>
				<div className="flex items-center gap-2">
					Próxima <ArrowRightIcon className="w-6 h-6" />
				</div>
			</EightBitButton>
		</div>
	);
}
