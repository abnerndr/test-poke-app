/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AnyType } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, getTranslation } from "./index";

interface I18nContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
	translateStat: (statName: string) => string;
	translateAbility: (abilityName: string) => string;
	translateAbilityEffect: (abilityName: string) => string | null;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguageState] = useState<Language>("pt-BR");

	useEffect(() => {
		const savedLang = localStorage.getItem("pokemon-app-language") as Language;
		if (savedLang && (savedLang === "pt-BR" || savedLang === "en")) {
			setLanguageState(savedLang);
		}
	}, []);

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
		localStorage.setItem("pokemon-app-language", lang);
	};

	const t = (key: string) => {
		const translation = getTranslation(language);
		const keys = key.split(".");

		let value: AnyType<(typeof translation)[keyof typeof translation]> = translation;
		for (const k of keys) {
			value = value?.[k as keyof typeof value];
			if (value === undefined) {
				return key;
			}
		}

		return typeof value === "string" ? value : key;
	};

	const translateStat = (statName: string) => {
		const translation = getTranslation(language);
		return translation.stats[statName as keyof typeof translation.stats] || statName;
	};

	const translateAbility = (abilityName: string) => {
		const translation = getTranslation(language);
		const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
		return translation.abilities[normalizedName as keyof typeof translation.abilities] || abilityName;
	};

	const translateAbilityEffect = (abilityName: string) => {
		const translation = getTranslation(language);
		const normalizedName = abilityName.toLowerCase().replace(/\s+/g, "_");
		return translation.abilityEffects[normalizedName as keyof typeof translation.abilityEffects] || null;
	};

	return (
		<I18nContext.Provider
			value={{
				language,
				setLanguage,
				t,
				translateStat,
				translateAbility,
				translateAbilityEffect,
			}}
		>
			{children}
		</I18nContext.Provider>
	);
}

export function useI18n() {
	const context = useContext(I18nContext);
	if (context === undefined) {
		throw new Error("useI18n must be used within an I18nProvider");
	}
	return context;
}
