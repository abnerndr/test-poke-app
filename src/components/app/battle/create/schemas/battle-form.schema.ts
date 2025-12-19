import { z } from "zod";

export const battleFormSchema = z
	.object({
		firstPokemonId: z.number().min(1),
		secondPokemonId: z.number().min(1),
		firstSearchTerm: z.string().optional(),
		secondSearchTerm: z.string().optional(),
	})
	.refine((data) => data.firstPokemonId !== data.secondPokemonId, {
		path: ["secondPokemonId"],
	});

export type BattleFormData = z.infer<typeof battleFormSchema>;
