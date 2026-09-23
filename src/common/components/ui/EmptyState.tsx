import type { ReactNode } from "react";
import { Icon, type IconName } from "@/common/components/ui/Icon";

type EmptyStateProps = {
	icon: IconName;
	title: string;
	description?: string;
	action?: ReactNode;
};

/** Mensaje centrado para listas vacías (ej. "Tu pedido está vacío"). */
export const EmptyState = ({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) => {
	return (
		<div className="flex flex-col items-center gap-2 py-8 text-center">
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
				<Icon name={icon} size={22} />
			</div>
			<p className="text-sm font-semibold text-navy">{title}</p>
			{description && <p className="text-xs text-gray-400">{description}</p>}
			{action}
		</div>
	);
};
