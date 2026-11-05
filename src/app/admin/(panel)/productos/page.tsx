import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";
import { ProductsManager } from "@/features/products/components/ProductsManager";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";

export const metadata: Metadata = { title: locations.pageTitles.adminProducts };

const ProductsPage = () => {
	const categoryNames = MOCK_CATEGORIES.map((category) => category.name);

	return (
		<ProductsManager products={MOCK_PRODUCTS} categoryNames={categoryNames} />
	);
};

export default ProductsPage;
