"use client";
import { Card } from "@heroui/react";
import Title from "@/common/components/Title";
import {
	MOCK_CUSTOMERS,
	MOCK_PRODUCTS,
	MOCK_SALES_SUMMARY,
} from "@/common/mocks/dashboard";
import { DailyGoalCard } from "@/features/dashboard/components/DailyGoalCard";
import { LoyalCustomersWidget } from "@/features/dashboard/components/LoyalCustomersWidget";
import { SalesSummaryWidget } from "@/features/dashboard/components/SalesSummaryWidget";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { TopProductsWidget } from "@/features/dashboard/components/TopProductsWidget";

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-6 pb-12">
			{/* Ventas de hoy */}
			<Card className="shadow-sm border border-gray-100 rounded-2xl w-full bg-white">
				<Card.Content className="p-5">
					<div className="mb-4 ml-2">
						<Title icon="moveUpRight" title="Totales del día" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
						<StatCard
							title="Entregados"
							value="2"
							icon="checkCircle2"
							variant="success"
						/>
						<StatCard
							title="Pendientes"
							value="2"
							icon="clock"
							variant="primary"
						/>
						<StatCard
							title="Cancelados"
							value="1"
							icon="xCircle"
							variant="danger"
						/>
						<StatCard
							title="Total"
							value="7"
							icon="calendar"
							variant="default"
						/>
						<DailyGoalCard
							title="Meta del día"
							percentage={4}
							current={2}
							target={50}
						/>
					</div>
				</Card.Content>
			</Card>

			{/* Productos mas vendidos */}
			<div>
				<TopProductsWidget products={MOCK_PRODUCTS} />
			</div>

			{/* Resumen de ventas y clientes leales */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
				<div>
					<SalesSummaryWidget items={MOCK_SALES_SUMMARY} />
				</div>
				<div>
					<LoyalCustomersWidget customers={MOCK_CUSTOMERS} />
				</div>
			</div>
		</div>
	);
}
