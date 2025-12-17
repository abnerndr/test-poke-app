"use client";

import { Pokemon } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";

interface TypeEffectsProps {
	pokemon: Pokemon;
}

// Mapeamento de cores para tipos de efeitos
const colorToTypeMap: Record<string, string> = {
	yellow: "electric",
	blue: "water",
	red: "fire",
	green: "grass",
	purple: "poison",
	brown: "ground",
	black: "dark",
	white: "normal",
	gray: "rock",
	orange: "fire",
	cyan: "water",
	indigo: "psychic",
	teal: "water",
	lime: "grass",
	emerald: "grass",
	violet: "psychic",
	fuchsia: "fairy",
	rose: "fairy",
	sky: "flying",
	pink: "fairy",
};

interface Particle {
	id: number;
	left: number;
	top: number;
	duration: number;
	delay: number;
}

export function TypeEffects({ pokemon }: TypeEffectsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const colorName = pokemon?.color?.name?.toLowerCase() || "";
	const type = colorToTypeMap[colorName] || "normal";
	const [particles, setParticles] = useState<Particle[]>([]);
	const particleIdRef = useRef(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const createParticle = (): Particle => {
			return {
				id: particleIdRef.current++,
				left: Math.random() * 100,
				top: Math.random() * 100,
				duration: 2 + Math.random() * 2,
				delay: Math.random() * 2,
			};
		};

		const initialParticles = Array.from({ length: 5 }, () => createParticle());
		setParticles(initialParticles);

		const interval = setInterval(() => {
			setParticles((prev) => {
				if (prev.length < 10) {
					return [...prev, createParticle()];
				}
				return prev;
			});
		}, 800);

		const cleanupInterval = setInterval(() => {
			setParticles((prev) => prev.slice(1));
		}, 2000);

		return () => {
			clearInterval(interval);
			clearInterval(cleanupInterval);
		};
	}, [type]);

	const getParticleContent = () => {
		switch (type) {
			case "electric":
				return { emoji: "⚡", className: "text-yellow-400 text-2xl", animation: "animate-ping" };
			case "water":
				return { emoji: "💧", className: "text-blue-400 text-xl", animation: "animate-bounce" };
			case "fire":
				return { emoji: "🔥", className: "text-orange-500 text-xl", animation: "animate-pulse" };
			case "grass":
				return { emoji: "🍃", className: "text-green-400 text-lg", animation: "animate-spin" };
			case "psychic":
				return { emoji: "✨", className: "text-purple-400 text-xl", animation: "animate-pulse" };
			case "fairy":
				return { emoji: "⭐", className: "text-pink-400 text-lg", animation: "animate-ping" };
			case "flying":
				return { emoji: "💨", className: "text-sky-400 text-lg", animation: "animate-bounce" };
			default:
				return { emoji: "✨", className: "text-gray-400 text-lg", animation: "animate-pulse" };
		}
	};

	const particleContent = getParticleContent();

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg"
			aria-hidden="true"
		>
			{particles.map((particle) => (
				<div
					key={particle.id}
					className={`absolute pointer-events-none ${particleContent.className} ${particleContent.animation}`}
					style={{
						left: `${particle.left}%`,
						top: `${particle.top}%`,
						animationDuration: `${particle.duration}s`,
						animationDelay: `${particle.delay}s`,
					}}
				>
					{particleContent.emoji}
				</div>
			))}
		</div>
	);
}
