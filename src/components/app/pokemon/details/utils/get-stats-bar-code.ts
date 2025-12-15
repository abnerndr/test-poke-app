export function getStatBarColor(value: number, maxValue: number): string {
	const percentage = (value / maxValue) * 100;
	if (percentage >= 70) return "bg-green-500";
	if (percentage >= 40) return "bg-yellow-500";
	return "bg-red-500";
}
