"use client";

import { DailyGoalCard } from "@/features/dashboard/components/DailyGoalCard";
import { DailyTotalsPanel } from "@/features/dashboard/components/DailyTotalsPanel";
import { LoyalCustomersWidget } from "@/features/dashboard/components/LoyalCustomersWidget";
import { SalesSummaryWidget } from "@/features/dashboard/components/SalesSummaryWidget";
import { TopProductsWidget } from "@/features/dashboard/components/TopProductsWidget";
import {
	MOCK_DAILY_GOAL,
	MOCK_LOYAL_CUSTOMERS,
	MOCK_SALES_SUMMARY,
	MOCK_TOP_PRODUCTS,
} from "@/features/dashboard/mocks/dashboard";
import { countOrdersByStatus } from "@/features/orders/lib/countOrdersByStatus";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

export const DashboardShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("dashboard")}>
			<ShowcaseGroup title="Componentes" description="Todos se usan en /admin.">
				<ComponentPreview
					name="DailyTotalsPanel"
					description="Sección 'Totales del día': pedidos por estado (StatCard tinted) + meta del día."
					path="src/features/dashboard/components/DailyTotalsPanel.tsx"
					props={[
						{
							name: "counts",
							description: "OrderStatusCounts (sale de countOrdersByStatus)",
						},
						{ name: "goal", description: "DailyGoal { current, target }" },
					]}
				>
					<DailyTotalsPanel
						counts={countOrdersByStatus(MOCK_ORDERS)}
						goal={MOCK_DAILY_GOAL}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="DailyGoalCard"
					description="Tarjeta navy con el avance hacia la meta del día. Calcula el porcentaje y lo limita a 100."
					path="src/features/dashboard/components/DailyGoalCard.tsx"
				>
					<div className="grid max-w-xl grid-cols-2 gap-4">
						<DailyGoalCard goal={MOCK_DAILY_GOAL} />
						<DailyGoalCard goal={{ current: 38, target: 50 }} />
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="TopProductsWidget"
					description="Tabla de los productos más vendidos. El stock bajo (≤ 15) sale en naranja."
					path="src/features/dashboard/components/TopProductsWidget.tsx"
					props={[
						{ name: "products", description: "TopProduct[] ya ordenados" },
					]}
				>
					<TopProductsWidget products={MOCK_TOP_PRODUCTS} />
				</ComponentPreview>

				<ComponentPreview
					name="SalesSummaryWidget"
					description="Resumen de ventas con pestañas Día / Semana / Mes (estado local)."
					path="src/features/dashboard/components/SalesSummaryWidget.tsx"
					props={[
						{
							name: "summaryByPeriod",
							description: "Record<SalesPeriod, SalesSummary>",
						},
					]}
				>
					<div className="max-w-xl">
						<SalesSummaryWidget summaryByPeriod={MOCK_SALES_SUMMARY} />
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="LoyalCustomersWidget"
					description="Ranking de clientes con más pedidos."
					path="src/features/dashboard/components/LoyalCustomersWidget.tsx"
				>
					<div className="max-w-xl">
						<LoyalCustomersWidget customers={MOCK_LOYAL_CUSTOMERS} />
					</div>
				</ComponentPreview>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
