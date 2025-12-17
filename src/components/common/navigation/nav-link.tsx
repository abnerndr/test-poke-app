"use client";

import { pressStart2P } from "@/lib/fonts/press-start";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type ColorVariant = "green" | "yellow" | "red" | "blue" | "purple" | "pink" | "black" | "white" | "gray";

type NavLinkProps = {
	children: React.ReactNode;
	href: string;
	color?: ColorVariant;
	className?: string;
	isActive?: boolean;
};

const navLink = tv({
	base: [
		"relative inline-block",
		"px-4 py-2 sm:px-6 sm:py-3",
		"text-white text-xs sm:text-sm",
		"select-none",
		"transition-none",
		"border-4 border-black",
		"active:translate-x-[4px] active:translate-y-[4px]",
		"active:shadow-none",
		"focus:outline-none",
		"cursor-pointer",
		"flex items-center gap-2",
	],
	variants: {
		color: {
			green: [
				"bg-[#92CD41]",
				"hover:bg-[#76c442]",
				"shadow-[4px_4px_0px_0px_#4AA52E]",
				"hover:shadow-[6px_6px_0px_0px_#4AA52E]",
			],
			yellow: [
				"bg-[#F7D51D]",
				"hover:bg-[#F2C409]",
				"shadow-[4px_4px_0px_0px_#E59400]",
				"hover:shadow-[6px_6px_0px_0px_#E59400]",
			],
			red: [
				"bg-[#E76E55]",
				"hover:bg-[#CE372B]",
				"shadow-[4px_4px_0px_0px_#8C2022]",
				"hover:shadow-[6px_6px_0px_0px_#8C2022]",
			],
			blue: [
				"bg-[#3498DB]",
				"hover:bg-[#2980B9]",
				"shadow-[4px_4px_0px_0px_#2980B9]",
				"hover:shadow-[6px_6px_0px_0px_#2980B9]",
			],
			purple: [
				"bg-[#9B59B6]",
				"hover:bg-[#8E44AD]",
				"shadow-[4px_4px_0px_0px_#8E44AD]",
				"hover:shadow-[6px_6px_0px_0px_#8E44AD]",
			],
			pink: [
				"bg-[#E91E63]",
				"hover:bg-[#D81B60]",
				"shadow-[4px_4px_0px_0px_#D81B60]",
				"hover:shadow-[6px_6px_0px_0px_#D81B60]",
			],
			black: [
				"bg-[#1A1A1A]",
				"hover:bg-[#121212]",
				"shadow-[4px_4px_0px_0px_#121212]",
				"hover:shadow-[6px_6px_0px_0px_#121212]",
			],
			white: [
				"bg-[#FFFFFF]",
				"text-black",
				"hover:bg-[#E0E0E0]",
				"shadow-[4px_4px_0px_0px_#E0E0E0]",
				"hover:shadow-[6px_6px_0px_0px_#E0E0E0]",
			],
			gray: [
				"bg-[#808080]",
				"hover:bg-[#666666]",
				"shadow-[4px_4px_0px_0px_#666666]",
				"hover:shadow-[6px_6px_0px_0px_#666666]",
			],
		},
		active: {
			true: "ring-4 ring-yellow-400 ring-offset-2",
		},
	},
	defaultVariants: {
		color: "green",
	},
});

export function NavLink({ children, href, color = "green", className, isActive = false }: NavLinkProps) {
	return (
		<Link
			href={href}
			style={{ fontFamily: pressStart2P.style.fontFamily }}
			className={twMerge(navLink({ color, active: isActive }), className)}
		>
			{children}
		</Link>
	);
}
