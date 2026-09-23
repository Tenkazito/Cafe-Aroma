import { Icon, type IconName } from "@/common/components/ui/Icon";

export type StatTone =
	| "navy"
	| "success"
	| "info"
	| "warning"
	| "danger"
	| "neutral";

/**
 * - `tinted`: fondo de color suave, icono en círculo blanco (Totales del día del admin).
 * - `outlined`: tarjeta blanca horizontal, icono en cuadro suave (Pedidos, Facturación).
 * - `solid`: tarjeta blanca vertical, icono en cuadro sólido (Panel principal del cliente).
 */
export type StatCardVariant = "tinted" | "outlined" | "solid";

const TONE_STYLES: Record<
	StatTone,
	{ soft: string; text: string; solid: string }
> = {
	navy: {
		soft: "bg-indigo-50",
		text: "text-navy",
		solid: "bg-navy text-white",
	},
	success: {
		soft: "bg-emerald-50",
		text: "text-emerald-600",
		solid: "bg-teal text-navy",
	},
	info: {
		soft: "bg-blue-50",
		text: "text-blue-500",
		solid: "bg-blue-500 text-white",
	},
	warning: {
		soft: "bg-amber-50",
		text: "text-amber-600",
		solid: "bg-lemon text-navy",
	},
	danger: {
		soft: "bg-red-50",
		text: "text-red-500",
		solid: "bg-red-500 text-white",
	},
	neutral: {
		soft: "bg-gray-100",
		text: "text-gray-500",
		solid: "bg-gray-100 text-gray-500",
	},
};

type StatCardProps = {
	label: string;
	value: string | number;
	icon: IconName;
	tone?: StatTone;
	variant?: StatCardVariant;
};

export const StatCard = ({
	label,
	value,
	icon,
	tone = "neutral",
	variant = "tinted",
}: StatCardProps) => {
	const styles = TONE_STYLES[tone];

	if (variant === "outlined") {
		return (
			<div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
				<div
					className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.soft} ${styles.text}`}
				>
					<Icon name={icon} size={22} />
				</div>
				<div className="min-w-0">
					<p className="truncate text-2xl font-bold text-navy">{value}</p>
					<p className="text-xs text-gray-500">{label}</p>
				</div>
			</div>
		);
	}

	if (variant === "solid") {
		return (
			<div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
				<div
					className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.solid}`}
				>
					<Icon name={icon} size={22} />
				</div>
				<div>
					<p className="text-3xl font-bold text-navy">{value}</p>
					<p className="text-sm text-gray-500">{label}</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex min-h-32 flex-col justify-between rounded-2xl p-5 ${styles.soft}`}
		>
			<div
				className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ${styles.text}`}
			>
				<Icon name={icon} size={18} />
			</div>
			<div>
				<p className="mt-3 text-3xl font-bold text-navy">{value}</p>
				<p className="text-sm text-gray-500">{label}</p>
			</div>
		</div>
	);
};
