import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/common/components/ui/Icon";

type SectionCardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
	title?: string;
	icon?: IconName;
	/** Color del icono del título (ej. "text-orange-400" para el trofeo). */
	iconClassName?: string;
	/** Contenido a la derecha del título (ej. pestañas Día/Semana/Mes). */
	action?: ReactNode;
};

/** Tarjeta blanca con título opcional: el contenedor base de cada sección. */
export const SectionCard = ({
	title,
	icon,
	iconClassName = "text-teal-strong",
	action,
	className = "",
	children,
	...sectionProps
}: SectionCardProps) => {
	return (
		<section
			className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}
			{...sectionProps}
		>
			{(title || action) && (
				<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
					{title && (
						<h2 className="flex items-center gap-2 text-lg font-bold text-navy">
							{icon && <Icon name={icon} className={iconClassName} />}
							{title}
						</h2>
					)}
					{action}
				</div>
			)}
			{children}
		</section>
	);
};
