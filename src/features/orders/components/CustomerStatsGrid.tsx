import { StatCard } from "@/common/components/ui/StatCard";
import { locations } from "@/common/locations";

type CustomerStatsGridProps = {
	stats: {
		total: number;
		pending: number;
		delivered: number;
		cancelled: number;
	};
};

/** Resumen de pedidos del cliente en su Panel principal. */
export const CustomerStatsGrid = ({ stats }: CustomerStatsGridProps) => {
	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			<StatCard
				variant="solid"
				label={locations.customerOrders.totalOrders}
				value={stats.total}
				icon="shoppingBag"
				tone="navy"
			/>
			<StatCard
				variant="solid"
				label={locations.customerOrders.pending}
				value={stats.pending}
				icon="clock"
				tone="warning"
			/>
			<StatCard
				variant="solid"
				label={locations.customerOrders.delivered}
				value={stats.delivered}
				icon="checkCircle"
				tone="success"
			/>
			<StatCard
				variant="solid"
				label={locations.customerOrders.cancelled}
				value={stats.cancelled}
				icon="xCircle"
				tone="neutral"
			/>
		</div>
	);
};
