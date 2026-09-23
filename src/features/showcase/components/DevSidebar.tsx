"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/common/components/ui/Icon";
import { SHOWCASE_SECTIONS } from "@/features/showcase/lib/sections";

/** Menú lateral de la ruta /dev: índice + una entrada por sección. */
export const DevSidebar = () => {
	const pathname = usePathname();

	const linkClasses = (isActive: boolean) =>
		`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
			isActive
				? "bg-navy font-semibold text-white"
				: "text-gray-600 hover:bg-gray-100 hover:text-navy"
		}`;

	return (
		<nav aria-label="Secciones del showcase" className="flex flex-col gap-1">
			<Link href="/dev" className={linkClasses(pathname === "/dev")}>
				<Icon name="palette" size={16} />
				Tokens de diseño
			</Link>

			<p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
				Compartido
			</p>
			{SHOWCASE_SECTIONS.slice(0, 1).map((section) => (
				<Link
					key={section.slug}
					href={`/dev/${section.slug}`}
					className={linkClasses(pathname === `/dev/${section.slug}`)}
				>
					<Icon name={section.icon} size={16} />
					{section.label}
				</Link>
			))}

			<p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
				Features
			</p>
			{SHOWCASE_SECTIONS.slice(1).map((section) => (
				<Link
					key={section.slug}
					href={`/dev/${section.slug}`}
					className={linkClasses(pathname === `/dev/${section.slug}`)}
				>
					<Icon name={section.icon} size={16} />
					{section.label}
				</Link>
			))}
		</nav>
	);
};
