"use client";
import { Card, Tabs } from "@heroui/react";
import RenderIcon from "@/common/components/RenderIcon";
import { useState } from "react";

export interface SalesSummaryItemData {
	id: string;
	icon: string;
	value: string | number;
	label: string;
	iconBgColor: string;
	iconColor: string;
}

interface SalesSummaryWidgetProps {
	items: SalesSummaryItemData[];
}

export const SalesSummaryWidget = ({ items }: SalesSummaryWidgetProps) => {
	const [selected, setSelected] = useState("dia");

	return (
		<Card className="shadow-sm border border-gray-100 rounded-2xl w-full h-full bg-white">
			<Card.Content className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-navy">Resumen de ventas</h2>
					<Tabs
						selectedKey={selected}
						onSelectionChange={(key) => setSelected(key as string)}
						className="w-fit"
					>
						<Tabs.ListContainer>
							<Tabs.List
								aria-label="Rango de fechas"
								className="bg-gray-100 rounded-lg p-1"
							>
								<Tabs.Tab
									id="dia"
									className="text-sm font-medium data-[selected=true]:text-navy"
								>
									Día
									<Tabs.Indicator className="bg-white shadow-sm rounded-md" />
								</Tabs.Tab>
								<Tabs.Tab
									id="semana"
									className="text-sm font-medium data-[selected=true]:text-navy"
								>
									Semana
									<Tabs.Indicator className="bg-white shadow-sm rounded-md" />
								</Tabs.Tab>
								<Tabs.Tab
									id="mes"
									className="text-sm font-medium data-[selected=true]:text-navy"
								>
									Mes
									<Tabs.Indicator className="bg-white shadow-sm rounded-md" />
								</Tabs.Tab>
							</Tabs.List>
						</Tabs.ListContainer>
					</Tabs>
				</div>

				<div className="flex flex-col gap-4 mt-2">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group"
						>
							<div className="flex items-center gap-4">
								<div
									className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBgColor}`}
								>
									<RenderIcon
										icon={item.icon}
										size={24}
										className={item.iconColor}
									/>
								</div>
								<div className="flex flex-col">
									<span className="text-2xl font-bold text-foreground">
										{item.value}
									</span>
									<span className="text-sm text-gray-500">{item.label}</span>
								</div>
							</div>
							<RenderIcon
								icon="chevronRight"
								size={20}
								className="text-gray-300 group-hover:text-navy transition-colors"
							/>
						</div>
					))}
				</div>
			</Card.Content>
		</Card>
	);
};
