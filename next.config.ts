import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Dominios de las imágenes de ejemplo (productos y avatares de los mocks)
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "images.pexels.com" },
			{ protocol: "https", hostname: "i.pravatar.cc" },
			// Imágenes de productos subidas a Vercel Blob
			{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
		],
	},
};

export default nextConfig;
