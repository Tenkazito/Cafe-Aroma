import type { Product } from "@/features/products/types";

/** Filtra productos cuyo nombre o categoría contenga el texto buscado. */
export const filterProducts = (
	products: Product[],
	search: string,
): Product[] => {
	const normalizedSearch = search.trim().toLowerCase();
	if (!normalizedSearch) return products;

	return products.filter(
		(product) =>
			product.name.toLowerCase().includes(normalizedSearch) ||
			product.categoryName.toLowerCase().includes(normalizedSearch),
	);
};
