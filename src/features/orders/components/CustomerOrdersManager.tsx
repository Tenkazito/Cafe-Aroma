"use client";

import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { CustomerOrdersTable } from "@/features/orders/components/CustomerOrdersTable";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { filterCustomerOrders } from "@/features/orders/lib/filterCustomerOrders";
import { EMPTY_ORDER_FILTERS } from "@/features/orders/lib/filterOrders";
import type { CustomerOrder } from "@/features/orders/types";

type CustomerOrdersManagerProps = {
	orders: CustomerOrder[];
};

/** Pantalla "Últimos pedidos" del cliente. */
export const CustomerOrdersManager = ({
	orders,
}: CustomerOrdersManagerProps) => {
	const router = useRouter();
	const [filters, setFilters] = useState(EMPTY_ORDER_FILTERS);
	const visibleOrders = filterCustomerOrders(orders, filters);

	const handleReorder = (order: CustomerOrder) => {
		// TODO: copiar los productos de la orden al carrito antes de ir a Solicitar
		toast.info(`Repitiendo la orden ${order.code} (simulado)`);
		router.push("/solicitar");
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Últimos Pedidos"
				description="Consulta el historial de tus pedidos y vuelve a realizarlos."
			/>
			<OrderFilters
				title={null}
				value={filters}
				onChange={setFilters}
				fields={["status", "date"]}
				variant="soft"
			/>
			<CustomerOrdersTable orders={visibleOrders} onReorder={handleReorder} />
		</div>
	);
};
