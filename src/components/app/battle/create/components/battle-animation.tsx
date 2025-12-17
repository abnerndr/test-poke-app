"use client";

import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { useState } from "react";

interface BattleAnimationProps {
	firstPokemon: Pokemon | null;
	secondPokemon: Pokemon | null;
}

interface Particle {
	top: number;
	left: number;
	opacity: number;
	animationDelay: number;
}

export function BattleAnimation({ firstPokemon, secondPokemon }: BattleAnimationProps) {
	const firstImage =
		firstPokemon?.pictures?.find((pic) => pic.url.includes("official-artwork")) || firstPokemon?.pictures?.[0];
	const secondImage =
		secondPokemon?.pictures?.find((pic) => pic.url.includes("official-artwork")) || secondPokemon?.pictures?.[0];

	const [particles] = useState<Particle[]>(() =>
		[...Array(10)].map(() => ({
			top: Math.random() * 90 + 5,
			left: Math.random() * 90 + 5,
			opacity: Math.random() * 0.6 + 0.3,
			animationDelay: Math.random() * 2,
		}))
	);

	return (
		<div className="relative w-full h-64 flex items-center justify-center bg-linear-to-b from-blue-100 to-red-100 rounded-lg overflow-hidden">
			{/* Efeito de brilho animado */}
			<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

			{/* Pokémon da esquerda */}
			{firstImage?.url && firstPokemon && (
				<div className="absolute left-8 animate-bounce-slow">
					<div className="relative w-32 h-32">
						<Image src={firstImage.url} alt={firstPokemon.name} className="object-contain" width={128} height={128} />
					</div>
					<p className="text-center mt-2 font-bold capitalize text-sm">{firstPokemon.name}</p>
				</div>
			)}

			{/* VS no centro */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="bg-white/90 rounded-full px-6 py-3 shadow-lg">
					<span className="text-2xl font-bold text-red-600">VS</span>
				</div>
			</div>

			{/* Pokémon da direita */}
			{secondImage?.url && secondPokemon && (
				<div className="absolute right-8 animate-bounce-slow-reverse">
					<div className="relative w-32 h-32">
						<Image src={secondImage.url} alt={secondPokemon.name} className="object-contain" width={128} height={128} />
					</div>
					<p className="text-center mt-2 font-bold capitalize text-sm">{secondPokemon.name}</p>
				</div>
			)}

			{/* Partículas de efeito */}
			<div className="absolute inset-0 pointer-events-none">
				{particles.map((particle, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
						style={{
							top: `${particle.top}%`,
							left: `${particle.left}%`,
							opacity: particle.opacity,
							animationDelay: `${particle.animationDelay}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
}
