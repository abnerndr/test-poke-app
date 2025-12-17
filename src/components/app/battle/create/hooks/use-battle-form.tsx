"use client";

import { usePokemon } from "@/components/app/pokemon/details/hooks/use-pokemon";
import { useInfinityPokemons } from "@/components/app/pokemon/list/hooks/use-infinity-pokemons";
import { PokemonItem } from "@/types/pokemons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { BattleFormData, battleFormSchema } from "../schemas/battle-form.schema";

export function useBattleForm() {
	const form = useForm<BattleFormData>({
		resolver: zodResolver(battleFormSchema),
		defaultValues: {
			firstPokemonId: 0,
			secondPokemonId: 0,
			firstSearchTerm: "",
			secondSearchTerm: "",
		},
	});

	const {
		setValue,
		control,
		formState: { errors },
		reset,
		handleSubmit,
	} = form;

	const firstPokemonId = useWatch({ control, name: "firstPokemonId" });
	const secondPokemonId = useWatch({ control, name: "secondPokemonId" });
	const firstSearchTerm = useWatch({ control, name: "firstSearchTerm" });
	const secondSearchTerm = useWatch({ control, name: "secondSearchTerm" });

	const {
		data: pokemonsInfinityData,
		isLoading: isLoadingPokemonsInfinity,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfinityPokemons({ limit: 60 });

	const { data: firstPokemon, isLoading: isLoadingFirst } = usePokemon(
		firstPokemonId && firstPokemonId > 0 ? firstPokemonId.toString() : ""
	);
	const { data: secondPokemon, isLoading: isLoadingSecond } = usePokemon(
		secondPokemonId && secondPokemonId > 0 ? secondPokemonId.toString() : ""
	);

	const handleSelectFirst = (pokemon: PokemonItem) => {
		setValue("firstPokemonId", pokemon.id, {
			shouldValidate: false,
			shouldDirty: true,
			shouldTouch: true,
		});
		toast.info(`${pokemon.name} selecionado como primeiro Pokémon!`, {
			description: "Agora selecione o segundo Pokémon",
		});
	};

	const handleSelectSecond = (pokemon: PokemonItem) => {
		setValue("secondPokemonId", pokemon.id, {
			shouldValidate: false,
			shouldDirty: true,
			shouldTouch: true,
		});
		toast.info(`${pokemon.name} selecionado como segundo Pokémon!`, {
			description: "Pronto para iniciar a batalha",
		});
	};

	const isLoadingDetails = isLoadingFirst || isLoadingSecond;

	return {
		errors,
		handleSubmit,
		setValue,
		firstSearchTerm,
		secondSearchTerm,
		pokemonsInfinityData,
		isLoadingPokemonsInfinity,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		handleSelectFirst,
		handleSelectSecond,
		isLoadingDetails,
		firstPokemonId,
		secondPokemonId,
		firstPokemon,
		secondPokemon,
		reset,
	};
}
