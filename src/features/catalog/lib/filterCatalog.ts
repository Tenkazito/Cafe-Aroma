import type {
	CatalogCategoryFilter,
	CatalogProduct,
} from "@/features/catalog/types";

export const ALL_CATEGORIES: CatalogCategoryFilter = "todos";

/** Filtra el catálogo por categoría y por texto en el nombre o la descripción. */
export const filterCatalog = (
	products: CatalogProduct[],
	category: CatalogCategoryFilter,
	search: string,
): CatalogProduct[] => {
	const normalizedSearch = search.trim().toLowerCase();

	return products.filter((product) => {
		if (category !== ALL_CATEGORIES && product.categoryName !== category) {
			return false;
		}
		if (!normalizedSearch) return true;

		return (
			product.name.toLowerCase().includes(normalizedSearch) ||
			product.description.toLowerCase().includes(normalizedSearch)
		);
	});
};
