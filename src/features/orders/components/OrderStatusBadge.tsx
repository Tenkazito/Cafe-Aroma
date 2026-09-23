import { Badge } from "@/common/components/ui/Badge";
import { ORDER_STATUSES } from "@/features/orders/lib/orderStatuses";
import type { OrderStatus } from "@/features/orders/types";

type OrderStatusBadgeProps = {
	status: OrderStatus;
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
	const { label, tone } = ORDER_STATUSES[status];
	return <Badge tone={tone}>{label}</Badge>;
};
