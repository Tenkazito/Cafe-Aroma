import type { ReactNode } from "react";
import { Icon, type IconName } from "@/common/components/ui/Icon";

type PageHeaderProps = {
	title: string;
	description?: string;
	/** Si se omite, el título va sin el cuadro de icono (estilo del panel de cliente). */
	icon?: IconName;
	/** Botón o acciones a la derecha (ej. "Nuevo Usuario"). */
	action?: ReactNode;
};

export const PageHeader = ({
	title,
	description,
	icon,
	action,
}: PageHeaderProps) => {
	return (
		<div className="flex flex-wrap items-center justify-between gap-4">
			<div className="flex items-center gap-3">
				{icon && (
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 text-teal-strong">
						<Icon name={icon} size={22} />
					</div>
				)}
				<div>
					<h1 className="text-2xl font-bold text-navy">{title}</h1>
					{description && (
						<p className="text-sm text-gray-500">{description}</p>
					)}
				</div>
			</div>
			{action}
		</div>
	);
};
