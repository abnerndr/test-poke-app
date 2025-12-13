"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<NextThemesProvider
			{...props}
			attribute="class"
			forcedTheme="light"
			defaultTheme="light"
			themes={["light", "dark"]}
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</NextThemesProvider>
	);
}
