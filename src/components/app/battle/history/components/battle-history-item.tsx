"use client";

import { useI18n } from "@/lib/i18n/context";
import { useTranslatedPokemon } from "@/lib/i18n/pokemon-translations";
import { cn } from "@/lib/utils";
import { Battle } from "@/types/battle";
import { Pokemon } from "@/types/pokemon";
import { Crown } from "lucide-react";
import Image from "next/image";
import { TypeEffects } from "./type-effects";

interface BattleHistoryItemProps {
	battle: Battle;
	firstPokemon: Pokemon | undefined;
	secondPokemon: Pokemon | undefined;
	winnerPokemon: Pokemon | undefined;
	isLoading: boolean;
}

export function BattleHistoryItem({
	battle,
	firstPokemon,
	secondPokemon,
	winnerPokemon,
	isLoading,
}: BattleHistoryItemProps) {
	const { t } = useI18n();
	const { translatedPokemon: translatedFirst } = useTranslatedPokemon(firstPokemon);
	const { translatedPokemon: translatedSecond } = useTranslatedPokemon(secondPokemon);
	const { translatedPokemon: translatedWinner } = useTranslatedPokemon(winnerPokemon);

	const displayFirst = translatedFirst || firstPokemon;
	const displaySecond = translatedSecond || secondPokemon;
	const displayWinner = translatedWinner || winnerPokemon;

	if (isLoading || !displayFirst || !displaySecond) {
		return (
			<div className="border rounded-lg p-4 animate-pulse">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="w-20 h-20 bg-gray-200 rounded"></div>
						<div className="w-20 h-20 bg-gray-200 rounded"></div>
					</div>
					<div className="w-20 h-20 bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	const firstImage =
		displayFirst.pictures?.find((pic) => pic.url.includes("official-artwork")) || displayFirst.pictures?.[0];
	const secondImage =
		displaySecond.pictures?.find((pic) => pic.url.includes("official-artwork")) || displaySecond.pictures?.[0];
	const winnerImage =
		displayWinner?.pictures?.find((pic) => pic.url.includes("official-artwork")) || displayWinner?.pictures?.[0];

	const isFirstWinner = battle.winnerId === battle.firstPokemonId;
	const isSecondWinner = battle.winnerId === battle.secondPokemonId;

	const formatDate = (date: Date | string) => {
		const d = typeof date === "string" ? new Date(date) : date;
		return new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(d);
	};

	// Extrair o reason do metadata
	const getReason = (): string | null => {
		if (!battle.metadata || typeof battle.metadata !== "object" || Array.isArray(battle.metadata)) {
			return null;
		}
		if ("reason" in battle.metadata && typeof battle.metadata.reason === "string") {
			return battle.metadata.reason;
		}
		return null;
	};

	const reason = getReason();

	return (
		<div className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
			{/* Data da batalha */}
			<div className="text-sm text-gray-500 mb-4">
				{t("ui.battleDate") || "Data"}: {formatDate(battle.occurredAt)}
			</div>

			<div className="flex items-center justify-between gap-4 flex-wrap">
				{/* Primeiro Pokémon */}
				<div className="flex-1 min-w-[120px] flex flex-col items-center">
					{firstImage?.url && (
						<div className="relative w-24 h-24 mb-2">
							<Image
								src={firstImage.url}
								alt={displayFirst.name}
								className={cn(
									"object-contain rounded-lg border-2",
									isFirstWinner ? "border-yellow-400 shadow-lg" : "border-gray-200"
								)}
								width={96}
								height={96}
							/>
							{isFirstWinner && (
								<div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
									<Crown className="w-4 h-4 text-yellow-800" />
								</div>
							)}
						</div>
					)}
					<p className="text-sm font-semibold capitalize text-center">{displayFirst.name}</p>
					<p className="text-xs text-gray-500">#{String(displayFirst.id).padStart(4, "0")}</p>
				</div>

				{/* VS */}
				<div className="text-xl font-bold text-gray-400">VS</div>

				{/* Segundo Pokémon */}
				<div className="flex-1 min-w-[120px] flex flex-col items-center">
					{secondImage?.url && (
						<div className="relative w-24 h-24 mb-2">
							<Image
								src={secondImage.url}
								alt={displaySecond.name}
								className={cn(
									"object-contain rounded-lg border-2",
									isSecondWinner ? "border-yellow-400 shadow-lg" : "border-gray-200"
								)}
								width={96}
								height={96}
							/>
							{isSecondWinner && (
								<div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
									<Crown className="w-4 h-4 text-yellow-800" />
								</div>
							)}
						</div>
					)}
					<p className="text-sm font-semibold capitalize text-center">{displaySecond.name}</p>
					<p className="text-xs text-gray-500">#{String(displaySecond.id).padStart(4, "0")}</p>
				</div>

				{/* Separador */}
				<div className="w-px h-20 bg-gray-200"></div>

				{/* Vencedor */}
				{displayWinner && (
					<div className="flex-1 min-w-[120px] flex flex-col items-center relative">
						<div className="relative">
							{winnerImage?.url && (
								<div className="relative w-32 h-32 mb-2">
									<Image
										src={winnerImage.url}
										alt={displayWinner.name}
										className="object-contain rounded-lg border-4 border-yellow-400 shadow-xl"
										width={128}
										height={128}
									/>
									<div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg">
										<Crown className="w-6 h-6 text-yellow-800" />
									</div>
									<TypeEffects pokemon={displayWinner} />
								</div>
							)}
						</div>
						<div className="text-center">
							<p className="text-lg font-bold capitalize text-yellow-600">{t("ui.winner") || "Vencedor"}</p>
							<p className="text-sm font-semibold capitalize">{displayWinner.name}</p>
							<p className="text-xs text-gray-500">#{String(displayWinner.id).padStart(4, "0")}</p>
						</div>
					</div>
				)}
			</div>

			{/* Motivo da Vitória */}
			{reason && (
				<div className="mt-4 pt-4 border-t border-gray-200">
					<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
						<p className="text-sm font-semibold text-yellow-800 mb-1">
							{t("ui.victoryReason") || "Motivo da Vitória"}:
						</p>
						<p className="text-sm text-gray-700">{reason}</p>
					</div>
				</div>
			)}
		</div>
	);
}
