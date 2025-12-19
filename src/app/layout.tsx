import { MainNav } from "@/components/common/navigation/main-nav";
import { poppins } from "@/lib/fonts/poppins";
import { cn } from "@/lib/utils";
import Provider from "@/providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
	title: "Poke Battle",
	description: "Poke Battle",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("antialiased ", poppins.className)}>
				<Provider>
					<MainNav />
					{children}
				</Provider>
				<Toaster
					position="top-right"
					richColors
					expand={true}
					duration={3000}
					closeButton
					toastOptions={{
						classNames: {
							toast: "pikachu-toast",
							title: "pikachu-toast-title",
							description: "pikachu-toast-description",
							actionButton: "pikachu-toast-action",
							cancelButton: "pikachu-toast-cancel",
						},
					}}
				/>
			</body>
		</html>
	);
}
