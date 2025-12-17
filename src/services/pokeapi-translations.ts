// Serviço para buscar traduções da PokeAPI oficial
// A PokeAPI tem suporte a múltiplos idiomas através dos endpoints de species e abilities

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export type LanguageCode = "pt-BR" | "en";
const POKEAPI_LANGUAGE_MAP: Record<LanguageCode, number> = {
	"pt-BR": 8, // Portuguese
	en: 9, // English
};

interface PokeAPISpeciesResponse {
	names: Array<{
		language: { name: string; url: string };
		name: string;
	}>;
}

interface PokeAPIAbilityResponse {
	names: Array<{
		language: { name: string; url: string };
		name: string;
	}>;
	effect_entries: Array<{
		language: { name: string; url: string };
		effect: string;
		short_effect: string;
	}>;
}

// Cache para evitar múltiplas requisições
const translationCache = new Map<string, string>();

export class PokeAPITranslationService {
	private static async fetchFromPokeAPI(url: string): Promise<any> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch from PokeAPI: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error("Error fetching from PokeAPI:", error);
			return null;
		}
	}

	/**
	 * Busca o nome traduzido de um Pokémon através da URL da species
	 */
	static async getPokemonName(speciesUrl: string, lang: LanguageCode = "pt-BR"): Promise<string | null> {
		const cacheKey = `pokemon-name-${speciesUrl}-${lang}`;
		if (translationCache.has(cacheKey)) {
			return translationCache.get(cacheKey) || null;
		}

		try {
			const data: PokeAPISpeciesResponse = await this.fetchFromPokeAPI(speciesUrl);
			if (!data) return null;

			const languageId = POKEAPI_LANGUAGE_MAP[lang];
			const translatedName = data.names?.find((n) => {
				// Extrai o ID do idioma da URL (formato: https://pokeapi.co/api/v2/language/8/)
				const urlParts = n.language.url.split("/").filter(Boolean);
				const langId = parseInt(urlParts[urlParts.length - 1]);
				return langId === languageId;
			});

			if (translatedName) {
				translationCache.set(cacheKey, translatedName.name);
				return translatedName.name;
			}

			return null;
		} catch (error) {
			console.error(`Error translating Pokemon name for ${speciesUrl}:`, error);
			return null;
		}
	}

	/**
	 * Busca o nome e efeito traduzido de uma habilidade através da URL da ability
	 */
	static async getAbilityTranslation(
		abilityUrl: string,
		lang: LanguageCode = "pt-BR"
	): Promise<{ name: string; effect: string; short_effect: string } | null> {
		const cacheKey = `ability-${abilityUrl}-${lang}`;
		if (translationCache.has(cacheKey)) {
			const cached = translationCache.get(cacheKey);
			if (cached) return JSON.parse(cached);
		}

		try {
			const data: PokeAPIAbilityResponse = await this.fetchFromPokeAPI(abilityUrl);
			if (!data) {
				console.warn(`No data returned from PokeAPI for ability: ${abilityUrl}`);
				return null;
			}

			const languageId = POKEAPI_LANGUAGE_MAP[lang];
			
			// Busca nome traduzido
			const translatedName = data.names?.find((n) => {
				const urlParts = n.language.url.split("/").filter(Boolean);
				const langId = parseInt(urlParts[urlParts.length - 1]);
				return langId === languageId;
			});

			// Busca efeitos traduzidos
			const translatedEffect = data.effect_entries?.find((e) => {
				const urlParts = e.language.url.split("/").filter(Boolean);
				const langId = parseInt(urlParts[urlParts.length - 1]);
				return langId === languageId;
			});

			// Se encontrou pelo menos o nome ou o efeito, retorna a tradução
			if (translatedName || translatedEffect) {
				const result = {
					name: translatedName?.name || "",
					effect: translatedEffect?.effect || "",
					short_effect: translatedEffect?.short_effect || "",
				};

				// Debug: log para verificar o que está sendo retornado
				if (lang === "pt-BR" && translatedEffect) {
					console.log(`Tradução de ability ${abilityUrl}:`, {
						hasEffect: !!result.effect && result.effect.trim().length > 0,
						hasShortEffect: !!result.short_effect && result.short_effect.trim().length > 0,
						effectLength: result.effect?.length || 0,
						shortEffectLength: result.short_effect?.length || 0,
						effectPreview: result.effect?.substring(0, 100),
						shortEffectPreview: result.short_effect?.substring(0, 100),
					});
				}
				
				// Só cacheia se tiver pelo menos nome ou efeito válido
				if (result.name || result.effect || result.short_effect) {
					translationCache.set(cacheKey, JSON.stringify(result));
				}
				
				return result;
			}

			console.warn(`No translation found for ability ${abilityUrl} in language ${lang} (ID: ${languageId})`);
			return null;
		} catch (error) {
			console.error(`Error translating ability for ${abilityUrl}:`, error);
			return null;
		}
	}

	/**
	 * Limpa o cache de traduções
	 */
	static clearCache(): void {
		translationCache.clear();
	}
}

