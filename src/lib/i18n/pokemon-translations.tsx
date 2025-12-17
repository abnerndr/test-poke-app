"use client";

import { useI18n } from "./context";
import { Pokemon } from "@/types/pokemon";
import { PokeAPITranslationService, LanguageCode } from "@/services/pokeapi-translations";
import { useState, useEffect, useMemo } from "react";

/**
 * Função helper para construir a URL da ability na PokeAPI
 */
function getAbilityUrl(abilityName: string): string {
	// Normaliza o nome da habilidade para o formato da PokeAPI
	// Remove espaços, converte para minúsculas, substitui espaços por hífens
	let normalized = abilityName.toLowerCase().trim();
	normalized = normalized.replace(/\s+/g, "-");
	normalized = normalized.replace(/'/g, "");
	normalized = normalized.replace(/[^a-z0-9-]/g, "");
	return `https://pokeapi.co/api/v2/ability/${normalized}/`;
}

/**
 * Hook que traduz automaticamente os dados do Pokémon da API
 */
export function useTranslatedPokemon(pokemon: Pokemon | undefined) {
	const { language } = useI18n();
	const [translatedPokemon, setTranslatedPokemon] = useState<Pokemon | undefined>(pokemon);
	const [isTranslating, setIsTranslating] = useState(false);

	const langCode: LanguageCode = language === "pt-BR" ? "pt-BR" : "en";

	useEffect(() => {
		if (!pokemon) {
			setTranslatedPokemon(undefined);
			return;
		}

		// Se já está em inglês e o idioma selecionado é inglês, não precisa traduzir
		if (langCode === "en") {
			setTranslatedPokemon(pokemon);
			return;
		}

		const translateData = async () => {
			setIsTranslating(true);
			try {
				// Traduz nome do Pokémon principal
				let translatedName = pokemon.name;
				if (pokemon.species?.url) {
					const name = await PokeAPITranslationService.getPokemonName(pokemon.species.url, langCode);
					if (name) translatedName = name;
				}

				// Traduz habilidades
				const translatedAbilities = await Promise.all(
					(pokemon.abilities || []).map(async (ability) => {
						const abilityUrl = getAbilityUrl(ability.name);
						const translation = await PokeAPITranslationService.getAbilityTranslation(abilityUrl, langCode);

						if (translation) {
							// Se temos tradução, usa ela (mesmo que alguns campos possam estar vazios)
							// Prioriza sempre a tradução quando disponível, mesmo que seja parcial
							const hasTranslatedEffect = translation.effect && translation.effect.trim().length > 0;
							const hasTranslatedShortEffect = translation.short_effect && translation.short_effect.trim().length > 0;
							
							const result = {
								...ability,
								// Usa nome traduzido se disponível, senão mantém o original
								name: translation.name && translation.name.trim() ? translation.name : ability.name,
								// Usa a tradução do effect se existir e não for vazia, senão mantém o original
								effect: hasTranslatedEffect ? translation.effect : ability.effect,
								// Usa a tradução do short_effect se existir e não for vazia, senão mantém o original
								short_effect: hasTranslatedShortEffect ? translation.short_effect : ability.short_effect,
							};

							// Debug: log quando a tradução é aplicada
							if (langCode === "pt-BR") {
								console.log(`Traduzindo habilidade ${ability.name}:`, {
									original: {
										name: ability.name,
										short_effect: ability.short_effect?.substring(0, 50),
										effect: ability.effect?.substring(0, 50),
									},
									translation: {
										name: translation.name,
										short_effect: translation.short_effect?.substring(0, 50),
										effect: translation.effect?.substring(0, 50),
									},
									result: {
										name: result.name,
										short_effect: result.short_effect?.substring(0, 50),
										effect: result.effect?.substring(0, 50),
										hasEffect: !!result.effect && result.effect.trim().length > 0,
										hasShortEffect: !!result.short_effect && result.short_effect.trim().length > 0,
									},
								});
							}

							return result;
						}

						return ability;
					})
				);

				// Traduz evoluções
				let translatedEvolutions = pokemon.evolutions;
				if (pokemon.evolutions) {
					const translateEvolution = async (evolution: typeof pokemon.evolutions.first) => {
						if (!evolution) return undefined;
						const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${evolution.id}/`;
						const translatedName = await PokeAPITranslationService.getPokemonName(speciesUrl, langCode);
						return {
							...evolution,
							name: translatedName || evolution.name,
						};
					};

					translatedEvolutions = {
						first: await translateEvolution(pokemon.evolutions.first),
						second: await translateEvolution(pokemon.evolutions.second),
						third: await translateEvolution(pokemon.evolutions.third),
					};
				}

				setTranslatedPokemon({
					...pokemon,
					name: translatedName,
					abilities: translatedAbilities,
					evolutions: translatedEvolutions,
				});
			} catch (error) {
				console.error("Error translating Pokemon data:", error);
				setTranslatedPokemon(pokemon); // Fallback para dados originais
			} finally {
				setIsTranslating(false);
			}
		};

		translateData();
	}, [pokemon, langCode]);

	return { translatedPokemon, isTranslating };
}

