import type { CategorySummary } from "@/features/categories/types";
import type { Product as ProductEntity } from "@/features/products/domain/product.entity";
import type { Product } from "@/features/products/types";

/** Convierte los productos de la API en filas de la tabla, con el nombre de su categoría. */
export const toProductRows = (
	products: ProductEntity[],
	categories: CategorySummary[],
): Product[] => {
	const categoryNames = new Map(
		categories.map((category) => [category.id, category.name]),
	);

	return products.map((product) => ({
		id: product.id,
		categoryId: product.categoryId,
		categoryName: categoryNames.get(product.categoryId) ?? "",
		name: product.name,
		description: product.description,
		price: product.price,
		stock: product.stock,
		isActive: product.isActive,
		imageUrl: product.imageUrl ?? "",
	}));
};
