"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface UseBattleHistoryPaginationProps {
	totalBattles: number;
	itemsPerPage?: number;
}

export function useBattleHistoryPagination({
	totalBattles,
	itemsPerPage = 10,
}: UseBattleHistoryPaginationProps) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const currentPage = parseInt(searchParams.get("page") || "1", 10);
	const totalPages = Math.ceil(totalBattles / itemsPerPage);

	const paginatedBattles = <T,>(battles: T[]): T[] => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return battles.slice(startIndex, endIndex);
	};

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (page === 1) {
			params.delete("page");
		} else {
			params.set("page", page.toString());
		}
		router.push(`/pokemon/battle/history?${params.toString()}`);
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	const handlePrev = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	return {
		currentPage,
		totalPages,
		itemsPerPage,
		paginatedBattles,
		handleNext,
		handlePrev,
		goToPage,
		hasNext: currentPage < totalPages,
		hasPrev: currentPage > 1,
	};
}

