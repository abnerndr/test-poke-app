import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export default function Provider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</QueryProvider>
	);
}
