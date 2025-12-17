"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../list/utils/get-pokemon-color";
import { AbilitiesDetail } from "./components/abilities-detail";
import { BaseStats } from "./components/base-stats";
import { Evolutions } from "./components/evolutions";
import { PokemonDetail } from "./components/pokemon-detail";
import { PokemonImage } from "./components/pokemon-image";
import { Training } from "./components/training";
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
				<div className="mb-6">
					<Link href={getBackUrl()} className={cn("mb-4 inline-block", pressStart2P.className)}>
						<div className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800">
							<ArrowLeftIcon className="w-6 h-6 mb-1" /> <span className="text-xs ">{t("ui.backToList")}</span>
						</div>
					</Link>
					<div className="flex items-center gap-2">
						<h1 className={cn("text-3xl font-bold capitalize mb-2", pressStart2P.className)}>{pokemon.name}</h1>
						{isTranslating && (
							<span className="text-xs text-gray-500 animate-pulse" title={t("ui.loading")}>
								...
							</span>
						)}
					</div>
					<p className="text-gray-600">
						{t("ui.nationalNumber")} {String(pokemon.id).padStart(4, "0")}
					</p>
				</div>

				{/* Main Content */}
				<div className={cn("border rounded-lg p-6 bg-white shadow-lg", borderColorClass)}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Left Column - Image */}
						<div>
							<PokemonImage pokemon={pokemon} />
						</div>

						{/* Right Column - Data */}
						<div className="space-y-6">
							<PokemonDetail pokemon={pokemon} />
							<Training pokemon={pokemon} />
						</div>
					</div>

					{/* Full Width Sections */}
					<div className="mt-8 space-y-8">
						<BaseStats pokemon={pokemon} />
						<AbilitiesDetail pokemon={pokemon} />
						<Evolutions pokemon={pokemon} />
					</div>
				</div>
			</div>
		</div>
	);
}
