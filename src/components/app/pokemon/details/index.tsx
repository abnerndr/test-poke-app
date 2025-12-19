"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../list/utils/get-pokemon-color";
import { PokemonDetailsHeader } from "./components/content/header";
import { PokemonDetailsMainContent } from "./components/content/main";
import { useDetails } from "./hooks/use-details";

export default function PokemonDetails() {
	const { pokemon, isLoading, error, getBackUrl, isTranslating } = useDetails();
	const { t } = useI18n();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-600">{t("errors.loadPokemon")}</p>
				<Link href={getBackUrl()} className="text-blue-600 hover:underline mt-4 inline-block">
					{t("ui.backToList")}
				</Link>
			</div>
		);
	}

	if (!pokemon) {
		return (
			<div className="p-4 text-center">
				<p className="text-gray-600">{t("errors.pokemonNotFound")}</p>
				<Link href={getBackUrl()} className="text-blue-600 hover:underline mt-4 inline-block">
					{t("ui.backToList")}
				</Link>
			</div>
		);
	}

	const bgColorClass = getPokemonColorClass(pokemon?.color?.name);
	const borderColorClass = getPokemonBorderColorClass(pokemon?.color?.name);

	return (
		<div className={cn("min-h-screen p-4", bgColorClass)}>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<PokemonDetailsHeader pokemon={pokemon} isTranslating={isTranslating} getBackUrl={getBackUrl} />
				{/* Main Content */}
				<PokemonDetailsMainContent pokemon={pokemon} borderColorClass={borderColorClass} />
			</div>
		</div>
	);
}
