import { EightBitButton } from "@/components/common/button";
import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";

interface BattleHistoryNavigationProps {
	handleToggleOrder: () => void;
	order: "desc" | "asc";
}

export function BattleHistoryNavigation({ handleToggleOrder, order }: BattleHistoryNavigationProps) {
	const { t } = useI18n();
	return (
		<div className="flex items-center justify-between mb-6 w-full">
			<h1 className={cn("text-2xl font-bold", pressStart2P.className)}>
				{t("ui.battleHistory") || "Histórico de Batalhas"}
			</h1>
			<div className="flex items-center gap-3 w-full justify-end">
				<EightBitButton color="yellow" onClick={handleToggleOrder}>
					<div className="flex items-center gap-2">
						<ArrowUpDownIcon className="w-4 h-4" />
						{order === "desc" ? "Mais recentes" : "Mais antigos"}
					</div>
				</EightBitButton>
				<Link href="/battle">
					<EightBitButton color="blue">
						<div className="flex items-center gap-2">
							<ArrowLeftIcon className="w-4 h-4" /> {t("ui.backToBattle") || "Voltar para Batalha"}
						</div>
					</EightBitButton>
				</Link>
			</div>
		</div>
	);
}
