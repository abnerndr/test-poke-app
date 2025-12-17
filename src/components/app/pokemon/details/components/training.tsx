import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { getEVFields } from "../utils/get-ev";

interface TrainingProps {
	pokemon: Pokemon;
}

export function Training({ pokemon }: TrainingProps) {
	const { t } = useI18n();
	const evYield = getEVFields(pokemon.stats || []);
	return (
		<div className="space-y-4">
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>{t("ui.training")}</h2>
			<div className="space-y-4">
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className={cn("font-semibold text-sm", pressStart2P.className)}>{t("ui.evYield")}:</span>{" "}
					<span className="text-xs text-zinc-600">{evYield}</span>
				</div>
				<div className={cn("flex items-center gap-2", pressStart2P.className)}>
					<span className={cn("font-semibold text-sm", pressStart2P.className)}>{t("ui.baseExp")}:</span>{" "}
					<span className="text-xs text-zinc-600">{pokemon.base_experience || "N/A"}</span>
				</div>
			</div>
		</div>
	);
}
