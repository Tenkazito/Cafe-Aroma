"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { OrderDetailModal } from "@/features/orders/components/OrderDetailModal";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrderStatsRow } from "@/features/orders/components/OrderStatsRow";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { countOrdersByStatus } from "@/features/orders/lib/countOrdersByStatus";
import {
	EMPTY_ORDER_FILTERS,
	filterOrders,
} from "@/features/orders/lib/filterOrders";
import { formatOrderId } from "@/features/orders/lib/orderTotals";
import type { Order } from "@/features/orders/types";

type OrdersManagerProps = {
	orders: Order[];
};

type OrderModal = "detail" | "accept" | "reject";

/** Pantalla Pedidos: resumen, filtros, tabla y modales de ver / aceptar / rechazar. */
export const OrdersManager = ({ orders }: OrdersManagerProps) => {
	const [filters, setFilters] = useState(EMPTY_ORDER_FILTERS);
	const [openModal, setOpenModal] = useState<OrderModal | null>(null);
	const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
		undefined,
	);

	const visibleOrders = filterOrders(orders, filters);
	// Los contadores reflejan el día completo, no lo filtrado
	const counts = countOrdersByStatus(orders);

	const open = (modal: OrderModal) => (order: Order) => {
		setSelectedOrder(order);
		setOpenModal(modal);
	};

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) setOpenModal(null);
	};

	const orderLabel = selectedOrder ? formatOrderId(selectedOrder.id) : "";

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Pedidos"
				description="Gestión y seguimiento de pedidos del día"
				icon="clipboardList"
			/>

			<OrderStatsRow counts={counts} />
			<OrderFilters value={filters} onChange={setFilters} />
			<OrdersTable
				orders={visibleOrders}
				onView={open("detail")}
				onAccept={open("accept")}
				onReject={open("reject")}
			/>

			<OrderDetailModal
				isOpen={openModal === "detail"}
				onOpenChange={handleOpenChange}
				order={selectedOrder}
			/>

			<ConfirmDialog
				isOpen={openModal === "accept"}
				onOpenChange={handleOpenChange}
				title="Aceptar Pedido"
				confirmLabel="Aceptar"
				// TODO: llamar al Server Action que cambia el estado a "pendiente"
				onConfirm={() =>
					toast.success(`Pedido ${orderLabel} aceptado (simulado)`)
				}
				message={
					<>
						¿Confirmas que deseas{" "}
						<strong className="text-teal-strong">aceptar</strong> el pedido{" "}
						<strong className="text-navy">{orderLabel}</strong>? El estado
						cambiará a <strong className="text-navy">Pendiente</strong>.
					</>
				}
			/>

			<ConfirmDialog
				isOpen={openModal === "reject"}
				onOpenChange={handleOpenChange}
				title="Rechazar Pedido"
				tone="danger"
				confirmLabel="Rechazar"
				// TODO: llamar al Server Action que cambia el estado a "cancelado"
				onConfirm={() =>
					toast.danger(`Pedido ${orderLabel} rechazado (simulado)`)
				}
				message={
					<>
						¿Confirmas que deseas{" "}
						<strong className="text-red-600">rechazar</strong> el pedido{" "}
						<strong className="text-navy">{orderLabel}</strong>? El estado
						cambiará a <strong className="text-navy">Cancelado</strong>.
					</>
				}
			/>
		</div>
	);
};
