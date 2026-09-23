"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { CustomerOrdersManager } from "@/features/orders/components/CustomerOrdersManager";
import { CustomerOrdersTable } from "@/features/orders/components/CustomerOrdersTable";
import { CustomerStatsGrid } from "@/features/orders/components/CustomerStatsGrid";
import { OrderCtaCard } from "@/features/orders/components/OrderCtaCard";
import { OrderDetailModal } from "@/features/orders/components/OrderDetailModal";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrderStatsRow } from "@/features/orders/components/OrderStatsRow";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { OrdersManager } from "@/features/orders/components/OrdersManager";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { countOrdersByStatus } from "@/features/orders/lib/countOrdersByStatus";
import { EMPTY_ORDER_FILTERS } from "@/features/orders/lib/filterOrders";
import {
	MOCK_CUSTOMER_ORDER_STATS,
	MOCK_CUSTOMER_ORDERS,
	MOCK_ORDERS,
} from "@/features/orders/mocks/orders";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

const AdminOrdersGroup = () => {
	const [filters, setFilters] = useState(EMPTY_ORDER_FILTERS);

	return (
		<ShowcaseGroup title="Admin" description="Componentes de /admin/pedidos.">
			<ComponentPreview
				name="OrderStatusBadge"
				description="Estado del pedido con su color (definidos en lib/orderStatuses.ts). Se usa en admin, cliente y facturación."
				path="src/features/orders/components/OrderStatusBadge.tsx"
				background="white"
			>
				<div className="flex gap-2">
					<OrderStatusBadge status="solicitado" />
					<OrderStatusBadge status="pendiente" />
					<OrderStatusBadge status="entregado" />
					<OrderStatusBadge status="cancelado" />
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="OrderStatsRow"
				description="4 tarjetas con el conteo de pedidos por estado."
				path="src/features/orders/components/OrderStatsRow.tsx"
			>
				<OrderStatsRow counts={countOrdersByStatus(MOCK_ORDERS)} />
			</ComponentPreview>

			<ComponentPreview
				name="OrderFilters"
				description="Barra de filtros configurable: se eligen qué campos mostrar. La reutilizan Facturación y el cliente."
				path="src/features/orders/components/OrderFilters.tsx"
				props={[
					{
						name: "fields",
						description: '("status" | "date" | "customer" | "search")[]',
					},
					{
						name: "value / onChange",
						description: "OrderFiltersValue controlado desde afuera",
					},
					{ name: "variant", description: '"default" | "soft"' },
				]}
			>
				<div className="flex flex-col gap-4">
					<OrderFilters value={filters} onChange={setFilters} />
					<OrderFilters
						value={filters}
						onChange={setFilters}
						fields={["date", "customer", "search"]}
					/>
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="OrdersTable"
				description="Tabla de pedidos. Aceptar/Rechazar solo aparecen en los 'Solicitado' y solo si se pasan onAccept/onReject."
				path="src/features/orders/components/OrdersTable.tsx"
				props={[
					{ name: "onView", description: "Botón Ver (obligatorio)" },
					{ name: "onAccept / onReject", description: "Opcionales" },
					{
						name: "viewLabel / optionsHeader",
						description: "Textos del botón y la columna",
					},
				]}
			>
				<OrdersTable
					orders={MOCK_ORDERS.slice(0, 4)}
					onView={(order) => toast.info(`Ver #${order.id}`)}
					onAccept={(order) => toast.info(`Aceptar #${order.id}`)}
					onReject={(order) => toast.info(`Rechazar #${order.id}`)}
				/>
			</ComponentPreview>

			<ComponentPreview
				name="OrderDetailModal"
				description="Detalle de un pedido: cliente, ubicación, productos y total."
				path="src/features/orders/components/OrderDetailModal.tsx"
			>
				<ModalPreview
					label="Ver pedido #1045"
					renderModal={(isOpen, onOpenChange) => (
						<OrderDetailModal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							order={MOCK_ORDERS[0]}
						/>
					)}
				/>
			</ComponentPreview>

			<ComponentPreview
				name="OrdersManager"
				description="Pantalla completa de /admin/pedidos con los modales de aceptar, rechazar y ver."
				path="src/features/orders/components/OrdersManager.tsx"
			>
				<OrdersManager orders={MOCK_ORDERS} />
			</ComponentPreview>
		</ShowcaseGroup>
	);
};

const CustomerOrdersGroup = () => (
	<ShowcaseGroup
		title="Cliente"
		description="Componentes de /inicio y /mis-pedidos."
	>
		<ComponentPreview
			name="CustomerStatsGrid"
			description="Resumen histórico de pedidos del cliente (StatCard solid)."
			path="src/features/orders/components/CustomerStatsGrid.tsx"
			background="client"
		>
			<CustomerStatsGrid stats={MOCK_CUSTOMER_ORDER_STATS} />
		</ComponentPreview>

		<ComponentPreview
			name="OrderCtaCard"
			description="'¿Listo para pedir?' con enlace a /solicitar."
			path="src/features/orders/components/OrderCtaCard.tsx"
			background="client"
		>
			<OrderCtaCard />
		</ComponentPreview>

		<ComponentPreview
			name="CustomerOrdersTable"
			description="Historial del cliente con el botón 'Volver a pedir'."
			path="src/features/orders/components/CustomerOrdersTable.tsx"
			background="client"
		>
			<CustomerOrdersTable
				orders={MOCK_CUSTOMER_ORDERS.slice(0, 3)}
				onReorder={(order) => toast.info(`Volver a pedir ${order.code}`)}
			/>
		</ComponentPreview>

		<ComponentPreview
			name="CustomerOrdersManager"
			description="Pantalla completa de /mis-pedidos (filtros estado y fecha + tabla)."
			path="src/features/orders/components/CustomerOrdersManager.tsx"
			background="client"
		>
			<CustomerOrdersManager orders={MOCK_CUSTOMER_ORDERS} />
		</ComponentPreview>
	</ShowcaseGroup>
);

const LogicGroup = () => (
	<ShowcaseGroup title="Lógica">
		<ComponentPreview
			kind="code"
			name="filterOrders / filterCustomerOrders"
			description="Aplican los filtros; un filtro vacío se ignora."
			path="src/features/orders/lib/filterOrders.ts · filterCustomerOrders.ts"
		/>
		<ComponentPreview
			kind="code"
			name="countOrdersByStatus(orders)"
			description="Cuenta pedidos por estado + total. Alimenta el dashboard y la pantalla de pedidos."
			path="src/features/orders/lib/countOrdersByStatus.ts"
		/>
		<ComponentPreview
			kind="code"
			name="getOrderTotal / getItemSubtotal / formatOrderId"
			description="El total siempre se calcula desde los productos (cantidad × precio), nunca se guarda a mano."
			path="src/features/orders/lib/orderTotals.ts"
		/>
	</ShowcaseGroup>
);

export const OrdersShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("orders")}>
			<AdminOrdersGroup />
			<CustomerOrdersGroup />
			<LogicGroup />
		</ShowcasePage>
	);
};
