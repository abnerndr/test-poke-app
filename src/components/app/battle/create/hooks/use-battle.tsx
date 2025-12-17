"use client";

import { pokemonService } from "@/services/pokemon";
import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import { toast } from "sonner";
import { BattleFormData } from "../schemas/battle-form.schema";
import { useCreateBattle } from "./use-create-battle";

interface UseBattleProps {
	firstPokemonId: number;
	secondPokemonId: number;
	firstPokemon: Pokemon | undefined;
	secondPokemon: Pokemon | undefined;
	onBattleResultChange: (result: { winner: Pokemon | null } | null) => void;
	onFormReset: () => void;
}

export function useBattle({
	firstPokemonId,
	secondPokemonId,
	firstPokemon,
	secondPokemon,
	onBattleResultChange,
	onFormReset,
}: UseBattleProps) {
	const [isBattling, setIsBattling] = useState(false);
	const [battleResult, setBattleResult] = useState<{ winner: Pokemon | null } | null>(null);

	const createBattleMutation = useCreateBattle();

	const handleCreateBattle = async (data: BattleFormData) => {
		if (!data.firstPokemonId || !data.secondPokemonId) {
			toast.error("Erro na validação", {
				description: "Selecione ambos os Pokémon antes de iniciar a batalha",
			});
			return;
		}

		setIsBattling(true);
		setBattleResult(null);
		onBattleResultChange(null);

		toast.loading("Iniciando batalha...", {
			description: "Preparando os combatentes",
			id: "battle-start",
		});

		try {
			const result = await createBattleMutation.mutateAsync({
				firstPokemonId: data.firstPokemonId,
				secondPokemonId: data.secondPokemonId,
			});

			toast.dismiss("battle-start");
			toast.success("Batalha iniciada!", {
				description: "Os Pokémon estão lutando...",
				id: "battle-fighting",
			});

			await new Promise((resolve) => setTimeout(resolve, 2000));

			const winnerId = result.winnerId;
			if (winnerId) {
				let winner: Pokemon | null = null;
				if (winnerId === data.firstPokemonId) {
					winner = firstPokemon || null;
				} else if (winnerId === data.secondPokemonId) {
					winner = secondPokemon || null;
				}

				if (!winner) {
					try {
						winner = await pokemonService.getPokemon(winnerId.toString());
					} catch (error) {
						console.error("Error fetching winner pokemon:", error);
						toast.error("Erro ao buscar vencedor", {
							description: "Não foi possível carregar os detalhes do Pokémon vencedor",
						});
					}
				}

				if (winner) {
					toast.dismiss("battle-fighting");
					toast.success("Batalha finalizada!", {
						description: `${winner.name} venceu a batalha! 🎉`,
						duration: 5000,
					});
				}

				const battleResult = { winner };
				setBattleResult(battleResult);
				onBattleResultChange(battleResult);
			} else {
				const battleResult = { winner: null };
				setBattleResult(battleResult);
				onBattleResultChange(battleResult);
				toast.dismiss("battle-fighting");
				toast.warning("Batalha sem vencedor", {
					description: "A batalha terminou em empate",
				});
			}

			setIsBattling(false);
		} catch (error) {
			console.error("Error creating battle:", error);
			toast.dismiss("battle-start");
			toast.dismiss("battle-fighting");
			toast.error("Erro ao criar batalha", {
				description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
			});
			setIsBattling(false);
		}
	};

	const canStartBattle =
		firstPokemonId && firstPokemonId > 0 && secondPokemonId && secondPokemonId > 0 && !isBattling && !battleResult;

	const handleNewBattle = () => {
		onFormReset();
		setBattleResult(null);
		onBattleResultChange(null);
		toast.info("Nova batalha", {
			description: "Selecione os Pokémon para começar",
		});
	};

	return {
		handleCreateBattle,
		canStartBattle,
		handleNewBattle,
		battleResult,
		isBattling,
	};
}
