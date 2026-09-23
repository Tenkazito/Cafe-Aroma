import type { Metadata } from "next";
import { CategoriesManager } from "@/features/categories/components/CategoriesManager";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";

export const metadata: Metadata = { title: "Categorías · Admin Café Aroma" };

const CategoriesPage = () => {
	return <CategoriesManager categories={MOCK_CATEGORIES} />;
};

export default CategoriesPage;
