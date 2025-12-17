"use client";

import { Pokemon } from "@/types/pokemon";
import { useMemo } from "react";
import { useI18n } from "./context";

export function useTranslatedPokemon(pokemon: Pokemon | undefined) {
	const { language, translateAbility, translateAbilityEffect } = useI18n();

	const translatedPokemon = useMemo(() => {
		if (!pokemon) {
			return undefined;
		}

		if (language === "en") {
			return pokemon;
		}

		// Traduz habilidades usando traduções locais
		const translatedAbilities = (pokemon.abilities || []).map((ability) => {
			const translatedName = translateAbility(ability.name);
			const translatedEffect = translateAbilityEffect(ability.name);

			return {
				...ability,
				name: translatedName,
				short_effect: translatedEffect || ability.short_effect,
			};
		});

		const translatedEvolutions = pokemon.evolutions
			? {
					first: pokemon.evolutions.first,
					second: pokemon.evolutions.second,
					third: pokemon.evolutions.third,
			  }
			: undefined;

		return {
			...pokemon,
			abilities: translatedAbilities,
			evolutions: translatedEvolutions,
		};
	}, [pokemon, language, translateAbility, translateAbilityEffect]);

	return { translatedPokemon, isTranslating: false };
}
