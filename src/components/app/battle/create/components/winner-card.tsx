"use client";

import { useI18n } from "@/lib/i18n/context";
import { useTranslatedPokemon } from "@/lib/i18n/pokemon-translations";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../../../pokemon/list/utils/get-pokemon-color";

interface WinnerCardProps {
	pokemon: Pokemon;
}

export function WinnerCard({ pokemon }: WinnerCardProps) {
	const { t } = useI18n();
	const { translatedPokemon } = useTranslatedPokemon(pokemon);
	const displayPokemon = translatedPokemon || pokemon;

	const bgColorClass = getPokemonColorClass(displayPokemon?.color?.name);
	const borderColorClass = getPokemonBorderColorClass(displayPokemon?.color?.name);
	const mainImage =
		displayPokemon.pictures?.find((pic) => pic.url.includes("official-artwork")) || displayPokemon.pictures?.[0];

	return (
		<div
			className={cn(
				"border-4 border-yellow-400 rounded-lg p-8 shadow-2xl animate-scale-in",
				bgColorClass,
				borderColorClass
			)}
		>
			<div className="text-center">
				<div className="mb-4">
					<span className="text-2xl font-bold text-yellow-600 animate-pulse">🏆 {t("ui.winner") || "Vencedor"} 🏆</span>
				</div>

				{mainImage?.url && (
					<div className="flex justify-center mb-4">
						<div className="relative w-64 h-64">
							<Image
								src={mainImage.url}
								alt={displayPokemon.name}
								className="object-contain"
								width={256}
								height={256}
							/>
						</div>
					</div>
				)}

				<h2 className="text-3xl font-bold capitalize mb-2">{displayPokemon.name}</h2>
				<p className="text-gray-600">#{String(displayPokemon.id).padStart(4, "0")}</p>
			</div>
		</div>
	);
}
