"use client";

import { pressStart2P } from "@/lib/fonts/press-start";
import React from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type ColorVariant = "green" | "yellow" | "red" | "blue" | "purple" | "pink" | "black" | "white" | "gray";

type EightBitButtonProps = {
	children: React.ReactNode;
	color?: ColorVariant;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
};

const eightBitButton = tv({
	base: [
		"relative inline-block",
		"px-6 py-4",
		"text-white text-sm",
		"select-none",
		"transition-none",
		"border-4 border-black",
		"active:translate-x-[4px] active:translate-y-[4px]",
		"active:shadow-none",
		"focus:outline-none",
		"cursor-pointer",
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
		defaultVariants: {
			color: "green",
		},
	},
});

export function EightBitButton({ children, color, className, onClick, disabled }: EightBitButtonProps) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			style={{ fontFamily: pressStart2P.style.fontFamily }}
			className={twMerge(
				eightBitButton({ color }),
				disabled && "opacity-50 cursor-not-allowed active:translate-x-0 active:translate-y-0",
				className
			)}
		>
			{children}
		</button>
	);
}
