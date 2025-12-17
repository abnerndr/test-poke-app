import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { formatHeight, formatWeight } from "../utils/format";

interface PokemonDetailProps {
	pokemon: Pokemon;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
	const { t, translateAbility } = useI18n();

	return (
		<div className={"space-y-4"}>
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>Informações do Pokémon</h2>
			<div className="space-y-4">
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className="font-semibold text-sm">{t("ui.nationalNumber")}:</span>{" "}
					<span className="text-xs text-zinc-600">{String(pokemon.id).padStart(4, "0")}</span>
				</div>
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className="font-semibold text-sm">{t("ui.species")}:</span>{" "}
					<span className="capitalize text-xs text-zinc-600">{pokemon.species?.name || t("ui.notFound")}</span>
				</div>
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className="font-semibold text-sm">{t("ui.height")}:</span>{" "}
					<span className="text-xs text-zinc-600">{formatHeight(pokemon.height)}</span>
				</div>
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className="font-semibold text-sm">{t("ui.weight")}:</span>{" "}
					<span className="text-xs text-zinc-600">{formatWeight(pokemon.weight)}</span>
				</div>
				<div className={pressStart2P.className}>
					<span className={cn("font-semibold text-sm", pressStart2P.className)}>{t("ui.abilities")}:</span>
					<ul className="list-disc list-inside ml-2 mt-1 text-xs text-zinc-600">
						{pokemon.abilities?.map((ability, index) => (
							<li key={index} className="capitalize">
								{translateAbility(ability.name)}
								{ability.is_hidden && (
									<span className="text-gray-500 ml-1">({t("ui.hiddenAbility").toLowerCase()})</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
