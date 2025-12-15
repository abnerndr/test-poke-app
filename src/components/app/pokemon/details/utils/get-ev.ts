import { Pokemon } from "@/types/pokemon";

export function getEVFields(stats: Pokemon["stats"]): string {
	const evStats = stats.filter((s) => s.effort > 0);
	if (evStats.length === 0) return "0";
	return evStats
		.map(
			(s) =>
				`${s.effort} ${
					s.stat.name === "special-attack" ? "Sp. Atk" : s.stat.name === "special-defense" ? "Sp. Def" : s.stat.name
				}`
		)
		.join(", ");
}
