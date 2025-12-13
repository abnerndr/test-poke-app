export interface Battle {
	id: string;
	firstPokemonId: number;
	secondPokemonId: number;
	winnerId: number | null;
	occurredAt: Date;
	metadata: Record<string, unknown> | null;
}

export interface CreateBattle {
	firstPokemonId: number;
	secondPokemonId: number;
}
