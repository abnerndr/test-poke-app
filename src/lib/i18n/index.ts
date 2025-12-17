import { AnyType } from "@/types/types";
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

	let value: AnyType<(typeof translation)[keyof typeof translation]> = translation;
	for (const k of keys) {
		value = value?.[k as keyof typeof value];
		if (value === undefined) {
			return key;
		}
	}

	return typeof value === "string" ? value : key;
}

export function translateStat(statName: string, lang: Language = "pt-BR"): string {
	const translation = getTranslation(lang);
	return translation.stats[statName as keyof typeof translation.stats] || statName;
}

export function translateAbility(abilityName: string, lang: Language = "pt-BR"): string {
	const translation = getTranslation(lang);
	const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
	return translation.abilities[normalizedName as keyof typeof translation.abilities] || abilityName;
}

export function translateAbilityEffect(abilityName: string, lang: Language = "pt-BR"): string | null {
	const translation = getTranslation(lang);
	const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
	return translation.abilityEffects[normalizedName as keyof typeof translation.abilityEffects] || null;
}
