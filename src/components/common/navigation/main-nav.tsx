"use client";

import { pressStart2P } from "@/lib/fonts/press-start";
import { useI18n } from "@/lib/i18n/context";
import { PathUtils, cn } from "@/lib/utils";
import { Clock, Home, Swords } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./nav-link";

export function MainNav() {
	const pathname = usePathname();
	const { t } = useI18n();

	const navItems = [
		{
			href: "/pokemon",
			label: t("ui.pokemonList") || "Lista de Pokémons",
			icon: Home,
			color: "blue" as const,
		},
		{
			href: "/battle",
			label: t("ui.createBattle") || "Criar Batalha",
			icon: Swords,
			color: "red" as const,
		},
		{
			href: "/battle/history",
			label: t("ui.battleHistory") || "Histórico de Batalhas",
			icon: Clock,
			color: "purple" as const,
		},
	];

	return (
		<nav className="bg-linear-to-r from-yellow-100 via-yellow-50 to-yellow-100 border-b-2 border-black shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20 sm:h-24">
					{/* Título */}
					<Link href="/pokemon" className="flex items-center">
						<h1
							className={cn(
								"text-xl sm:text-2xl font-bold text-black drop-shadow-[2px_2px_0px_#E59400]",
								pressStart2P.className
							)}
						>
							{t("ui.appName") || "Poke Battle"}
						</h1>
					</Link>

					{/* Menu Items */}
					<div className="flex items-center gap-2 sm:gap-3">
						{navItems.map((item) => {
							const isActive = PathUtils.getLastPath(pathname) === PathUtils.getLastPath(item.href);
							return (
								<NavLink key={item.href} href={item.href} color={item.color} isActive={isActive}>
									<item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
									<span className="hidden sm:inline">{item.label}</span>
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
}
