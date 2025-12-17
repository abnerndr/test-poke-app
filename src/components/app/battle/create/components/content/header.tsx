import { EightBitButton } from "@/components/common/button";
import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "tailwind-variants";

export function CreateBattleHeader() {
	const { t } = useI18n();
	return (
		<div className="flex items-center justify-between mb-6">
			<h1 className={cn("text-2xl font-bold", pressStart2P.className)}>{t("ui.createBattle") || "Criar Batalha"}</h1>
			<Link href="/battle/history">
				<EightBitButton color="purple">
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4" /> {t("ui.viewBattleHistory") || "Ver Histórico"}
					</div>
				</EightBitButton>
			</Link>
		</div>
	);
}
