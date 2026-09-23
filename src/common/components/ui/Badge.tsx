import type { HTMLAttributes } from "react";

export type BadgeTone =
	| "success"
	| "info"
	| "warning"
	| "danger"
	| "neutral"
	| "navy"
	| "teal"
	| "lemon";

const TONE_STYLES: Record<BadgeTone, { badge: string; dot: string }> = {
	success: { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
	info: { badge: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
	warning: { badge: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
	danger: { badge: "bg-red-50 text-red-600", dot: "bg-red-500" },
	neutral: { badge: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
	navy: { badge: "bg-indigo-100 text-navy", dot: "bg-navy" },
	teal: { badge: "bg-teal/25 text-teal-strong", dot: "bg-teal" },
	lemon: { badge: "bg-lemon/50 text-amber-800", dot: "bg-amber-500" },
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	tone?: BadgeTone;
	/** Muestra un punto de color antes del texto (ej. "● Activo"). */
	withDot?: boolean;
};

/**
 * Etiqueta pequeña de color. Es la base de todos los estados de la app
 * (estado de pedido, rol, activo/inactivo): las features solo eligen el tono.
 */
export const Badge = ({
	tone = "neutral",
	withDot = false,
	className = "",
	children,
	...spanProps
}: BadgeProps) => {
	const styles = TONE_STYLES[tone];

	return (
		<span
			className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge} ${className}`}
			{...spanProps}
		>
			{withDot && <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />}
			{children}
		</span>
	);
};
