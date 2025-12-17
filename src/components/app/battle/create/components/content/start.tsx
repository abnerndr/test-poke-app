import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { UseFormHandleSubmit } from "react-hook-form";
import { BattleFormData } from "../../schemas/battle-form.schema";

interface CreateBattleStartProps {
	canStartBattle: boolean | 0;
	handleSubmit: UseFormHandleSubmit<BattleFormData>;
	handleCreateBattle: (data: BattleFormData) => void;
	isLoadingDetails: boolean;
}

export function CreateBattleStart({
	canStartBattle,
	handleSubmit,
	handleCreateBattle,
	isLoadingDetails,
}: CreateBattleStartProps) {
	const { t } = useI18n();
	if (!canStartBattle) {
		return null;
	}
	return (
		<div className="mt-8 text-center">
			<button
				onClick={handleSubmit(handleCreateBattle)}
				disabled={!canStartBattle || isLoadingDetails}
				className={cn(
					"px-8 py-4 bg-red-500 text-white rounded-lg font-bold text-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
					pressStart2P.className
				)}
			>
				{t("ui.startBattle") || "Iniciar Batalha!"}
			</button>
		</div>
	);
}
