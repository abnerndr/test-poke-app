export interface Battle {
	id: string;
	firstPokemonId: number;
	secondPokemonId: number;
	winnerId: number | null;
	occurredAt: Date;
	metadata: BattleMetadata;
}

export interface CreateBattle {
	firstPokemonId: number;
	secondPokemonId: number;
}

export interface BattleQueryParams {
	order?: "desc" | "asc" | undefined;
	limit?: number | undefined;
	offset?: number | undefined;
}

type BattleMetadata =
	| {
			winnerId?: number;
			reason?: string;
			percentage?: number;
			percentageLoser?: number;
	  }
	| Record<string, unknown>
	| null;
