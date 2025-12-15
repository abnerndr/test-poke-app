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

type BattleMetadata =
	| {
			winnerId?: number;
			reason?: string;
			percentage?: number;
			percentageLoser?: number;
	  }
	| Record<string, unknown>
	| null;
