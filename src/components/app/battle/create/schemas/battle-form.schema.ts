import { z } from "zod";

export const battleFormSchema = z
	.object({
		firstPokemonId: z.number().refine((val) => val > 0, {
			message: "Selecione o primeiro Pokémon",
		}),
		secondPokemonId: z.number().refine((val) => val > 0, {
			message: "Selecione o segundo Pokémon",
		}),
		firstSearchTerm: z.string().optional(),
		secondSearchTerm: z.string().optional(),
	})
	.refine((data) => data.firstPokemonId !== data.secondPokemonId, {
		message: "Os dois Pokémon devem ser diferentes",
		path: ["secondPokemonId"],
	});

export type BattleFormData = z.infer<typeof battleFormSchema>;
