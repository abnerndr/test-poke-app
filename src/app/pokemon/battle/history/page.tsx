import { redirect } from "next/navigation";

type PageProps = {
	searchParams?: Record<string, string | string[] | undefined>;
};

export default function LegacyBattleHistoryPage({ searchParams }: PageProps) {
	const params = new URLSearchParams();

	if (searchParams) {
		for (const [key, value] of Object.entries(searchParams)) {
			if (typeof value === "string") {
				params.set(key, value);
			} else if (Array.isArray(value)) {
				// mantém o último valor (suficiente para nossos casos page/order)
				const last = value[value.length - 1];
				if (last) params.set(key, last);
			}
		}
	}

	const qs = params.toString();
	redirect(qs ? `/battle/history?${qs}` : "/battle/history");
}


