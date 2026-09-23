"use client";

import { useState } from "react";
import { getCartTotals } from "@/features/catalog/lib/cartTotals";
import type { CartItem, CatalogProduct } from "@/features/catalog/types";

/**
 * Estado del carrito ("Resumen del pedido"). Vive solo en memoria del
 * navegador: si se recarga la página, el carrito se vacía.
 */
export const useCart = (initialItems: CartItem[] = []) => {
	const [items, setItems] = useState<CartItem[]>(initialItems);

	const addProduct = (product: CatalogProduct) => {
		setItems((currentItems) => {
			const existingItem = currentItems.find(
				(item) => item.productId === product.id,
			);

			if (existingItem) {
				return currentItems.map((item) =>
					item.productId === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}

			return [
				...currentItems,
				{
					productId: product.id,
					name: product.name,
					unitPrice: product.price,
					imageUrl: product.imageUrl,
					quantity: 1,
				},
			];
		});
	};

	const changeQuantity = (productId: number, difference: 1 | -1) => {
		setItems((currentItems) =>
			currentItems
				.map((item) =>
					item.productId === productId
						? { ...item, quantity: item.quantity + difference }
						: item,
				)
				// Al bajar a 0 unidades el producto sale del carrito
				.filter((item) => item.quantity > 0),
		);
	};

	const clear = () => setItems([]);

	return {
		items,
		...getCartTotals(items),
		addProduct,
		increment: (productId: number) => changeQuantity(productId, 1),
		decrement: (productId: number) => changeQuantity(productId, -1),
		clear,
	};
};
