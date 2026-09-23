"use client";

import { Button } from "@heroui/react";
import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { Icon } from "@/common/components/ui/Icon";
import { formatCurrency } from "@/common/utils/format";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import type { CustomerOrder } from "@/features/orders/types";

type CustomerOrdersTableProps = {
	orders: CustomerOrder[];
	onReorder: (order: CustomerOrder) => void;
};

/** Historial de pedidos del cliente con el botón "Volver a pedir". */
export const CustomerOrdersTable = ({
	orders,
	onReorder,
}: CustomerOrdersTableProps) => {
	const columns: DataTableColumn<CustomerOrder>[] = [
		{
			key: "code",
			header: "Orden",
			cell: (order) => (
				<span className="font-bold text-navy">{order.code}</span>
			),
		},
		{
			key: "date",
			header: "Fecha",
			cell: (order) => order.date,
			className: "text-gray-500",
		},
		{
			key: "total",
			header: "Valor",
			cell: (order) => (
				<span className="font-semibold text-navy">
					{formatCurrency(order.total)}
				</span>
			),
		},
		{
			key: "status",
			header: "Estado",
			cell: (order) => <OrderStatusBadge status={order.status} />,
		},
		{
			key: "options",
			header: "Opciones",
			align: "right",
			cell: (order) => (
				<Button size="sm" onPress={() => onReorder(order)}>
					<Icon name="rotateCcw" size={14} />
					Volver a pedir
					<Icon name="chevronRight" size={14} />
				</Button>
			),
		},
	];

	return (
		<DataTable
			ariaLabel="Últimos pedidos"
			columns={columns}
			rows={orders}
			getRowKey={(order) => order.code}
			emptyMessage="No tienes pedidos con esos filtros."
		/>
	);
};
