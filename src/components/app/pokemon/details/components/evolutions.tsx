import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

interface EvolutionsProps {
	pokemon: Pokemon;
}

export function Evolutions({ pokemon }: EvolutionsProps) {
	const { t } = useI18n();
	const evolutions = pokemon.evolutions;
	if (!evolutions || (!evolutions.first && !evolutions.second && !evolutions.third)) {
		return null;
	}
	const evolutionChain = [evolutions.first, evolutions.second, evolutions.third].filter(Boolean);

	return (
		<div className={cn("space-y-4", pressStart2P.className)}>
			<h2 className={cn("text-xl font-bold mb-4", pressStart2P.className)}>{t("ui.evolutionChain")}</h2>
			<div className="flex items-center gap-4 flex-wrap">
				{evolutionChain.map((evolution, index) => {
					if (!evolution) return null;
					const image =
						evolution.pictures?.find((pic) => pic.url.includes("official-artwork")) || evolution.pictures?.[0];
					const isCurrent = evolution.id === pokemon.id;

					return (
						<div key={evolution.id} className="flex items-center gap-2">
							{index > 0 && <span className="text-2xl">→</span>}
							<Link
								href={`/pokemon/${evolution.id}`}
								className={cn(
									"flex flex-col items-center p-3 rounded-lg border-2 transition-all",
									isCurrent ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
								)}
							>
								{image?.url && (
									<div className="relative w-20 h-20 mb-2">
										<Image src={image.url} alt={evolution.name} fill className="object-contain" />
									</div>
								)}
								<span className={cn("text-sm font-semibold capitalize", isCurrent && "text-blue-600")}>
									{evolution.name}
								</span>
								<span className="text-[10px] text-gray-500">#{evolution.id}</span>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}
