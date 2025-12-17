import BattleHistory from "@/components/app/battle/history";
import LoadingFallback from "@/components/common/fallback/loading-fallback";
import { Suspense } from "react";

export default function BattleHistoryPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<BattleHistory />
		</Suspense>
	);
}
