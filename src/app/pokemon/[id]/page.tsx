import PokemonDetails from "@/components/app/pokemon/details";
import { Suspense } from "react";
import LoadingScreen from "@/components/common/loading-screen";

export default function PokemonDetailPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<PokemonDetails />
		</Suspense>
	);
}
