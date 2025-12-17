"use client";

import { useI18n } from "@/lib/i18n/context";
import { useTranslatedPokemon } from "@/lib/i18n/pokemon-translations";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { getPokemonBorderColorClass, getPokemonColorClass } from "../../../pokemon/list/utils/get-pokemon-color";

interface PokemonPreviewProps {
	pokemon: Pokemon | null;
	title: string;
}

export function PokemonPreview({ pokemon, title }: PokemonPreviewProps) {
	const { t, translateAbility } = useI18n();
	const { translatedPokemon } = useTranslatedPokemon(pokemon || undefined);
	const displayPokemon = translatedPokemon || pokemon;

	if (!displayPokemon) {
		return (
			<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
				<p className="text-gray-400">{title}</p>
			</div>
		);
	}

	const bgColorClass = getPokemonColorClass(displayPokemon?.color?.name);
	const borderColorClass = getPokemonBorderColorClass(displayPokemon?.color?.name);
	const mainImage =
		displayPokemon.pictures?.find((pic) => pic.url.includes("official-artwork")) || displayPokemon.pictures?.[0];

	return (
		<div className={cn("border rounded-lg p-6 shadow-lg", bgColorClass, borderColorClass)}>
			<h3 className="text-xl font-bold mb-4 text-center capitalize">{displayPokemon.name}</h3>

			{/* Imagem */}
			{mainImage?.url && (
				<div className="flex justify-center mb-4">
					<div className="relative w-48 h-48">
						<Image src={mainImage.url} alt={displayPokemon.name} className="object-contain" width={192} height={192} />
					</div>
				</div>
			)}

			{/* Habilidades */}
			{displayPokemon.abilities && displayPokemon.abilities.length > 0 && (
				<div className="mt-4">
					<h4 className="font-semibold mb-2 text-sm">{t("ui.abilities")}:</h4>
					<div className="space-y-2">
						{displayPokemon.abilities.map((ability, index) => (
							<div key={index} className="bg-white/50 rounded p-2 text-xs">
								<div className="flex items-center gap-2 mb-1">
									<span className="font-bold capitalize">{translateAbility(ability.name)}</span>
									{ability.is_hidden && (
										<span className="text-xs bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
											{t("ui.hiddenAbility")}
										</span>
									)}
								</div>
								{ability.short_effect && <p className="text-gray-600 text-xs">{ability.short_effect}</p>}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
