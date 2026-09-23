import type { BadgeTone } from "@/common/components/ui/Badge";
import type { OrderStatus } from "@/features/orders/types";

/** Texto y color de cada estado de pedido. */
export const ORDER_STATUSES: Record<
	OrderStatus,
	{ label: string; tone: BadgeTone }
> = {
	solicitado: { label: "Solicitado", tone: "warning" },
	pendiente: { label: "Pendiente", tone: "info" },
	entregado: { label: "Entregado", tone: "success" },
	cancelado: { label: "Cancelado", tone: "danger" },
};

/** Opciones del filtro "Estado", con "Todos" al inicio. */
export const ORDER_STATUS_FILTER_OPTIONS = [
	{ value: "todos", label: "Todos" },
	...Object.entries(ORDER_STATUSES).map(([value, { label }]) => ({
		value,
		label,
	})),
];
