"use client";

import { Tabs } from "@heroui/react";
import { useState } from "react";
import { Icon, type IconName } from "@/common/components/ui/Icon";
import { SectionCard } from "@/common/components/ui/SectionCard";
import { formatCurrency } from "@/common/utils/format";
import type { SalesPeriod, SalesSummary } from "@/features/dashboard/types";

type SalesSummaryWidgetProps = {
	summaryByPeriod: Record<SalesPeriod, SalesSummary>;
};

const PERIOD_TABS: { id: SalesPeriod; label: string }[] = [
	{ id: "dia", label: "Día" },
	{ id: "semana", label: "Semana" },
	{ id: "mes", label: "Mes" },
];

type SummaryRow = {
	icon: IconName;
	iconClasses: string;
	value: string;
	label: string;
};

const buildRows = (summary: SalesSummary): SummaryRow[] => [
	{
		icon: "shoppingBag",
		iconClasses: "bg-emerald-50 text-emerald-600",
		value: String(summary.salesCount),
		label: "Ventas realizadas",
	},
	{
		icon: "wallet",
		iconClasses: "bg-blue-50 text-blue-500",
		value: formatCurrency(summary.revenue),
		label: "Ganancias totales",
	},
	{
		icon: "piggyBank",
		iconClasses: "bg-amber-50 text-amber-500",
		value: formatCurrency(summary.savings),
		label: "Ahorro acumulado",
	},
];

/** "Resumen de ventas" con pestañas para cambiar entre día, semana y mes. */
export const SalesSummaryWidget = ({
	summaryByPeriod,
}: SalesSummaryWidgetProps) => {
	const [period, setPeriod] = useState<SalesPeriod>("dia");
	const rows = buildRows(summaryByPeriod[period]);

	return (
		<SectionCard
			title="Resumen de ventas"
			className="h-full"
			action={
				<Tabs
					selectedKey={period}
					onSelectionChange={(key) => setPeriod(key as SalesPeriod)}
				>
					<Tabs.ListContainer>
						<Tabs.List aria-label="Periodo del resumen">
							{PERIOD_TABS.map((tab) => (
								<Tabs.Tab key={tab.id} id={tab.id} className="text-xs">
									{tab.label}
									<Tabs.Indicator />
								</Tabs.Tab>
							))}
						</Tabs.List>
					</Tabs.ListContainer>
				</Tabs>
			}
		>
			<ul className="flex flex-col gap-3">
				{rows.map((row) => (
					<li
						key={row.label}
						className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
					>
						<div className="flex items-center gap-4">
							<div
								className={`flex h-11 w-11 items-center justify-center rounded-xl ${row.iconClasses}`}
							>
								<Icon name={row.icon} />
							</div>
							<div>
								<p className="text-xl font-bold text-navy">{row.value}</p>
								<p className="text-xs text-gray-500">{row.label}</p>
							</div>
						</div>
						<Icon name="arrowRight" size={16} className="text-gray-300" />
					</li>
				))}
			</ul>
		</SectionCard>
	);
};
