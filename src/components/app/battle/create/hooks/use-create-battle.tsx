import { battleService } from "@/services/battle";
import { CreateBattle } from "@/types/battle";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateBattle() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (battleData: CreateBattle) => battleService.createBattle(battleData),
		mutationKey: ["create-battle"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-battles"] });
		},
	});
}
