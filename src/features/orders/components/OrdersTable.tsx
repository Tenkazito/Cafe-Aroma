"use client";

import { Button } from "@heroui/react";
import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { Icon } from "@/common/components/ui/Icon";
import { formatCurrency } from "@/common/utils/format";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import {
	formatOrderId,
	getOrderTotal,
} from "@/features/orders/lib/orderTotals";
import type { Order } from "@/features/orders/types";

type OrdersTableProps = {
	orders: Order[];
	onView: (order: Order) => void;
	/** Si se omiten, la tabla no muestra Aceptar/Rechazar (ej. Facturación). */
	onAccept?: (order: Order) => void;
	onReject?: (order: Order) => void;
	/** Texto del botón de ver ("Ver" en Pedidos, "Ver detalles" en Facturación). */
	viewLabel?: string;
	/** Título de la última columna. */
	optionsHeader?: string;
};

export const OrdersTable = ({
	orders,
	onView,
	onAccept,
	onReject,
	viewLabel = "Ver",
	optionsHeader = "Opciones",
}: OrdersTableProps) => {
	const renderOptions = (order: Order) => {
		// Solo los pedidos recién solicitados se pueden aceptar o rechazar
		const canDecide = order.status === "solicitado" && onAccept && onReject;

		return (
			<div className="flex items-center justify-end gap-1.5">
				{canDecide && (
					<>
						<Button
							size="sm"
							variant="ghost"
							className="bg-emerald-50 text-emerald-700"
							onPress={() => onAccept(order)}
						>
							<Icon name="check" size={14} />
							Aceptar
						</Button>
						<Button
							size="sm"
							variant="ghost"
							className="bg-red-50 text-red-600"
							onPress={() => onReject(order)}
						>
							<Icon name="x" size={14} />
							Rechazar
						</Button>
					</>
				)}
				<Button
					size="sm"
					variant="ghost"
					className="text-gray-500"
					onPress={() => onView(order)}
					aria-label={`${viewLabel} pedido ${formatOrderId(order.id)}`}
				>
					<Icon name="eye" size={14} />
					{viewLabel}
				</Button>
			</div>
		);
	};

	const columns: DataTableColumn<Order>[] = [
		{
			key: "id",
			header: "ID Orden",
			cell: (order) => (
				<span className="font-bold text-navy">{formatOrderId(order.id)}</span>
			),
		},
		{
			key: "date",
			header: "Fecha",
			cell: (order) => order.createdAt,
			className: "text-gray-500",
		},
		{
			key: "customer",
			header: "Cliente",
			cell: (order) => (
				<span className="font-medium text-navy">{order.customerName}</span>
			),
		},
		{
			key: "address",
			header: "Ubicación",
			cell: (order) => (
				<span className="flex max-w-56 items-center gap-1.5 text-gray-500">
					<Icon name="mapPin" size={14} className="shrink-0 text-gray-400" />
					<span className="truncate" title={order.address}>
						{order.address}
					</span>
				</span>
			),
		},
		{
			key: "total",
			header: "Valor",
			align: "right",
			cell: (order) => (
				<span className="font-semibold text-navy">
					{formatCurrency(getOrderTotal(order))}
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
			header: optionsHeader,
			align: "right",
			cell: renderOptions,
		},
	];

	return (
		<DataTable
			ariaLabel="Pedidos"
			columns={columns}
			rows={orders}
			getRowKey={(order) => order.id}
			emptyMessage="No hay pedidos con esos filtros."
		/>
	);
};
