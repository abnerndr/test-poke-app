import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface PokemonImageProps {
	pokemon: Pokemon;
}

export function PokemonImage({ pokemon }: PokemonImageProps) {
	const mainImage = pokemon.pictures?.find((pic) => pic.url.includes("official-artwork")) || pokemon.pictures?.[0];

	if (!mainImage?.url) {
		return null;
	}

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-64 h-64">
				<Image src={mainImage.url} alt={pokemon.name} className="object-contain" width={256} height={256} priority />
			</div>
		</div>
	);
}
