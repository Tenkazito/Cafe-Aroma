"use client";

import { Button } from "@heroui/react";
import { AppModal } from "@/common/components/overlay/AppModal";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";
import { formatCurrency } from "@/common/utils/format";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import {
	formatOrderId,
	getItemSubtotal,
	getOrderTotal,
} from "@/features/orders/lib/orderTotals";
import type { Order } from "@/features/orders/types";

type OrderDetailModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	order?: Order;
};

/** Detalle de un pedido: cliente, dirección, productos y total. */
export const OrderDetailModal = ({
	isOpen,
	onOpenChange,
	order,
}: OrderDetailModalProps) => {
	if (!order) return null;

	return (
		<AppModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={locations.orders.detailTitle(formatOrderId(order.id))}
			footer={
				<Button variant="outline" onPress={() => onOpenChange(false)}>
					{locations.actions.close}
				</Button>
			}
		>
			<div className="flex flex-col gap-5">
				<div className="flex items-center justify-between">
					<OrderStatusBadge status={order.status} />
					<span className="flex items-center gap-1.5 text-sm text-gray-500">
						<Icon name="calendar" size={16} />
						{order.createdAt}
					</span>
				</div>

				<div className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
					<div>
						<p className="text-xs font-semibold text-gray-400 uppercase">
							{locations.orders.customer}
						</p>
						<p className="font-semibold text-navy">{order.customerName}</p>
					</div>
					<div>
						<p className="text-xs font-semibold text-gray-400 uppercase">
							{locations.orders.location}
						</p>
						<p className="flex items-center gap-1.5 text-sm text-gray-600">
							<Icon name="mapPin" size={14} className="shrink-0" />
							{order.address}
						</p>
					</div>
				</div>

				<div>
					<p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
						{locations.orders.orderProducts}
					</p>
					<ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
						{order.items.map((item) => (
							<li
								key={item.productName}
								className="flex items-center justify-between p-4"
							>
								<div>
									<p className="font-semibold text-navy">{item.productName}</p>
									<p className="text-xs text-gray-400">
										{item.quantity} x {formatCurrency(item.unitPrice)}
									</p>
								</div>
								<span className="font-semibold text-navy">
									{formatCurrency(getItemSubtotal(item))}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div className="flex items-center justify-between rounded-xl bg-mint/40 p-4">
					<span className="font-medium text-navy">
						{locations.orders.orderTotal}
					</span>
					<span className="text-2xl font-bold text-navy">
						{formatCurrency(getOrderTotal(order))}
					</span>
				</div>
			</div>
		</AppModal>
	);
};
