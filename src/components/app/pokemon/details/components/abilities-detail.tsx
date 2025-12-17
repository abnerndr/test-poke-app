import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";

interface AbilitiesDetailProps {
	pokemon: Pokemon;
}

export function AbilitiesDetail({ pokemon }: AbilitiesDetailProps) {
	const { t, translateAbility } = useI18n();
	const abilities = pokemon.abilities || [];
	if (abilities.length === 0) return null;

	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>{t("ui.abilities")}</h2>
			<div className="space-y-4">
				{abilities.map((ability, index) => {
					const displayName = ability.name || translateAbility(ability.name);

					return (
						<div key={index} className="border rounded-lg p-4">
							<div className="flex items-center gap-2 mb-2">
								<span className={cn("font-bold capitalize text-xs", pressStart2P.className)}>{displayName}</span>
								{ability.is_hidden && (
									<span className={cn("text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded", pressStart2P.className)}>
										{t("ui.hiddenAbility")}
									</span>
								)}
							</div>
							{ability.effect && <p className="text-sm text-gray-600">{ability.effect}</p>}
							{!ability.effect && ability.short_effect && (
								<details className="mt-2">
									<summary className="text-sm text-blue-600 cursor-pointer hover:underline">
										{t("ui.showFullEffect")}
									</summary>
									<p className="text-sm text-gray-600 mt-2">{ability.short_effect}</p>
								</details>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
