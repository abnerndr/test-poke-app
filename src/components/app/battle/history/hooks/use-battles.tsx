"use client";

import { battleService } from "@/services/battle";
import { Battle, BattleQueryParams } from "@/types/battle";
import { useQuery } from "@tanstack/react-query";

export function useBattles(params: BattleQueryParams) {
	return useQuery<Battle[], Error>({
		queryKey: ["get-battles", params],
		queryFn: () => battleService.getBattles(params),
	});
}
