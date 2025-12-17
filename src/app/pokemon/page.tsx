import PokemonList from "@/components/app/pokemon/list";
import { Suspense } from "react";
import LoadingScreen from "@/components/common/loading-screen";

export default function PokemonPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<PokemonList />
		</Suspense>
	);
}
