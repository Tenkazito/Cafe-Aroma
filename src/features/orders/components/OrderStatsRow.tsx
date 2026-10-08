import { StatCard } from "@/common/components/ui/StatCard";
import { locations } from "@/common/locations";
import type { OrderStatusCounts } from "@/features/orders/types";

type OrderStatsRowProps = {
	counts: OrderStatusCounts;
};

/** Fila de 4 tarjetas con el conteo de pedidos del día (pantalla Pedidos del admin). */
export const OrderStatsRow = ({ counts }: OrderStatsRowProps) => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				variant="outlined"
				label={locations.orders.totalOrders}
				value={counts.total}
				icon="shoppingBag"
				tone="navy"
			/>
			<StatCard
				variant="outlined"
				label={locations.orders.delivered}
				value={counts.entregado}
				icon="checkCircle"
				tone="success"
			/>
			<StatCard
				variant="outlined"
				label={locations.orders.pending}
				value={counts.pendiente}
				icon="clock"
				tone="info"
			/>
			<StatCard
				variant="outlined"
				label={locations.orders.cancelled}
				value={counts.cancelado}
				icon="xCircle"
				tone="danger"
			/>
		</div>
	);
};
