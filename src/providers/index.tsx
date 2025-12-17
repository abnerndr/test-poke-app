import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { I18nProvider } from "@/lib/i18n/context";

export default function Provider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryProvider>
			<I18nProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</I18nProvider>
		</QueryProvider>
	);
}
