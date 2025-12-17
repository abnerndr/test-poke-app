import { EightBitButton } from "@/components/common/button";
import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function BattleHistoryLoading() {
	const { t } = useI18n();
	return (
		<div className="p-4 max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className={cn("text-2xl font-bold", pressStart2P.className)}>
					{t("ui.battleHistory") || "Histórico de Batalhas"}
				</h1>
				<Link href="/pokemon/battle">
					<EightBitButton color="blue">
						<div className="flex items-center gap-2">
							<ArrowLeftIcon className="w-4 h-4" /> {t("ui.backToBattle") || "Voltar para Batalha"}
						</div>
					</EightBitButton>
				</Link>
			</div>
			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="border rounded-lg p-4 animate-pulse">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="w-20 h-20 bg-gray-200 rounded"></div>
								<div className="w-20 h-20 bg-gray-200 rounded"></div>
							</div>
							<div className="w-20 h-20 bg-gray-200 rounded"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
