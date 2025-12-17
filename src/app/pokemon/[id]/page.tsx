import PokemonDetails from "@/components/app/pokemon/details";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function LoadingFallback() {
	return (
		<div className="p-4 text-center">
			<p className="text-gray-600">Carregando...</p>
		</div>
	);
}

export default function PokemonDetailPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<PokemonDetails />
		</Suspense>
	);
}
