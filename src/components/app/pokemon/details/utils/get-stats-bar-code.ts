export function getStatBarColor(value: number, maxValue: number): string {
	const percentage = (value / maxValue) * 100;
	if (percentage >= 70) return "bg-emerald-400";
	if (percentage >= 40) return "bg-yellow-400";
	return "bg-rose-400";
}
