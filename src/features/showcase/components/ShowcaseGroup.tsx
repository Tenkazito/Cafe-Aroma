import type { ReactNode } from "react";

type ShowcaseGroupProps = {
	title: string;
	description?: string;
	children: ReactNode;
};

/** Agrupa varias fichas bajo un subtítulo (ej. "Formularios", "Modales"). */
export const ShowcaseGroup = ({
	title,
	description,
	children,
}: ShowcaseGroupProps) => {
	return (
		<section className="flex flex-col gap-4">
			<div>
				<h2 className="text-xl font-bold text-navy">{title}</h2>
				{description && <p className="text-sm text-gray-500">{description}</p>}
			</div>
			<div className="flex flex-col gap-5">{children}</div>
		</section>
	);
};
