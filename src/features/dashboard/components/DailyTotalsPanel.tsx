import { SectionCard } from "@/common/components/ui/SectionCard";
import { StatCard } from "@/common/components/ui/StatCard";
import { DailyGoalCard } from "@/features/dashboard/components/DailyGoalCard";
import type { DailyGoal } from "@/features/dashboard/types";
import type { OrderStatusCounts } from "@/features/orders/types";

type DailyTotalsPanelProps = {
	counts: OrderStatusCounts;
	goal: DailyGoal;
};

/** Sección "Totales del día": pedidos por estado + meta del día. */
export const DailyTotalsPanel = ({ counts, goal }: DailyTotalsPanelProps) => {
	return (
		<SectionCard title="Totales del día" icon="trendingUp">
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
				<StatCard
					label="Entregados"
					value={counts.entregado}
					icon="checkCircle"
					tone="success"
				/>
				<StatCard
					label="Pendientes"
					value={counts.pendiente}
					icon="clock"
					tone="info"
				/>
				<StatCard
					label="Cancelados"
					value={counts.cancelado}
					icon="xCircle"
					tone="danger"
				/>
				<StatCard
					label="Total"
					value={counts.total}
					icon="shoppingBag"
					tone="neutral"
				/>
				<div className="col-span-2 lg:col-span-1">
					<DailyGoalCard goal={goal} />
				</div>
			</div>
		</SectionCard>
	);
};
