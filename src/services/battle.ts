import { httpAdapter } from "@/lib/axios/client";
import { AxiosHttpAdapter } from "@/lib/axios/http.adapter";
import { Battle, CreateBattle } from "@/types/battle";

export class BattleService {
	constructor(private readonly httpAdapter: AxiosHttpAdapter) {}

	async getBattle(id: string): Promise<Battle> {
		const response = await this.httpAdapter.getInstance().get<Battle>(`/battle/${id}`);
		return response.data;
	}

	async getBattles(): Promise<Battle[]> {
		const response = await this.httpAdapter.getInstance().get<Battle[]>(`/battle/list`);
		return response.data;
	}

	async createBattle(battleData: CreateBattle): Promise<Battle> {
		const response = await this.httpAdapter.getInstance().post<Battle>(`/battle/create`, battleData);
		return response.data;
	}
}

export const battleService = new BattleService(httpAdapter);
