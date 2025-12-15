"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { pressStart2P } from "@/lib/fonts/press-start";
import { cn } from "@/lib/utils";
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
	const { pokemon, isLoading, error, getBackUrl } = useDetails();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-600">Erro ao carregar pokemon. Tente novamente.</p>
				<Link href={getBackUrl()} className="text-blue-600 hover:underline mt-4 inline-block">
					Voltar para lista
				</Link>
			</div>
		);
	}

	if (!pokemon) {
		return (
			<div className="p-4 text-center">
				<p className="text-gray-600">Pokemon não encontrado</p>
				<Link href={getBackUrl()} className="text-blue-600 hover:underline mt-4 inline-block">
					Voltar para lista
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
					<Link href={getBackUrl()} className="text-blue-600 hover:underline mb-4 inline-block">
						← Voltar para lista
					</Link>
					<h1 className={cn("text-3xl font-bold capitalize mb-2", pressStart2P.className)}>{pokemon.name}</h1>
					<p className="text-gray-600">National № {String(pokemon.id).padStart(4, "0")}</p>
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
