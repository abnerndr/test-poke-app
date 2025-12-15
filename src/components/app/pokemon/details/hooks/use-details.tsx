import { getIdByPathname } from "@/lib/helpers/get-id-by-pathname";
import { Pokemon } from "@/types/pokemon";
import { usePathname, useSearchParams } from "next/navigation";
import { usePokemon } from "./use-pokemon";

interface UseDetailsProps {
	pokemon?: Pokemon;
	isLoading: boolean;
	error: Error | null;
	getBackUrl: () => string;
}

export function useDetails(): UseDetailsProps {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const id = getIdByPathname(pathname);
	const { data: pokemon, isLoading, error } = usePokemon(id);

	const getBackUrl = () => {
		const params = new URLSearchParams(searchParams.toString());
		return `/pokemon${params.toString() ? `?${params.toString()}` : ""}`;
	};

	return {
		pokemon,
		isLoading,
		error,
		getBackUrl,
	};
}
