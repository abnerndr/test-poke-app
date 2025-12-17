"use client";

import { battleService } from "@/services/battle";
import { Battle } from "@/types/battle";
import { useQuery } from "@tanstack/react-query";

export function useBattles() {
	return useQuery<Battle[], Error>({
		queryKey: ["get-battles"],
		queryFn: () => battleService.getBattles(),
	});
}
