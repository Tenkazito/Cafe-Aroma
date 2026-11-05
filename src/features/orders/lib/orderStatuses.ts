import type { BadgeTone } from "@/common/components/ui/Badge";
import { locations } from "@/common/locations";
import type { OrderStatus } from "@/features/orders/types";

/** Texto y color de cada estado de pedido. */
export const ORDER_STATUSES: Record<
	OrderStatus,
	{ label: string; tone: BadgeTone }
> = {
	solicitado: { label: locations.orderStatus.solicitado, tone: "warning" },
	pendiente: { label: locations.orderStatus.pendiente, tone: "info" },
	entregado: { label: locations.orderStatus.entregado, tone: "success" },
	cancelado: { label: locations.orderStatus.cancelado, tone: "danger" },
};

/** Opciones del filtro "Estado", con "Todos" al inicio. */
export const ORDER_STATUS_FILTER_OPTIONS = [
	{ value: "todos", label: locations.status.all },
	...Object.entries(ORDER_STATUSES).map(([value, { label }]) => ({
		value,
		label,
	})),
];
