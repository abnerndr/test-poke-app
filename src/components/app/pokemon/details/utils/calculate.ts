export function calculateMinMax(baseStat: number, isHP: boolean) {
	if (isHP) {
		return {
			min: Math.floor(((2 * baseStat + 31 + 0) * 100) / 100) + 100,
			max: Math.floor(((2 * baseStat + 31 + 252) * 100) / 100) + 100,
		};
	}
	return {
		min: Math.floor(((2 * baseStat + 31 + 0) * 100) / 100),
		max: Math.floor(((2 * baseStat + 31 + 252) * 100) / 100),
	};
}
