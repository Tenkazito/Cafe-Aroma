import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BrandLogo } from "@/common/components/layout/BrandLogo";
import { isDevelopment } from "@/common/lib/env";
import { DevSidebar } from "@/features/showcase/components/DevSidebar";

export const metadata: Metadata = { title: "Componentes · Café Aroma (dev)" };

type DevLayoutProps = {
	children: ReactNode;
};

/**
 * Catálogo de componentes para desarrolladores. En producción responde 404:
 * es una herramienta interna, no una pantalla del producto.
 */
const DevLayout = ({ children }: DevLayoutProps) => {
	if (!isDevelopment) notFound();

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
				<BrandLogo />
				<span className="rounded-full bg-lemon px-3 py-1 text-xs font-bold text-navy">
					Solo desarrollo · /dev
				</span>
			</header>
			<div className="flex flex-col md:flex-row">
				<aside className="shrink-0 border-b border-gray-200 bg-white p-4 md:min-h-[calc(100vh-3.5rem)] md:w-60 md:border-r md:border-b-0">
					<DevSidebar />
				</aside>
				<main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
			</div>
		</div>
	);
};

export default DevLayout;
