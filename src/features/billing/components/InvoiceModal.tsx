"use client";

import { Button, toast } from "@heroui/react";
import { AppModal } from "@/common/components/overlay/AppModal";
import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { Icon } from "@/common/components/ui/Icon";
import { formatCurrency } from "@/common/utils/format";
import { COMPANY_INFO } from "@/features/billing/lib/invoices";
import {
	formatOrderId,
	getItemSubtotal,
	getOrderTotal,
} from "@/features/orders/lib/orderTotals";
import type { Order, OrderItem } from "@/features/orders/types";

type InvoiceModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	invoice?: Order;
};

const ITEM_COLUMNS: DataTableColumn<OrderItem>[] = [
	{
		key: "product",
		header: "Producto",
		cell: (item) => (
			<span className="font-medium text-navy">{item.productName}</span>
		),
	},
	{
		key: "quantity",
		header: "Cantidad",
		align: "center",
		cell: (item) => item.quantity,
	},
	{
		key: "unitPrice",
		header: "Precio unit.",
		align: "right",
		cell: (item) => formatCurrency(item.unitPrice),
		className: "text-gray-500",
	},
	{
		key: "subtotal",
		header: "Subtotal",
		align: "right",
		cell: (item) => (
			<span className="font-semibold text-navy">
				{formatCurrency(getItemSubtotal(item))}
			</span>
		),
	},
];

/** Factura de un pedido entregado, con opciones de imprimir o enviar por correo. */
export const InvoiceModal = ({
	isOpen,
	onOpenChange,
	invoice,
}: InvoiceModalProps) => {
	if (!invoice) return null;

	const invoiceNumber = formatOrderId(invoice.id);

	return (
		<AppModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={`Factura ${invoiceNumber}`}
			size="lg"
			footer={
				<>
					<Button variant="outline" onPress={() => onOpenChange(false)}>
						Cerrar
					</Button>
					<Button
						variant="outline"
						// TODO: llamar al servicio de correo cuando exista el backend
						onPress={() =>
							toast.info(
								`Factura ${invoiceNumber} enviada por correo (simulado)`,
							)
						}
					>
						<Icon name="mail" size={16} />
						Enviar por correo
					</Button>
					<Button onPress={() => window.print()}>
						<Icon name="printer" size={16} />
						Imprimir factura
					</Button>
				</>
			}
		>
			{/* .print-area: al imprimir solo se ve este bloque (ver globals.css) */}
			<div className="print-area flex flex-col gap-5">
				<div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
							<Icon name="dollar" size={22} />
						</div>
						<div>
							<p className="text-lg font-bold text-navy">{COMPANY_INFO.name}</p>
							<p className="text-xs text-gray-400">
								{COMPANY_INFO.taxId} · {COMPANY_INFO.channel}
							</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-bold text-navy">Factura {invoiceNumber}</p>
						<p className="text-xs text-gray-400">{invoice.createdAt}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
					<div>
						<p className="text-xs font-semibold text-gray-400 uppercase">
							Cliente
						</p>
						<p className="font-semibold text-navy">{invoice.customerName}</p>
					</div>
					<div>
						<p className="text-xs font-semibold text-gray-400 uppercase">
							Ubicación de entrega
						</p>
						<p className="flex items-center gap-1.5 text-sm text-gray-600">
							<Icon name="mapPin" size={14} className="shrink-0" />
							{invoice.address}
						</p>
					</div>
				</div>

				<div>
					<p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
						Detalle de productos
					</p>
					<DataTable
						ariaLabel={`Productos de la factura ${invoiceNumber}`}
						variant="plain"
						columns={ITEM_COLUMNS}
						rows={invoice.items}
						getRowKey={(item) => item.productName}
					/>
				</div>

				<div className="flex items-center justify-between rounded-xl bg-navy p-5 text-white">
					<span className="text-sm text-gray-300">Total a pagar</span>
					<span className="text-2xl font-bold">
						{formatCurrency(getOrderTotal(invoice))}
					</span>
				</div>
			</div>
		</AppModal>
	);
};
