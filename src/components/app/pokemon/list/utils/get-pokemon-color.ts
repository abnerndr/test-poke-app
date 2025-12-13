export function getPokemonColorClass(colorName: string | undefined): string {
	if (!colorName) {
		return "bg-gray-100";
	}

	const colorMap: Record<string, string> = {
		yellow: "bg-yellow-100",
		green: "bg-green-100",
		red: "bg-red-100",
		blue: "bg-blue-100",
		purple: "bg-purple-100",
		pink: "bg-pink-100",
		brown: "bg-amber-100",
		black: "bg-gray-800",
		white: "bg-gray-50",
		gray: "bg-gray-200",
		orange: "bg-orange-100",
		cyan: "bg-cyan-100",
		indigo: "bg-indigo-100",
		teal: "bg-teal-100",
		lime: "bg-lime-100",
		emerald: "bg-emerald-100",
		violet: "bg-violet-100",
		fuchsia: "bg-fuchsia-100",
		rose: "bg-rose-100",
		sky: "bg-sky-100",
	};

	const normalizedColor = colorName.toLowerCase().trim();

	return colorMap[normalizedColor] || "bg-gray-100";
}

export function getPokemonBorderColorClass(colorName: string | undefined): string {
	if (!colorName) {
		return "border-gray-200";
	}

	const colorMap: Record<string, string> = {
		yellow: "border-yellow-200",
		green: "border-green-200",
		red: "border-red-200",
		blue: "border-blue-200",
		purple: "border-purple-200",
		pink: "border-pink-200",
		brown: "border-amber-200",
		black: "border-gray-800",
		white: "border-gray-50",
		gray: "border-gray-200",
		orange: "border-orange-200",
		cyan: "border-cyan-200",
		indigo: "border-indigo-200",
		teal: "border-teal-200",
		lime: "border-lime-200",
		emerald: "border-emerald-200",
		violet: "border-violet-200",
		fuchsia: "border-fuchsia-200",
		rose: "border-rose-200",
		sky: "border-sky-200",
	};

	const normalizedColor = colorName.toLowerCase().trim();

	return colorMap[normalizedColor] || "border-gray-200";
}
