import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { ProductsManager } from "@/features/products/components/ProductsManager";

export const metadata: Metadata = { title: locations.pageTitles.adminProducts };

const ProductsPage = () => {
	return <ProductsManager />;
};

export default ProductsPage;
