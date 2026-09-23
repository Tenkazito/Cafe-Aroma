import { StatCard } from "@/common/components/ui/StatCard";
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
				label="Total Pedidos"
				value={counts.total}
				icon="shoppingBag"
				tone="navy"
			/>
			<StatCard
				variant="outlined"
				label="Entregados"
				value={counts.entregado}
				icon="checkCircle"
				tone="success"
			/>
			<StatCard
				variant="outlined"
				label="Pendientes"
				value={counts.pendiente}
				icon="clock"
				tone="info"
			/>
			<StatCard
				variant="outlined"
				label="Cancelados"
				value={counts.cancelado}
				icon="xCircle"
				tone="danger"
			/>
		</div>
	);
};
