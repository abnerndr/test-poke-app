import { httpAdapter } from "@/lib/axios/client";
import { AxiosHttpAdapter } from "@/lib/axios/http.adapter";
import { Pokemon } from "@/types/pokemon";
import { Pokemons, PokemonsQueryFilters } from "@/types/pokemons";

export class PokemonService {
	constructor(private readonly httpAdapter: AxiosHttpAdapter) {}

	async getPokemon(id: string): Promise<Pokemon> {
		const response = await this.httpAdapter.getInstance().get<Pokemon>(`/pokemon/${id}`);
		return response.data;
	}

	async getPokemons(queryFilters: PokemonsQueryFilters): Promise<Pokemons> {
		const response = await this.httpAdapter.getInstance().get<Pokemons>(`/pokemon`, { params: queryFilters });
		return response.data;
	}
}

export const pokemonService = new PokemonService(httpAdapter);
