"use client";

import { useI18n } from "@/lib/i18n/context";

export function LanguageSwitcher() {
	const { language, setLanguage } = useI18n();

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => setLanguage("pt-BR")}
				className={`px-3 py-1 rounded text-sm transition-colors ${
					language === "pt-BR" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}`}
			>
				PT
			</button>
			<button
				onClick={() => setLanguage("en")}
				className={`px-3 py-1 rounded text-sm transition-colors ${
					language === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}`}
			>
				EN
			</button>
		</div>
	);
}

