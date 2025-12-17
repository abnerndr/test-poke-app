import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types/pokemon";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface PokemonDetailsHeaderProps {
	pokemon: Pokemon;
	isTranslating: boolean;
	getBackUrl: () => string;
}

export function PokemonDetailsHeader({ pokemon, isTranslating, getBackUrl }: PokemonDetailsHeaderProps) {
	const { t } = useI18n();
	return (
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
	);
}
