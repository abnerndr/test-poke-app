import { en } from "./translations/en";
import { ptBR } from "./translations/pt-BR";

export type Language = "pt-BR" | "en";
export type TranslationKey = keyof typeof ptBR;

const translations = {
	"pt-BR": ptBR,
	en: en,
};

export function getTranslation(lang: Language = "pt-BR") {
	return translations[lang] || translations["pt-BR"];
}

export function translate(key: string, lang: Language = "pt-BR"): string {
	const translation = getTranslation(lang);
	const keys = key.split(".");

	let value: any = translation;
	for (const k of keys) {
		value = value?.[k];
		if (value === undefined) {
			return key; // Retorna a chave se não encontrar tradução
		}
	}

	return typeof value === "string" ? value : key;
}

// Função helper para traduzir nomes de stats
export function translateStat(statName: string, lang: Language = "pt-BR"): string {
	const translation = getTranslation(lang);
	return translation.stats[statName as keyof typeof translation.stats] || statName;
}

// Função helper para traduzir nomes de habilidades
export function translateAbility(abilityName: string, lang: Language = "pt-BR"): string {
	const translation = getTranslation(lang);
	const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
	return translation.abilities[normalizedName as keyof typeof translation.abilities] || abilityName;
}

// Função helper para traduzir efeitos de habilidades
export function translateAbilityEffect(abilityName: string, lang: Language = "pt-BR"): string | null {
	const translation = getTranslation(lang);
	const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
	return translation.abilityEffects[normalizedName as keyof typeof translation.abilityEffects] || null;
}

