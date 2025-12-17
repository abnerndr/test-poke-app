import Provider from "@/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

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
			<body className={`${poppins.className}  antialiased`}>
				<Provider>{children}</Provider>
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
