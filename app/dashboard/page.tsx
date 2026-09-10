"use client";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
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
			{/* Ventas de hoy*/}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
				<div className="lg:col-span-1">
					<StatCard
						title="Entregados"
						value="2"
						icon={CheckCircle2}
						variant="success"
					/>
				</div>
				<div className="lg:col-span-1">
					<StatCard
						title="Pendientes"
						value="2"
						icon={Clock}
						variant="primary"
					/>
				</div>
				<div className="lg:col-span-1">
					<StatCard
						title="Cancelados"
						value="1"
						icon={XCircle}
						variant="danger"
					/>
				</div>
				<div className="lg:col-span-1">
					<StatCard title="Total" value="7" icon={Calendar} variant="default" />
				</div>
				<div className="lg:col-span-1">
					<DailyGoalCard
						title="Meta del día"
						percentage={4}
						current={2}
						target={50}
					/>
				</div>
			</div>

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
