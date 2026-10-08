"use client";

import { Button } from "@heroui/react";
import { EmptyState } from "@/common/components/ui/EmptyState";
import { locations } from "@/common/locations";
import { formatCurrency } from "@/common/utils/format";
import { CartItemRow } from "@/features/catalog/components/CartItemRow";
import type { CartItem } from "@/features/catalog/types";

type CartSummaryProps = {
	items: CartItem[];
	itemCount: number;
	total: number;
	onIncrement: (productId: number) => void;
	onDecrement: (productId: number) => void;
	onCheckout: () => void;
};

/** Panel "Resumen del Pedido": productos elegidos, cantidad, total y botón para finalizar. */
export const CartSummary = ({
	items,
	itemCount,
	total,
	onIncrement,
	onDecrement,
	onCheckout,
}: CartSummaryProps) => {
	const isEmpty = items.length === 0;

	return (
		<aside
			aria-label={locations.catalog.cartLabel}
			className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm"
		>
			<h2 className="text-lg font-bold text-navy">
				{locations.catalog.cartTitle}
			</h2>

			{isEmpty ? (
				<EmptyState
					icon="coffee"
					title={locations.catalog.cartEmptyTitle}
					description={locations.catalog.cartEmptyDescription}
				/>
			) : (
				<ul className="flex flex-col gap-3">
					{items.map((item) => (
						<CartItemRow
							key={item.productId}
							item={item}
							onIncrement={() => onIncrement(item.productId)}
							onDecrement={() => onDecrement(item.productId)}
						/>
					))}
				</ul>
			)}

			<dl className="flex flex-col gap-1 border-t border-gray-100 pt-4">
				<div className="flex items-center justify-between text-sm text-gray-500">
					<dt>{locations.catalog.productCount}</dt>
					<dd className="font-semibold text-navy">{itemCount}</dd>
				</div>
				<div className="flex items-center justify-between">
					<dt className="text-sm text-gray-500">{locations.catalog.total}</dt>
					<dd className="text-2xl font-bold text-navy">
						{formatCurrency(total)}
					</dd>
				</div>
			</dl>

			<Button
				fullWidth
				size="lg"
				isDisabled={isEmpty}
				onPress={onCheckout}
				className="bg-teal font-bold text-navy"
			>
				{locations.catalog.checkout}
			</Button>
		</aside>
	);
};
