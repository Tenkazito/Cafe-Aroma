import type { CategorySummary } from "@/features/categories/types";

/** Filtra categorías cuyo nombre contenga el texto buscado. */
export const filterCategories = (
	categories: CategorySummary[],
	search: string,
): CategorySummary[] => {
	const normalizedSearch = search.trim().toLowerCase();
	if (!normalizedSearch) return categories;

	return categories.filter((category) =>
		category.name.toLowerCase().includes(normalizedSearch),
	);
};
