import PokemonList from "@/components/app/pokemon/list";
import LoadingFallback from "@/components/common/fallback/loading-fallback";
import { Suspense } from "react";

export default function PokemonPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<PokemonList />
		</Suspense>
	);
}
