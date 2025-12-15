import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/PokeAPI/**",
			},
		],
	},
};

export default nextConfig;
