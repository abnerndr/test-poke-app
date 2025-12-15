export function formatHeight(height: number): string {
	const meters = height / 10;
	const feet = meters * 3.28084;
	const feetWhole = Math.floor(feet);
	const inches = Math.round((feet - feetWhole) * 12);
	return `${meters.toFixed(1)} m (${feetWhole}'${inches.toString().padStart(2, "0")}")`;
}

export function formatWeight(weight: number): string {
	const kg = weight / 10;
	const lbs = kg * 2.20462;
	return `${kg.toFixed(1)} kg (${lbs.toFixed(1)} lbs)`;
}
