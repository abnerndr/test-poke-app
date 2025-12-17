import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { calculateMinMax } from "../utils/calculate";
import { getStatBarColor } from "../utils/get-stats-bar-code";

interface BaseStatsProps {
	pokemon: Pokemon;
}

export function BaseStats({ pokemon }: BaseStatsProps) {
	const { t, translateStat } = useI18n();
	const stats = pokemon.stats || [];
	const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
	const maxStatValue = Math.max(...stats.map((s) => s.base_stat), 100);

	const statOrder = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>{t("ui.baseStats")}</h2>
			<div className="space-y-3">
				{statOrder.map((statName) => {
					const stat = stats.find((s) => s.stat.name === statName);
					if (!stat) return null;

					const baseStat = stat.base_stat;
					const isHP = statName === "hp";
					const { min, max } = calculateMinMax(baseStat, isHP);
					const barWidth = (baseStat / maxStatValue) * 100;

					return (
						<div key={statName} className="flex items-center gap-4">
							<div className={cn("w-32 font-semibold text-xs", pressStart2P.className)}>{translateStat(statName)}</div>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
										<div
											className={cn("h-full transition-all", getStatBarColor(baseStat, maxStatValue))}
											style={{ width: `${barWidth}%` }}
										/>
									</div>
									<div className={cn("w-12 text-right font-semibold text-xs", pressStart2P.className)}>{baseStat}</div>
									<div className="w-32 text-xs text-gray-500">
										{t("ui.min")}: {min} | {t("ui.max")}: {max}
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<div className="flex items-center gap-4 pt-2 border-t">
					<div className={cn("w-24 font-bold", pressStart2P.className)}>{t("ui.total")}</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<div className="flex-1" />
							<div className={cn("w-12 text-right font-bold text-xs", pressStart2P.className)}>{total}</div>
							<div className="w-32 text-xs text-gray-500">
								{t("ui.min")}:{" "}
								{statOrder.reduce((sum, name) => {
									const stat = stats.find((s) => s.stat.name === name);
									if (!stat) return sum;
									const isHP = name === "hp";
									return sum + calculateMinMax(stat.base_stat, isHP).min;
								}, 0)}{" "}
								| {t("ui.max")}:{" "}
								{statOrder.reduce((sum, name) => {
									const stat = stats.find((s) => s.stat.name === name);
									if (!stat) return sum;
									const isHP = name === "hp";
									return sum + calculateMinMax(stat.base_stat, isHP).max;
								}, 0)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<p className="text-xs text-gray-500 mt-2">{t("ui.statsDescription")}</p>
		</div>
	);
}
