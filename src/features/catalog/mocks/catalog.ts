import type { CatalogProduct } from "@/features/catalog/types";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";

/** Productos marcados como "Top" (los más vendidos). */
const FEATURED_PRODUCT_IDS = [1, 2, 5, 7, 10];

/**
 * El catálogo del cliente sale de los mismos productos del admin: solo los
 * activos, y se marcan como agotados los que no tienen stock. Así, cuando
 * exista el backend, esta misma transformación la hará la query.
 */
export const MOCK_CATALOG_PRODUCTS: CatalogProduct[] = MOCK_PRODUCTS.filter(
	(product) => product.isActive,
).map((product) => ({
	id: product.id,
	name: product.name,
	description: product.description,
	categoryName: product.categoryName,
	price: product.price,
	imageUrl: product.imageUrl,
	isFeatured: FEATURED_PRODUCT_IDS.includes(product.id),
	isSoldOut: product.stock === 0,
}));

/** Pestañas de categoría: solo las categorías activas. */
export const MOCK_CATALOG_CATEGORIES: string[] = MOCK_CATEGORIES.filter(
	(category) => category.isActive,
).map((category) => category.name);
