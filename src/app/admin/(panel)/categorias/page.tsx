import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { CategoriesManager } from "@/features/categories/components/CategoriesManager";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";

export const metadata: Metadata = {
	title: locations.pageTitles.adminCategories,
};

const CategoriesPage = () => {
	return <CategoriesManager categories={MOCK_CATEGORIES} />;
};

export default CategoriesPage;
