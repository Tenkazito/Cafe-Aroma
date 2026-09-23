import type { ReactNode } from "react";
import { Icon } from "@/common/components/ui/Icon";
import type { ShowcaseSection } from "@/features/showcase/lib/sections";

type ShowcasePageProps = {
	section: ShowcaseSection;
	children: ReactNode;
};

/** Encabezado + contenido de una sección de /dev. */
export const ShowcasePage = ({ section, children }: ShowcasePageProps) => {
	return (
		<div className="flex flex-col gap-10">
			<header className="flex items-start gap-3">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-teal">
					<Icon name={section.icon} size={22} />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-navy">{section.label}</h1>
					<p className="text-sm text-gray-500">{section.description}</p>
					<code className="text-xs text-gray-400">{section.folder}</code>
				</div>
			</header>
			{children}
		</div>
	);
};
