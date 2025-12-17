import { useI18n } from "@/lib/i18n/context";

export function BattleDetailsHeader({ isTranslating }: { isTranslating: boolean }) {
	const { t } = useI18n();
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Battle Details</h1>
			{/* Indicadores de tradução */}
			{isTranslating && <div className="mb-4 text-sm text-gray-500">{t("ui.loading")}...</div>}
		</div>
	);
}
