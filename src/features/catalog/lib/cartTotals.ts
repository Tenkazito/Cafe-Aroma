import type { CartItem } from "@/features/catalog/types";

/** Cantidad total de unidades y valor total del carrito. */
export const getCartTotals = (
	items: CartItem[],
): { itemCount: number; total: number } => {
	return items.reduce(
		(totals, item) => ({
			itemCount: totals.itemCount + item.quantity,
			total: totals.total + item.quantity * item.unitPrice,
		}),
		{ itemCount: 0, total: 0 },
	);
};
