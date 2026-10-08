"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { locations } from "@/common/locations";
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
				title={locations.orders.title}
				description={locations.orders.description}
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
				title={locations.orders.acceptTitle}
				confirmLabel={locations.actions.accept}
				// TODO: llamar al Server Action que cambia el estado a "pendiente"
				onConfirm={() =>
					toast.success(locations.toasts.orderAccepted(orderLabel))
				}
				message={
					<>
						{locations.orders.acceptMessage.intro}
						<strong className="text-teal-strong">
							{locations.orders.acceptMessage.verb}
						</strong>
						{locations.orders.acceptMessage.middle}
						<strong className="text-navy">{orderLabel}</strong>
						{locations.orders.acceptMessage.statusIntro}
						<strong className="text-navy">
							{locations.orderStatus.pendiente}
						</strong>
						{locations.orders.acceptMessage.end}
					</>
				}
			/>

			<ConfirmDialog
				isOpen={openModal === "reject"}
				onOpenChange={handleOpenChange}
				title={locations.orders.rejectTitle}
				tone="danger"
				confirmLabel={locations.actions.reject}
				// TODO: llamar al Server Action que cambia el estado a "cancelado"
				onConfirm={() =>
					toast.danger(locations.toasts.orderRejected(orderLabel))
				}
				message={
					<>
						{locations.orders.rejectMessage.intro}
						<strong className="text-red-600">
							{locations.orders.rejectMessage.verb}
						</strong>
						{locations.orders.rejectMessage.middle}
						<strong className="text-navy">{orderLabel}</strong>
						{locations.orders.rejectMessage.statusIntro}
						<strong className="text-navy">
							{locations.orderStatus.cancelado}
						</strong>
						{locations.orders.rejectMessage.end}
					</>
				}
			/>
		</div>
	);
};
