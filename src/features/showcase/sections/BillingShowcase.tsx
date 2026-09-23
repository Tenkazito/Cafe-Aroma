"use client";

import { BillingManager } from "@/features/billing/components/BillingManager";
import { BillingStats } from "@/features/billing/components/BillingStats";
import { InvoiceModal } from "@/features/billing/components/InvoiceModal";
import { getBilledTotal, getInvoices } from "@/features/billing/lib/invoices";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

const INVOICES = getInvoices(MOCK_ORDERS);

export const BillingShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("billing")}>
			<ShowcaseGroup
				title="Componentes"
				description="Facturación reutiliza OrderFilters y OrdersTable de la feature orders (dependencia en un solo sentido)."
			>
				<ComponentPreview
					name="BillingStats"
					description="Facturas del día, total facturado y fecha del reporte."
					path="src/features/billing/components/BillingStats.tsx"
				>
					<BillingStats
						invoiceCount={INVOICES.length}
						billedTotal={getBilledTotal(INVOICES)}
						reportDate="2026-08-26"
					/>
				</ComponentPreview>

				<ComponentPreview
					name="InvoiceModal"
					description="Factura con datos de la empresa, cliente, detalle y total. 'Imprimir' usa window.print() y solo imprime la factura."
					path="src/features/billing/components/InvoiceModal.tsx"
				>
					<ModalPreview
						label="Ver factura #1041"
						renderModal={(isOpen, onOpenChange) => (
							<InvoiceModal
								isOpen={isOpen}
								onOpenChange={onOpenChange}
								invoice={INVOICES[0]}
							/>
						)}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="BillingManager"
					description="Pantalla completa de /admin/facturacion."
					path="src/features/billing/components/BillingManager.tsx"
				>
					<BillingManager orders={MOCK_ORDERS} reportDate="2026-08-26" />
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="getInvoices / getBilledTotal / COMPANY_INFO"
					description="Una factura es un pedido entregado; el total facturado es la suma de sus totales."
					path="src/features/billing/lib/invoices.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
