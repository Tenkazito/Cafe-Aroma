"use client";

import { useState } from "react";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { locations } from "@/common/locations";
import { BillingStats } from "@/features/billing/components/BillingStats";
import { InvoiceModal } from "@/features/billing/components/InvoiceModal";
import { getBilledTotal, getInvoices } from "@/features/billing/lib/invoices";
import { OrderFilters } from "@/features/orders/components/OrderFilters";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import {
	EMPTY_ORDER_FILTERS,
	filterOrders,
} from "@/features/orders/lib/filterOrders";
import type { Order } from "@/features/orders/types";

type BillingManagerProps = {
	/** Todos los pedidos del día; aquí se quedan solo los entregados. */
	orders: Order[];
	/** Fecha "AAAA-MM-DD" del reporte. */
	reportDate: string;
};

/** Pantalla Facturación: resumen, filtros y tabla de órdenes entregadas con su factura. */
export const BillingManager = ({ orders, reportDate }: BillingManagerProps) => {
	const [filters, setFilters] = useState(EMPTY_ORDER_FILTERS);
	const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
	const [selectedInvoice, setSelectedInvoice] = useState<Order | undefined>(
		undefined,
	);

	const invoices = getInvoices(orders);
	const visibleInvoices = filterOrders(invoices, filters);

	const openInvoice = (invoice: Order) => {
		setSelectedInvoice(invoice);
		setIsInvoiceOpen(true);
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.billing.title}
				description={locations.billing.description}
				icon="receipt"
			/>

			<BillingStats
				invoiceCount={invoices.length}
				billedTotal={getBilledTotal(invoices)}
				reportDate={reportDate}
			/>
			<OrderFilters
				value={filters}
				onChange={setFilters}
				fields={["date", "customer", "search"]}
			/>
			<OrdersTable
				orders={visibleInvoices}
				onView={openInvoice}
				viewLabel={locations.actions.viewDetails}
				optionsHeader={locations.table.details}
			/>

			<InvoiceModal
				isOpen={isInvoiceOpen}
				onOpenChange={setIsInvoiceOpen}
				invoice={selectedInvoice}
			/>
		</div>
	);
};
