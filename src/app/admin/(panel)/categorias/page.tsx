import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { CategoriesManager } from "@/features/categories/components/CategoriesManager";

export const metadata: Metadata = {
	title: locations.pageTitles.adminCategories,
};

const CategoriesPage = () => {
	return <CategoriesManager />;
};

export default CategoriesPage;
